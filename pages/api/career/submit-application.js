import multiparty from 'multiparty';
import nodemailer from 'nodemailer';
import { jobApplicationEmailTemplate } from '../../../emails/jobApplicationEmailTemplate';

// Disable default body parser to handle multipart form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  try {
    // Parse multipart form data
    const form = new multiparty.Form();
    
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Extract form data
    const applicationData = {
      fullName: fields.fullName?.[0] || '',
      email: fields.email?.[0] || '',
      phone: fields.phone?.[0] || '',
      position: fields.position?.[0] || '',
      experience: fields.experience?.[0] || '',
      portfolio: fields.portfolio?.[0] || '',
      coverLetter: fields.coverLetter?.[0] || '',
      registeredAt: new Date().toISOString(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown',
      userAgent: req.headers['user-agent'] || 'Unknown'
    };

    // Validate required fields
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone || !applicationData.position) {
      return res.status(400).json({ 
        success: false, 
        message: "Vui lòng điền đầy đủ thông tin bắt buộc" 
      });
    }

    // Email configuration from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email attachments
    const attachments = [];
    if (files.cv && files.cv[0]) {
      const cvFile = files.cv[0];
      attachments.push({
        filename: `CV_${applicationData.fullName}_${Date.now()}.${cvFile.originalFilename.split('.').pop()}`,
        path: cvFile.path,
        contentType: cvFile.headers['content-type']
      });
    }

    // Email content
    const emailHTML = jobApplicationEmailTemplate(applicationData);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `🔔 Đơn ứng tuyển mới: ${applicationData.position} - ${applicationData.fullName}`,
      html: emailHTML,
      attachments: attachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: "Đơn ứng tuyển đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất." 
    });

  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ 
      success: false, 
      message: "Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại sau." 
    });
  }
}
