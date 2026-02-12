import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { method } = req;

  await db.connectDb();

  switch (method) {
    case 'GET':
      try {
        const { limit = 3 } = req.query;
        
        const projects = await Project.getFeatured(parseInt(limit));
        
        res.status(200).json({
          success: true,
          data: projects,
          count: projects.length
        });
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        res.status(500).json({
          success: false,
          message: 'Lỗi khi lấy dự án tiêu biểu',
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
