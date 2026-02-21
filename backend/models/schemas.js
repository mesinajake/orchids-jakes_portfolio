import mongoose from 'mongoose';

// Contact Message Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true
  },
  responded: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  },
  userAgent: String,
  ipAddress: String
});

// Chat Conversation Schema
const chatSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  resolved: {
    type: Boolean,
    default: false
  },
  userAgent: String,
  ipAddress: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['page_view', 'click', 'chat_interaction', 'contact_form', 'download'],
    required: true
  },
  page: String,
  element: String,
  sessionId: String,
  userAgent: String,
  ipAddress: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
});

// Portfolio Data Schema (for versioning)
const portfolioDataSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postMediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  publicId: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const postEventSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  date: {
    type: String,
    trim: true
  },
  time: {
    type: String,
    trim: true
  }
}, { _id: false });

const postCommentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  sessionId: {
    type: String,
    trim: true,
    maxlength: 120,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 200,
    default: null
  },
  content: {
    type: String,
    trim: true,
    maxlength: 5000,
    default: ''
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120
  },
  images: {
    type: [postMediaSchema],
    default: []
  },
  video: {
    type: postMediaSchema,
    default: null
  },
  codeSnippet: {
    type: String,
    maxlength: 20000,
    default: null
  },
  codeLang: {
    type: String,
    trim: true,
    maxlength: 50,
    default: null
  },
  likesBySessions: {
    type: [String],
    default: []
  },
  comments: {
    type: [postCommentSchema],
    default: []
  },
  event: {
    type: postEventSchema,
    default: null
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  }
}, {
  timestamps: true
});

const ownerSessionSchema = new mongoose.Schema({
  tokenHash: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUsedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for performance
chatSchema.index({ createdAt: -1 });
chatSchema.index({ sessionId: 1, createdAt: -1 });
analyticsSchema.index({ timestamp: -1 });
analyticsSchema.index({ type: 1, timestamp: -1 });
contactSchema.index({ createdAt: -1 });
postSchema.index({ createdAt: -1 });
ownerSessionSchema.index({ tokenHash: 1 }, { unique: true });

export const Contact = mongoose.model('Contact', contactSchema);
export const Chat = mongoose.model('Chat', chatSchema);
export const Analytics = mongoose.model('Analytics', analyticsSchema);
export const PortfolioData = mongoose.model('PortfolioData', portfolioDataSchema);
export const Post = mongoose.model('Post', postSchema);
export const OwnerSession = mongoose.model('OwnerSession', ownerSessionSchema);
