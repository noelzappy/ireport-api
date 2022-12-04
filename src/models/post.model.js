const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postMediaFilesSchema = mongoose.Schema(
  {
    mediaFile: {
      type: String,
      required: true,
      trim: true,
    },
    mediaType: {
      type: String,
      required: true,
      trim: true,
    },

    metaData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },

    excerpt: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      trim: true,
    },

    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['post', 'article'],
      default: 'post',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },

    isCommentEnabled: {
      type: Boolean,
      default: true,
    },

    isComment: {
      type: Boolean,
      default: false,
    },

    commentedOnPost: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Post',
    },

    commentCount: {
      type: Number,
      default: 0,
    },

    upVoteCount: {
      type: Number,
      default: 0,
    },

    downVoteCount: {
      type: Number,
      default: 0,
    },

    threadFollowers: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'User',
    },

    dateOfEvent: {
      type: Date,
      default: Date.now,
    },
    datePublished: {
      type: Date,
      default: Date.now,
    },

    isResolved: {
      type: Boolean,
      default: false,
    },

    isBeingInvestigated: {
      type: Boolean,
      default: false,
    },

    isVerifiedEvidence: {
      type: Boolean,
      default: false,
    },

    mediaFiles: {
      type: [postMediaFilesSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

/**
 * @typedef Post
 */

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
