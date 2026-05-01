import db from '../../../utils/db';
import Project from '../../../models/Project';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    await db.connectDb();
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Import projects from static data
    const importedProjects = await Project.insertMany(projects);
    console.log(`Successfully imported ${importedProjects.length} projects`);

    // Get category counts
    const categoryCounts = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const featuredCount = await Project.countDocuments({ featured: true });

    return res.status(200).json({
      success: true,
      message: 'Projects imported successfully',
      data: {
        totalImported: importedProjects.length,
        categoryCounts,
        featuredCount
      }
    });

  } catch (error) {
    console.error('Error importing projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to import projects',
      error: error.message
    });
  }
}
