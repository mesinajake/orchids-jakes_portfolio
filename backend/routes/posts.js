import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { body, param, query, validationResult } from 'express-validator';
import ownerAuth from '../middleware/ownerAuth.js';
import { Post } from '../models/schemas.js';

const router = express.Router();

let cloudinaryConfigured = false;

function ensureCloudinaryConfig() {
  const hasCloudinaryConfig = [
    process.env.CLOUDINARY_CLOUD_NAME,
    process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET
  ].every(Boolean);

  if (!hasCloudinaryConfig) return false;
  if (cloudinaryConfigured) return true;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  cloudinaryConfigured = true;
  return true;
}

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
]);

const ALLOWED_VIDEO_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'video/quicktime'
]);

const MAX_MEDIA_SIZE_BYTES = (Number(process.env.POST_MEDIA_MAX_SIZE_MB) || 50) * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MEDIA_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.has(file.mimetype) || ALLOWED_VIDEO_TYPES.has(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error('Unsupported file type'));
  }
});

function serializePost(post, sessionId = '') {
  const normalizedSessionId = String(sessionId || '').trim();
  const likesBySessions = Array.isArray(post.likesBySessions) ? post.likesBySessions : [];

  return {
    id: post._id.toString(),
    title: post.title || null,
    content: post.content || '',
    author: post.author,
    timestamp: post.createdAt,
    likes: likesBySessions.length,
    likedByCurrentSession: normalizedSessionId ? likesBySessions.includes(normalizedSessionId) : false,
    comments: (post.comments || []).map((comment) => ({
      id: comment._id?.toString?.() || null,
      author: comment.author,
      text: comment.text,
      timestamp: comment.timestamp
    })),
    isUserPost: true,
    images: (post.images || []).map((img) => img.url),
    imageAssets: post.images || [],
    video: post.video?.url || null,
    videoAsset: post.video || null,
    codeSnippet: post.codeSnippet || null,
    codeLang: post.codeLang || null,
    event: post.event || null,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  };
}

function uploadBufferToCloudinary(buffer, resourceType) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio/posts',
        resource_type: resourceType
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Cloudinary upload failed'));
          return;
        }
        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

const validatePostPayload = [
  body('title').optional({ nullable: true }).isString().trim().isLength({ max: 200 }),
  body('content').optional({ nullable: true }).isString().isLength({ max: 5000 }),
  body('author').optional({ nullable: true }).isString().trim().isLength({ min: 1, max: 120 }),
  body('images').optional({ nullable: true }).isArray({ max: 6 }),
  body('images.*.url').optional().isString().trim().isLength({ min: 1, max: 2048 }),
  body('images.*.publicId').optional().isString().trim().isLength({ min: 1, max: 255 }),
  body('video').optional({ nullable: true }).isObject(),
  body('video.url').optional().isString().trim().isLength({ min: 1, max: 2048 }),
  body('video.publicId').optional().isString().trim().isLength({ min: 1, max: 255 }),
  body('codeSnippet').optional({ nullable: true }).isString().isLength({ max: 20000 }),
  body('codeLang').optional({ nullable: true }).isString().trim().isLength({ max: 50 }),
  body('event').optional({ nullable: true }).isObject(),
  body('event.title').optional({ nullable: true }).isString().trim().isLength({ max: 200 }),
  body('event.date').optional({ nullable: true }).isString().trim().isLength({ max: 64 }),
  body('event.time').optional({ nullable: true }).isString().trim().isLength({ max: 64 })
];

