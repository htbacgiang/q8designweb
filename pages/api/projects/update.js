import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    await db.connectDb();

    const projectId = req.body.id;
    const projectSlug = req.body.slug;
    
    console.log('Updating project with ID:', projectId, 'Slug:', projectSlug);
    console.log('Update data:', req.body);

    // Find project by ID or slug
    let project;
    if (projectId) {
      project = await Project.findById(projectId);
    } else if (projectSlug) {
      project = await Project.findOne({ slug: projectSlug });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Missing project ID or slug'
      });
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy dự án'
      });
    }

    // Remove fields that shouldn't be updated
    const { id, _id, __v, createdAt, ...updateData } = req.body;
    
    // Preserve slug if it already exists, or update if new slug is provided
    if (!updateData.slug && project.slug) {
      updateData.slug = project.slug;
    }

    // Normalize gallery to ensure proper format
    if (updateData.gallery && Array.isArray(updateData.gallery)) {
      updateData.gallery = updateData.gallery.map(item => {
        // If it's already an object with src, aspectRatio, width, and height, use it
        if (typeof item === 'object' && item.src) {
          const galleryItem = {
            src: item.src,
            aspectRatio: item.aspectRatio || 'landscape'
          };
          
          // Include width and height if provided
          if (item.width != null && item.width !== '') {
            const widthNum = Number(item.width);
            galleryItem.width = (!isNaN(widthNum) && widthNum > 0) ? widthNum : (item.aspectRatio === 'square' ? 1 : item.aspectRatio === 'portrait' ? 3 : item.aspectRatio === 'landscape-3-4' ? 4 : 16);
          }
          if (item.height != null && item.height !== '') {
            const heightNum = Number(item.height);
            galleryItem.height = (!isNaN(heightNum) && heightNum > 0) ? heightNum : (item.aspectRatio === 'square' ? 1 : item.aspectRatio === 'portrait' ? 4 : item.aspectRatio === 'landscape-3-4' ? 3 : 9);
          }
          
          return galleryItem;
        }
        // If it's a string (old format), convert to new format
        if (typeof item === 'string') {
          return {
            src: item,
            aspectRatio: 'landscape',
            width: 16,
            height: 9
          };
        }
        return item;
      });
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedProject,
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
}