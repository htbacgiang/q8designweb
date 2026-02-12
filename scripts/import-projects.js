const mongoose = require('mongoose');
const { projects } = require('../data/projects');
require('dotenv').config();

// Clear mongoose models to avoid overwrite error
mongoose.models = {};
mongoose.modelSchemas = {};

// Import Project model
const Project = require('../models/Project');

async function importProjects() {
  try {
    console.log('Starting import process...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/q8design';
    console.log('MongoDB URI:', mongoUri);
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    console.log('Clearing existing projects...');
    await Project.deleteMany({});
    console.log('✅ Cleared existing projects');

    // Import projects
    console.log(`Importing ${projects.length} projects...`);
    const importedProjects = await Project.insertMany(projects);
    console.log(`✅ Successfully imported ${importedProjects.length} projects`);

    // Display summary
    const categoryCounts = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    console.log('\n📊 Project summary by category:');
    categoryCounts.forEach(cat => {
      console.log(`- ${cat._id}: ${cat.count} projects`);
    });

    const featuredCount = await Project.countDocuments({ featured: true });
    console.log(`\n⭐ Featured projects: ${featuredCount}`);

    console.log('\n🎉 Import completed successfully!');
  } catch (error) {
    console.error('❌ Error importing projects:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    try {
      await mongoose.disconnect();
      console.log('✅ Disconnected from MongoDB');
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError);
    }
  }
}

// Run the import
importProjects();
