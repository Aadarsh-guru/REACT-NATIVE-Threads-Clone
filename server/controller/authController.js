const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const JWT = require('jsonwebtoken')
const sendVerificationEmail = require('../helpers/sendVerificationEmail')

const userRegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: 'name, email and password are required.', success: false });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({ message: 'user already exist please login', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(20).toString('hex');
        await User.create({ name, email, password: hashedPassword, verificationToken });
        await sendVerificationEmail(email, verificationToken)
        return res.status(200).send({ message: 'user registered successfully.', success: true });
    } catch (error) {
        return res.status(500).send({ message: 'Error in register user api', error, success: false });
    }
}


const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: 'email and password are required.', success: false });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: 'user not found.', success: false });
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(404).json({ message: 'invalid login credentials.', success: false })
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET)
        return res.status(200).send({ message: 'user logged in successfully.', success: true, token, user })
    } catch (error) {
        return res.status(500).send({ message: 'Error in login user api', error, success: false })
    }
}


const emailVerificationController = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ verificationToken: token })
        if (!user) {
            return res.status(404).send({ message: 'Invalid token', success: false })
        }
        user.verified = true,
            user.verificationToken = undefined;
        await user.save()
        return res.status(200).send({ message: 'email verification success.', success: true })
    } catch (error) {
        return res.status(500).send({ message: 'Error in verify email api', error, success: false })
    }
}


const sendVerificationController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: 'email is required.', success: false })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: 'user not found.', success: false });
        }
        await sendVerificationEmail(email, user.verificationToken)
        return res.status(200).send({ message: 'verification email sent successfully.', success: true })
    } catch (error) {
        return res.status(500).send({ message: 'Error in sending verification email api', error, success: false })
    }
}

module.exports = { userRegisterController, userLoginController, emailVerificationController, sendVerificationController };