const validateUpdatePayload = [
  param('id').isMongoId(),
  body('title').optional({ nullable: true }).isString().trim().isLength({ max: 200 }),
  body('content').optional({ nullable: true }).isString().isLength({ max: 5000 }),
  body('images').optional({ nullable: true }).isArray({ max: 6 }),
  body('images.*.url').optional().isString().trim().isLength({ min: 1, max: 2048 }),
  body('images.*.publicId').optional().isString().trim().isLength({ min: 1, max: 255 }),
  body('video').optional({ nullable: true }).isObject(),
  body('video.url').optional().isString().trim().isLength({ min: 1, max: 2048 }),
  body('video.publicId').optional().isString().trim().isLength({ min: 1, max: 255 }),
  body('codeSnippet').optional({ nullable: true }).isString().isLength({ max: 20000 }),
  body('codeLang').optional({ nullable: true }).isString().trim().isLength({ max: 50 }),
  body('event').optional({ nullable: true }).isObject(),
  body('event.title').optional({ nullable: true }).isString().trim().isLength({ max: 200 }),
  body('event.date').optional({ nullable: true }).isString().trim().isLength({ max: 64 }),
  body('event.time').optional({ nullable: true }).isString().trim().isLength({ max: 64 })
];

const validateLikePayload = [
  param('id').isMongoId(),
  body('sessionId').isString().trim().isLength({ min: 1, max: 120 }),
  body('isLiking').isBoolean()
];

const validateCommentPayload = [
  param('id').isMongoId(),
  body('sessionId').isString().trim().isLength({ min: 1, max: 120 }),
  body('author').optional({ nullable: true }).isString().trim().isLength({ max: 120 }),
  body('text').isString().trim().isLength({ min: 1, max: 2000 })
];

const validatePostsQuery = [
  query('sessionId').optional().isString().trim().isLength({ max: 120 })
];

router.get('/', validatePostsQuery, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const sessionId = req.query.sessionId || '';
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(100);
    res.json({
      success: true,
      data: posts.map((post) => serializePost(post, sessionId))
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load posts'
    });
  }
});

router.post('/media', ownerAuth, (req, res, next) => {
  upload.single('file')(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    res.status(400).json({
      success: false,
      message: error.message || 'Failed to process uploaded file'
    });
  });
}, async (req, res) => {
  try {
    if (!ensureCloudinaryConfig()) {
      return res.status(500).json({
        success: false,
        message: 'Cloudinary is not configured on the server'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No media file uploaded'
      });
    }

    const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
    const uploaded = await uploadBufferToCloudinary(req.file.buffer, resourceType);

    res.status(201).json({
      success: true,
      data: {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        resourceType
      }
    });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload media'
    });
  }
});

router.post('/', ownerAuth, validatePostPayload, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const {
      title,
      content,
      author,
      images,
      video,
      codeSnippet,
      codeLang,
      event
    } = req.body;

    const normalizedTitle = (title || '').trim();
    const normalizedContent = (content || '').trim();
    const normalizedCodeSnippet = (codeSnippet || '').trim();

    const normalizedImages = Array.isArray(images)
      ? images
          .filter((img) => img && img.url && img.publicId)
          .map((img) => ({
            url: String(img.url).trim(),
            publicId: String(img.publicId).trim()
          }))
      : [];

    const normalizedVideo = video && video.url && video.publicId
      ? {
          url: String(video.url).trim(),
          publicId: String(video.publicId).trim()
        }
      : null;

    const hasEventValues = event && (event.title || event.date || event.time);
    const normalizedEvent = hasEventValues
      ? {
          title: event.title ? String(event.title).trim() : '',
          date: event.date ? String(event.date).trim() : '',
          time: event.time ? String(event.time).trim() : ''
        }
      : null;

    if (
      !normalizedTitle &&
      !normalizedContent &&
      normalizedImages.length === 0 &&
      !normalizedVideo &&
      !normalizedCodeSnippet &&
      !normalizedEvent
    ) {
      return res.status(400).json({
        success: false,
        message: 'Post must include at least one piece of content'
      });
    }

    const createdPost = await Post.create({
      title: normalizedTitle || null,
      content: normalizedContent,
      author: (author || process.env.OWNER_DISPLAY_NAME || 'Owner').trim(),
      images: normalizedImages,
      video: normalizedVideo,
      codeSnippet: normalizedCodeSnippet || null,
      codeLang: normalizedCodeSnippet ? (codeLang || 'plaintext').trim() : null,
      likesBySessions: [],
      comments: [],
      event: normalizedEvent,
      status: 'published'
    });

    res.status(201).json({
      success: true,
      data: serializePost(createdPost)
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create post'
    });
  }
});

