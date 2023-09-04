const User = require('../models/userModel');

const getUsersController = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } }).select('-password -verificationToken').sort({ joinedDate: 'descending' })
        return res.status(200).send({ message: 'users fetched successfully.', success: true, users });
    } catch (error) {
        return res.status(500).send({ message: 'Error in getUsersController user api', error, success: false });
    }
}

const followUserController = async (req, res) => {
    try {
        const { followUserId } = req.body;
        await User.findByIdAndUpdate(followUserId, { $push: { followers: req.userId } })
        return res.status(200).send({ message: 'user followed successfully.', success: true });
    } catch (error) {
        return res.status(500).send({ message: 'Error in follow user api', error, success: false });
    }
}

const unfollowUserController = async (req, res) => {
    try {
        const { unfollowUserId } = req.body;
        await User.findByIdAndUpdate(unfollowUserId, { $pull: { followers: req.userId } })
        return res.status(200).send({ message: 'user unfollowed successfully.', success: true });
    } catch (error) {
        return res.status(500).send({ message: 'Error in unfollow user api', error, success: false });
    }
}

module.exports = { getUsersController, followUserController, unfollowUserController };