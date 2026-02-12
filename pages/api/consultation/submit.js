import dbConnect from '../../../lib/mongodb';
import Consultation from '../../../models/Consultation';
import { validateEmail, validatePhone } from '../../../lib/validator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Phương thức không được hỗ trợ' 
    });
  }

  try {
    await dbConnect();

    const {
      name,
      phone,
      email,
      projectType,
      area,
      budget,
      location,
      message,
      consultationDate,
      consultationTime,
      consultationType = 'office'
    } = req.body;

    // Validation cơ bản
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Họ tên và số điện thoại là bắt buộc'
      });
    }

    // Validate email nếu có
    if (email && !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email không hợp lệ'
      });
    }

    // Validate phone
    if (!validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Số điện thoại không hợp lệ'
      });
    }

    // Validate consultation date nếu có
    if (consultationDate) {
      const selectedDate = new Date(consultationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        return res.status(400).json({
          success: false,
          message: 'Ngày tư vấn phải là ngày trong tương lai'
        });
      }
    }

    // Lấy thông tin client
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress ||
                     (req.connection.socket ? req.connection.socket.remoteAddress : null);

    const userAgent = req.headers['user-agent'];

    // Tạo consultation record
    const consultationData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : undefined,
      projectType: projectType ? projectType.trim() : undefined,
      area: area ? area.trim() : undefined,
      budget: budget ? budget.trim() : undefined,
      location: location ? location.trim() : undefined,
      message: message ? message.trim() : undefined,
      consultationDate: consultationDate ? new Date(consultationDate) : undefined,
      consultationTime: consultationTime ? consultationTime.trim() : undefined,
      consultationType,
      ipAddress,
      userAgent,
      source: 'website'
    };

    // Lưu vào database
    const consultation = new Consultation(consultationData);
    await consultation.save();

    // Log để debug (có thể xóa trong production)
    console.log('New consultation submitted:', {
      id: consultation._id,
      name: consultation.name,
      phone: consultation.phone,
      type: consultation.consultationType
    });

    // Trả về response thành công
    return res.status(201).json({
      success: true,
      message: 'Yêu cầu tư vấn đã được gửi thành công',
      data: {
        id: consultation._id,
        status: consultation.status,
        submittedAt: consultation.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting consultation:', error);

    // Xử lý lỗi validation từ MongoDB
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors
      });
    }

    // Xử lý lỗi duplicate
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Yêu cầu tư vấn đã tồn tại'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi gửi yêu cầu tư vấn. Vui lòng thử lại sau.'
    });
  }
}

