const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    ],
    replies: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: String,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const Post = mongoose.models.posts || mongoose.model('posts', postSchema);

module.exports = Post;