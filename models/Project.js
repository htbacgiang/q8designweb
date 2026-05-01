const mongoose = require('mongoose');

// Gallery item subdocument schema
const galleryItemSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  aspectRatio: {
    type: String,
    enum: ['landscape', 'square', 'portrait'],
    default: 'landscape'
  }
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['villa', 'apartment', 'townhouse', 'commercial', 'office', 'resort', 'restaurant', 'cafe', 'showroom'],
    default: 'villa'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  client: {
    type: String,
    trim: true
  },
  style: {
    type: String,
    trim: true
  },
  budget: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  completion: {
    type: String,
    enum: ['Hoàn thành', 'Đang thi công', 'Đang thiết kế', 'Tạm dừng'],
    default: 'Đang thiết kế'
  },
  image: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  gallery: [{
    src: {
      type: String,
      required: true
    },
    aspectRatio: {
      type: String,
      enum: ['landscape', 'square', 'portrait', 'landscape-3-4'],
      default: 'landscape'
    },
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 9
    }
  }],
  description: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    trim: true,
    default: ''
  },
  products: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  testimonial: {
    text: {
      type: String,
      trim: true
    },
    author: {
      type: String,
      trim: true
    }
  },
  date: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  has3D: {
    type: Boolean,
    default: false
  },
  model3D: {
    type: String,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  overview: {
    type: String,
    trim: true
  },
  features: [{
    icon: {
      type: String,
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    desc: {
      type: String,
      trim: true
    }
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true
  },
  seoKeywords: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better performance
projectSchema.index({ category: 1, featured: 1 });
projectSchema.index({ slug: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

// Virtual for URL
projectSchema.virtual('url').get(function() {
  return `/du-an/${this.slug}`;
});

// Method to increment views
projectSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to increment likes
projectSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

// Static method to get featured projects
projectSchema.statics.getFeatured = function(limit = 3) {
  return this.find({ featured: true, status: 'active' })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get projects by category
projectSchema.statics.getByCategory = function(category, limit = 10) {
  const query = { status: 'active' };
  if (category && category !== 'all') {
    query.category = category;
  }
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to search projects
projectSchema.statics.search = function(searchTerm) {
  const regex = new RegExp(searchTerm, 'i');
  return this.find({
    status: 'active',
    $or: [
      { title: regex },
      { location: regex },
      { description: regex },
      { tags: { $in: [regex] } }
    ]
  }).sort({ createdAt: -1 });
};

// Delete model if it exists to ensure fresh schema
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

// Export model
module.exports = mongoose.model('Project', projectSchema);
