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

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get this week's date range
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Get statistics
    const [
      totalSubscriptions,
      todaySubscriptions,
      weekSubscriptions
    ] = await Promise.all([
      Subscription.countDocuments({ status: 'active' }),
      Subscription.countDocuments({ 
        status: 'active',
        subscribedAt: { $gte: today, $lt: tomorrow }
      }),
      Subscription.countDocuments({ 
        status: 'active',
        subscribedAt: { $gte: startOfWeek }
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalSubscriptions,
        today: todaySubscriptions,
        thisWeek: weekSubscriptions
      }
    });

  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
