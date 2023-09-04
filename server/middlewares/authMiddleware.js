const JWT = require('jsonwebtoken')

const requireSignIn = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(200).json({ message: 'Please login to Continue', success: false })
        }
        const { id } = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        if (id) {
            req.userId = id
            next()
        } else {
            return res.status(403).json({ message: 'invalid access.', success: false })
        }
    } catch (error) {
        return res.status(500).json({ message: 'error in auth middleware', error, success: false })
    }
}

module.exports = requireSignIn;
