const Post = require('../models/postModel')

const createPostController = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.create({ content, user: req?.userId })
        return res.status(200).send({ message: 'post created successfully.', success: true, post });
    } catch (error) {
        return res.status(500).send({ message: 'Error in create post api', error, success: false });
    }
}

const likePostController = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params?.id, { $addToSet: { likes: req?.userId } }, { new: true })
        if (!post) {
            return res.status(404).send({ message: 'post not found.', success: false });
        }
        return res.status(200).send({ message: 'post liked successfully.', success: true, post });
    } catch (error) {
        return res.status(500).send({ message: 'Error in like post api', error, success: false });
    }
}

const unlikePostController = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params?.id, { $pull: { likes: req?.userId } }, { new: true })
        if (!post) {
            return res.status(404).send({ message: 'post not found.', success: false });
        }
        return res.status(200).send({ message: 'post unliked successfully.', success: true, post });
    } catch (error) {
        return res.status(500).send({ message: 'Error in unlike post api', error, success: false });
    }
}

const getAllPostController = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user', 'name').sort({ createdAt: 'descending' })
        return res.status(200).send({ message: 'posts fetched successfully.', success: true, posts });
    } catch (error) {
        return res.status(500).send({ message: 'Error in get all posts api', error, success: false });
    }
}


module.exports = { createPostController, likePostController, unlikePostController, getAllPostController }