import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, name: string, token: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const link = `${process.env.APP_URL}/verify?token=${token}`;

    const info = await transporter.sendMail({
        from: '"Blog" <........>',
        to: email,
        subject: "Email Verification",
        text: "Test",
        html: `<h2>Hello ${name}, <a href= ${link}>click to verify email </a><h2>`
    });

    console.log(info);
}