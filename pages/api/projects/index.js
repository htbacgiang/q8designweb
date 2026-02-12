import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { method } = req;

  await db.connectDb();

  switch (method) {
    case 'GET':
      try {
        const { 
          category = 'all', 
          featured, 
          limit = 10, 
          page = 1, 
          search,
          sort = 'createdAt',
          order = 'desc'
        } = req.query;

        // Build query
        let query = { status: 'active' };
        
        if (category && category !== 'all') {
          query.category = category;
        }
        
        if (featured === 'true') {
          query.featured = true;
        }

        if (search) {
          const searchRegex = new RegExp(search, 'i');
          query.$or = [
            { title: searchRegex },
            { location: searchRegex },
            { description: searchRegex },
            { tags: { $in: [searchRegex] } }
          ];
        }

        // Build sort object
        const sortObj = {};
        sortObj[sort] = order === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Run queries in parallel for better performance
        const [projects, total, categoryCounts, completionCounts] = await Promise.all([
          // Get projects
          Project.find(query)
            .sort(sortObj)
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v')
            .lean(), // Use lean() for faster queries when not modifying documents
          
          // Get total count for pagination
          Project.countDocuments(query),
          
          // Get category counts (across all active projects)
          Project.aggregate([
            { $match: { status: 'active' } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
          ]),
          
          // Get completion counts (e.g., 'Hoàn thành', ...)
          Project.aggregate([
            { $match: { status: 'active' } },
            { $group: { _id: '$completion', count: { $sum: 1 } } }
          ])
        ]);

        res.status(200).json({
          success: true,
          data: {
            projects,
            pagination: {
              current: parseInt(page),
              total: Math.ceil(total / parseInt(limit)),
              count: total,
              limit: parseInt(limit)
            },
            categories: categoryCounts,
            completion: completionCounts
          }
        });
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
          success: false,
          message: 'Lỗi khi lấy danh sách dự án',
          error: error.message
        });
      }
      break;

    case 'POST':
      // Redirect POST requests to /api/projects/add
      return res.status(301).json({
        success: false,
        message: 'Please use /api/projects/add endpoint for creating projects'
      });

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({
        success: false,
        message: `Method ${method} not allowed`
      });
  }
}
