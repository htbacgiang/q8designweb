import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import Subscription from '../../../models/Subscription';
import db from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Check authentication
    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await db.connectDb();

    // Get all active subscriptions
    const subscriptions = await Subscription.find({ status: 'active' })
      .sort({ subscribedAt: -1 })
      .lean();

    // Convert to CSV format
    const csvHeaders = [
      'Tên khách hàng',
      'Email', 
      'Số điện thoại',
      'Tuổi',
      'Nhu cầu thiết kế',
      'Dịch vụ quan tâm',
      'Ngày liên hệ',
      'Nguồn'
    ];

    const csvRows = subscriptions.map(sub => [
      sub.name || '',
      sub.email || '',
      sub.phone || '',
      sub.age || '',
      sub.purpose || '',
      sub.courseSlug || '',
      new Date(sub.subscribedAt).toLocaleDateString('vi-VN'),
      sub.source || ''
    ]);

    // Create CSV content
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="q8-khach-hang-${new Date().toISOString().split('T')[0]}.csv"`);
    
    // Add BOM for proper UTF-8 encoding in Excel
    res.write('\uFEFF');
    res.end(csvContent);

  } catch (error) {
    console.error('Error exporting subscriptions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
