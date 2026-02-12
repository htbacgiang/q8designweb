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

    const { page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Get subscriptions with pagination
    const subscriptions = await Subscription.find(searchQuery)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const totalItems = await Subscription.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalItems / limitNum);

    // Transform data to include courseName
    const transformedSubscriptions = await Promise.all(
      subscriptions.map(async (sub) => {
        let courseName = null;
        if (sub.courseSlug) {
          // You can fetch course name from Course model if needed
          // For now, we'll use the slug
          courseName = sub.courseSlug;
        }
        
        return {
          ...sub,
          courseName,
          _id: sub._id.toString()
        };
      })
    );

    res.status(200).json({
      success: true,
      data: transformedSubscriptions,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });

  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}
