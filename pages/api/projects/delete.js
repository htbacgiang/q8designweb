import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    await db.connectDb();
    
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ 
        success: false,
        message: 'Project ID is required' 
      });
    }

    console.log('Attempting to delete project with ID:', id);

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ 
        success: false,
        message: 'Project not found' 
      });
    }

    console.log('Project deleted successfully:', project.title);

    return res.status(200).json({ 
      success: true, 
      message: 'Project deleted successfully',
      data: project
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Failed to delete project',
      error: error.message 
    });
  }
}

