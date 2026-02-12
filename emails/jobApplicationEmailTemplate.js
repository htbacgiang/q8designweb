export const jobApplicationEmailTemplate = (applicationData) => {
  const { fullName, email, phone, position, experience, portfolio, coverLetter, registeredAt, ipAddress, userAgent } = applicationData;
  
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="vi">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Đơn ứng tuyển mới - Q8 Design</title>
  <style type="text/css">
    body {
      width:100%;
      height:100%;
      padding:0;
      margin:0;
      font-family: Arial, sans-serif;
      background-color: #f8fafc;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .content {
      padding: 30px 20px;
    }
    .info-row {
      display: flex;
      margin-bottom: 15px;
      padding: 10px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-label {
      font-weight: bold;
      color: #374151;
      width: 150px;
      flex-shrink: 0;
    }
    .info-value {
      color: #6b7280;
      flex: 1;
    }
    .highlight {
      background-color: #fef3c7;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #f59e0b;
      margin: 20px 0;
    }
    .cover-letter {
      background-color: #f9fafb;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #f97316;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
 </head>
 <body>
  <div class="container">
    <div class="header">
      <h2 style="margin:0;font-size:24px;">💼 Đơn ứng tuyển mới!</h2>
      <p style="margin:10px 0 0 0;opacity:0.9;">Có ứng viên mới vừa nộp đơn ứng tuyển tại Q8 Design</p>
    </div>
    
    <div class="content">
      <div class="highlight">
        <strong>⏰ Thời gian nộp đơn:</strong> ${new Date(registeredAt).toLocaleString('vi-VN')}
      </div>
      
      <h3 style="color:#374151;margin-bottom:20px;">👤 Thông tin ứng viên:</h3>
      
      <div class="info-row">
        <div class="info-label">👤 Họ và tên:</div>
        <div class="info-value"><strong>${fullName}</strong></div>
      </div>
      
      <div class="info-row">
        <div class="info-label">📧 Email:</div>
        <div class="info-value"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></div>
      </div>
      
      <div class="info-row">
        <div class="info-label">📞 Số điện thoại:</div>
        <div class="info-value"><a href="tel:${phone}" style="color:#2563eb;text-decoration:none;font-weight:bold;">${phone}</a></div>
      </div>
      
      <div class="info-row">
        <div class="info-label">💼 Vị trí ứng tuyển:</div>
        <div class="info-value"><strong style="color:#f97316;">${position}</strong></div>
      </div>
      
      <div class="info-row">
        <div class="info-label">⏳ Kinh nghiệm:</div>
        <div class="info-value">${experience || 'Chưa cung cấp'}</div>
      </div>
      
      ${portfolio ? `<div class="info-row">
        <div class="info-label">🎨 Portfolio:</div>
        <div class="info-value">
          <a href="${portfolio}" style="color:#f97316;text-decoration:none;" target="_blank">
            Xem portfolio →
          </a>
        </div>
      </div>` : ''}
      
      ${coverLetter ? `<h3 style="color:#374151;margin:30px 0 15px 0;">📝 Thư xin việc:</h3>
      <div class="cover-letter">
        <p style="margin:0;line-height:1.6;white-space:pre-wrap;">${coverLetter}</p>
      </div>` : ''}
      
      <h3 style="color:#374151;margin:30px 0 15px 0;">🌐 Thông tin kỹ thuật:</h3>
      
      <div class="info-row">
        <div class="info-label">🌍 IP Address:</div>
        <div class="info-value">${ipAddress || 'Không xác định'}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">💻 User Agent:</div>
        <div class="info-value" style="font-size:11px;word-break:break-all;">${userAgent || 'Không xác định'}</div>
      </div>
      
      <div class="highlight" style="background-color:#dcfce7;border-left-color:#22c55e;">
        <strong>💡 Hành động tiếp theo:</strong>
        <ul style="margin:10px 0 0 0;padding-left:20px;">
          <li>Xem xét CV đính kèm trong email</li>
          <li>Liên hệ với ứng viên trong vòng 3-5 ngày làm việc</li>
          <li>Sắp xếp phỏng vấn sơ tuyển nếu phù hợp</li>
          <li>Cập nhật trạng thái ứng tuyển trong hệ thống</li>
          <li>Gửi thông báo kết quả cho ứng viên</li>
        </ul>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin:0;">
        Email tự động từ hệ thống tuyển dụng Q8 Design<br>
        Thời gian gửi: ${new Date().toLocaleString('vi-VN')}
      </p>
    </div>
  </div>
 </body>
</html>`;
};
