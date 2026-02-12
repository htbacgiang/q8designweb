const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  // Thông tin cơ bản
  name: {
    type: String,
    required: [true, 'Họ và tên là bắt buộc'],
    trim: true,
    maxlength: [100, 'Họ và tên không được vượt quá 100 ký tự']
  },
  phone: {
    type: String,
    required: [true, 'Số điện thoại là bắt buộc'],
    trim: true,
    match: [/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ']
  },

  // Thông tin dự án
  projectType: {
    type: String,
    trim: true,
    maxlength: [200, 'Loại dự án không được vượt quá 200 ký tự']
  },
  area: {
    type: String,
    trim: true,
    maxlength: [50, 'Diện tích không được vượt quá 50 ký tự']
  },
  budget: {
    type: String,
    trim: true,
    maxlength: [100, 'Ngân sách không được vượt quá 100 ký tự']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Vị trí dự án không được vượt quá 200 ký tự']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [2000, 'Mô tả không được vượt quá 2000 ký tự']
  },

  // Thông tin đặt lịch (cho form đặt lịch)
  consultationDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value >= new Date();
      },
      message: 'Ngày tư vấn phải là ngày trong tương lai'
    }
  },
  consultationTime: {
    type: String,
    trim: true,
    maxlength: [50, 'Khung giờ không được vượt quá 50 ký tự']
  },
  consultationType: {
    type: String,
    enum: ['office', 'online'],
    default: 'office'
  },

  // Trạng thái xử lý
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Ghi chú của admin
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Ghi chú admin không được vượt quá 1000 ký tự']
  },

  // Thông tin hệ thống
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    default: 'website',
    enum: ['website', 'facebook', 'google', 'referral', 'other']
  },

  // Thời gian
  contactedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index để tối ưu truy vấn
consultationSchema.index({ status: 1, createdAt: -1 });
consultationSchema.index({ phone: 1 });
consultationSchema.index({ email: 1 });
consultationSchema.index({ consultationDate: 1 });

// Virtual để tính thời gian xử lý
consultationSchema.virtual('processingTime').get(function() {
  if (this.completedAt && this.createdAt) {
    return Math.floor((this.completedAt - this.createdAt) / (1000 * 60 * 60 * 24)); // ngày
  }
  return null;
});

// Middleware để tự động cập nhật thời gian
consultationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'contacted' && !this.contactedAt) {
      this.contactedAt = new Date();
    }
    if (this.status === 'completed' && !this.completedAt) {
      this.completedAt = new Date();
    }
  }
  next();
});

// Static methods
consultationSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

consultationSchema.statics.getRecentConsultations = function(limit = 10) {
  return this.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('name phone email projectType status createdAt consultationDate');
};

module.exports = mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);

