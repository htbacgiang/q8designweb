import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  const { method } = req;
  const { slug } = req.query;

  try {
    await db.connectDb();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi kết nối database',
      error: error.message
    });
  }

  switch (method) {
    case 'GET':
      try {
        console.log('Looking for project with slug:', slug);
        console.log('Database connection status:', db.connection?.isConnected);
        
        const project = await Project.findOne({ 
          slug: slug,
          status: 'active' 
        }).select('-__v');
        
        console.log('Found project:', project ? 'Yes' : 'No');
        if (project) {
          console.log('Project title:', project.title);
          console.log('Project status:', project.status);
        } else {
          console.log('No project found with slug:', slug);
          // Let's also check if there are any projects at all
          const totalProjects = await Project.countDocuments();
          console.log('Total projects in database:', totalProjects);
          
          // Check if there are any projects with different status
          const inactiveProjects = await Project.countDocuments({ status: 'inactive' });
          const draftProjects = await Project.countDocuments({ status: 'draft' });
          console.log('Inactive projects:', inactiveProjects);
          console.log('Draft projects:', draftProjects);
        }

        if (!project) {
          return res.status(404).json({
            success: false,
            message: 'Không tìm thấy dự án',
            debug: {
              slug,
              totalProjects: await Project.countDocuments(),
              activeProjects: await Project.countDocuments({ status: 'active' })
            }
          });
        }

        // Increment views
        await project.incrementViews();

        // Get related projects (same category, excluding current)
        const relatedProjects = await Project.find({
          category: project.category,
          _id: { $ne: project._id },
          status: 'active'
        })
        .select('title slug image location area category')
        .limit(3)
        .sort({ createdAt: -1 });

        res.status(200).json({
          success: true,
          data: {
            project,
            relatedProjects
          }
        });
      } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
          success: false,
          message: 'Lỗi khi lấy thông tin dự án',
          error: error.message
        });
      }
      break;

    case 'PUT':
      try {
        const project = await Project.findOneAndUpdate(
          { slug: slug },
          req.body,
          { new: true, runValidators: true }
        );

        if (!project) {
          return res.status(404).json({
            success: false,
            message: 'Không tìm thấy dự án'
          });
        }

        res.status(200).json({
          success: true,
          data: project,
          message: 'Dự án đã được cập nhật thành công'
        });
      } catch (error) {
        console.error('Error updating project:', error);
        res.status(400).json({
          success: false,
          message: 'Lỗi khi cập nhật dự án',
          error: error.message
        });
      }
      break;

    case 'DELETE':
      try {
        const project = await Project.findOneAndUpdate(
          { slug: slug },
          { status: 'inactive' },
          { new: true }
        );

        if (!project) {
          return res.status(404).json({
            success: false,
            message: 'Không tìm thấy dự án'
          });
        }

        res.status(200).json({
          success: true,
          message: 'Dự án đã được xóa thành công'
        });
      } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
          success: false,
          message: 'Lỗi khi xóa dự án',
          error: error.message
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        message: `Method ${method} not allowed`
      });
  }
}
