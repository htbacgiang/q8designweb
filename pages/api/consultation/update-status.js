import dbConnect from '../../../lib/mongodb';
import Consultation from '../../../models/Consultation';
import { isValidObjectId } from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ 
      success: false, 
      message: 'Phương thức không được hỗ trợ' 
    });
  }

  try {
    await dbConnect();

    const { id, status, adminNotes } = req.body;

    // Validate consultation ID
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID yêu cầu tư vấn không hợp lệ'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái không hợp lệ'
      });
    }

    // Find consultation
    const consultation = await Consultation.findById(id);
    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy yêu cầu tư vấn'
      });
    }

    // Update consultation
    const updateData = { status };
    
    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes;
    }

    // Set timestamps based on status
    if (status === 'contacted' && !consultation.contactedAt) {
      updateData.contactedAt = new Date();
    }
    
    if (status === 'completed' && !consultation.completedAt) {
      updateData.completedAt = new Date();
    }

    const updatedConsultation = await Consultation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Cập nhật trạng thái thành công',
      data: {
        id: updatedConsultation._id,
        status: updatedConsultation.status,
        updatedAt: updatedConsultation.updatedAt
      }
    });

  } catch (error) {
    console.error('Error updating consultation status:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi cập nhật trạng thái'
    });
  }
}

