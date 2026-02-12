import db from '../../utils/db';
import Subscription from '../../models/Subscription';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, phone, email, message } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng điền đầy đủ thông tin bắt buộc' 
      });
    }

    // Validate phone number format
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Số điện thoại không hợp lệ' 
      });
    }

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email không hợp lệ' 
      });
    }

    await db.connectDb();

    // Check if phone number already exists
    const existingSubscription = await Subscription.findOne({ phone });
    if (existingSubscription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Số điện thoại này đã được đăng ký tư vấn trước đó' 
      });
    }

    // Create new subscription/contact record
    const newSubscription = new Subscription({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim().toLowerCase() : null,
      purpose: message.trim(),
      courseSlug: 'thiet-ke-noi-that', // Default service for Q8 Design
      status: 'active',
      source: 'website_contact_form',
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    });

    await newSubscription.save();

    // Log successful contact
    console.log(`New contact form submission: ${name} - ${phone}`);

    res.status(200).json({
      success: true,
      message: 'Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm nhất.',
      data: {
        id: newSubscription._id,
        name: newSubscription.name,
        phone: newSubscription.phone
      }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Số điện thoại hoặc email này đã được đăng ký trước đó' 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Có lỗi xảy ra, vui lòng thử lại sau' 
    });
  }
}
