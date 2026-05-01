import dbConnect from '../../../lib/mongodb';
import Consultation from '../../../models/Consultation';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Phương thức không được hỗ trợ' 
    });
  }

  try {
    await dbConnect();

    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { projectType: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get consultations with pagination
    const consultations = await Consultation.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v')
      .lean();

    // Get total count for pagination
    const total = await Consultation.countDocuments(filter);

    // Get statistics
    const stats = await Consultation.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      data: {
        consultations,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        },
        stats: {
          total,
          byStatus: statusStats
        }
      }
    });

  } catch (error) {
    console.error('Error fetching consultations:', error);
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi lấy danh sách yêu cầu tư vấn'
    });
  }
}

