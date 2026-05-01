import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { method } = req;

  await db.connectDb();

  switch (method) {
    case 'GET':
      try {
        const { slug, q: searchTerm, category, limit = 10, page = 1 } = req.query;
        if (slug) {
          const project = await Project.findOne({ slug, status: 'active' }).select('-__v');
          if (!project) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy project', data: { projects: [] } });
          }
          return res.status(200).json({ success: true, data: { projects: [project] } });
        }
        if (!searchTerm) {
          return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập từ khóa tìm kiếm',
            data: { projects: [] }
          });
        }

        // Build search query
        const searchRegex = new RegExp(searchTerm, 'i');
        let query = {
          status: 'active',
          $or: [
            { title: searchRegex },
            { location: searchRegex },
            { description: searchRegex },
            { tags: { $in: [searchRegex] } }
          ]
        };

        if (category && category !== 'all') {
          query.category = category;
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Search projects
        const projects = await Project.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .select('-__v');

        // Get total count
        const total = await Project.countDocuments(query);

        // Get search suggestions
        const suggestions = await Project.aggregate([
          { $match: { status: 'active' } },
          { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
          success: true,
          data: {
            projects,
            searchTerm,
            pagination: {
              current: parseInt(page),
              total: Math.ceil(total / parseInt(limit)),
              count: total,
              limit: parseInt(limit)
            },
            suggestions
          }
        });
      } catch (error) {
        console.error('Error searching projects:', error);
        res.status(500).json({
          success: false,
          message: 'Lỗi khi tìm kiếm dự án',
          error: error.message
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({
        success: false,
        message: `Method ${method} not allowed`
      });
  }
}
