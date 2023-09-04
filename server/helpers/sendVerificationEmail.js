const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const info = await transporter.sendMail({
            from: 'admin@aadarshguru.com',
            to: email,
            subject: 'Email Verification',
            html: `<a href="${process.env.API_URL}/auth/verify/${verificationToken}" >please click the following link to verify your email ${process.env.API_URL}/auth/verify/${verificationToken}</a>`
        });
        return { success: true, info: info };
    } catch (error) {
        return { success: false, error: error?.message };
    }
}

module.exports = sendVerificationEmail;