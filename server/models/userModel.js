const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    sentFollowRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    receivedFollowRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

module.exports = User;