import nodemailer from "nodemailer"
export const SendEmail = async ({
    to = "",
    subject = "",
    htmlMessage = "",
    attachment = []
} = {}) => {
    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 465,
        secure: true,
        auth: {
            user: "baselmahmoudkamal@gmail.com",
            pass: "svlggffbbskznikv",
        },
        service: "gmail"
    });

    const info = await transporter.sendMail({
        from: "No-Reply <baselmahmoudkamal@gmail.com>",
        to,
        subject,
        html: htmlMessage,
    });
    return info
}
