import { SendEmail } from "../utils/sendEmail.js"
import jwt from 'jsonwebtoken';

export async function verifyEmail(newUser, req) {
    const { email } = req.body
    const token = jwt.sign({ _id: newUser._id }, "verifyEmail", {
        expiresIn: "1h"
    })
    const verifyPage = `${req.protocol}://${req.headers.host}/auth/verify/${token}`
    const isEmailSent = await SendEmail({
        to: email,
        subject: "Welcome to course App , Verify Your email address",
        htmlMessage: `<a href=${verifyPage}>Please Verify your email address</a>`
    })
    if (isEmailSent.rejected.length > 0) res.status(500).json({ message: "Verification email failed" })
}