router.patch('/:id', ownerAuth, validateUpdatePayload, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const updates = {};

    if (Object.prototype.hasOwnProperty.call(req.body, 'title')) {
      updates.title = (req.body.title || '').trim() || null;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'content')) {
      updates.content = (req.body.content || '').trim();
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'images')) {
      const images = Array.isArray(req.body.images) ? req.body.images : [];
      updates.images = images
        .filter((img) => img && img.url && img.publicId)
        .map((img) => ({
          url: String(img.url).trim(),
          publicId: String(img.publicId).trim()
        }));
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'video')) {
      const video = req.body.video;
      updates.video = video && video.url && video.publicId
        ? {
            url: String(video.url).trim(),
            publicId: String(video.publicId).trim()
          }
        : null;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'codeSnippet')) {
      updates.codeSnippet = (req.body.codeSnippet || '').trim() || null;
      if (updates.codeSnippet) {
        if (Object.prototype.hasOwnProperty.call(req.body, 'codeLang')) {
          updates.codeLang = req.body.codeLang ? String(req.body.codeLang).trim() : 'plaintext';
        } else {
          updates.codeLang = 'plaintext';
        }
      } else {
        updates.codeLang = null;
      }
    } else if (Object.prototype.hasOwnProperty.call(req.body, 'codeLang')) {
      updates.codeLang = req.body.codeLang ? String(req.body.codeLang).trim() : null;
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'event')) {
      const event = req.body.event;
      const hasEventValues = event && (event.title || event.date || event.time);
      updates.event = hasEventValues
        ? {
            title: event.title ? String(event.title).trim() : '',
            date: event.date ? String(event.date).trim() : '',
            time: event.time ? String(event.time).trim() : ''
          }
        : null;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No changes provided'
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: serializePost(updatedPost)
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update post'
    });
  }
});

router.delete('/:id', ownerAuth, [param('id').isMongoId()], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    if (ensureCloudinaryConfig()) {
      const destroyRequests = [];

      (post.images || []).forEach((image) => {
        if (image?.publicId) {
          destroyRequests.push(
            cloudinary.uploader.destroy(image.publicId, { resource_type: 'image' })
          );
        }
      });

      if (post.video?.publicId) {
        destroyRequests.push(
          cloudinary.uploader.destroy(post.video.publicId, { resource_type: 'video' })
        );
      }

      if (destroyRequests.length > 0) {
        await Promise.allSettled(destroyRequests);
      }
    }

    await Post.deleteOne({ _id: post._id });

    res.json({
      success: true
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post'
    });
  }
});

router.post('/:id/like', validateLikePayload, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { sessionId, isLiking } = req.body;
    const update = isLiking
      ? { $addToSet: { likesBySessions: sessionId.trim() } }
      : { $pull: { likesBySessions: sessionId.trim() } };

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, status: 'published' },
      update,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: serializePost(updatedPost, sessionId)
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update like'
    });
  }
});

router.post('/:id/comments', validateCommentPayload, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { sessionId, author, text } = req.body;
    const normalizedComment = {
      author: (author || 'Visitor').trim() || 'Visitor',
      text: text.trim(),
      sessionId: sessionId.trim(),
      timestamp: new Date()
    };

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, status: 'published' },
      { $push: { comments: normalizedComment } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const serialized = serializePost(updatedPost, sessionId);
    res.status(201).json({
      success: true,
      data: {
        post: serialized,
        comment: serialized.comments[serialized.comments.length - 1] || null
      }
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add comment'
    });
  }
});

export default router;
