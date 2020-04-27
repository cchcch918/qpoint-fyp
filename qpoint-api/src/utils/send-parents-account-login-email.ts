import * as nodemailer from 'nodemailer';
import {UserEntity} from "../user/user.entity";


export const sendParentsLoginEmail = async (user: UserEntity) => {


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const info = await transporter.sendMail({
        from: '"qpoint 👻 " <' + `${process.env.EMAIL_USERNAME}` + ">", // sender address
        to: user.parentEmail, // list of receivers
        subject: 'Qpoint Parents Login ', // Subject line
        html: `
<p>Hi <b>${user.fullName}'s</b> parents,</p>

<p>Your children has been registered to our <i>Qrpoint</i>, a automated behavioral point system.</p>

<p>Kindly access to our app to keep track your children activities in school.</p>

username: <b>${user.parentEmail}</b><br>

password: <b>${user.password}</b>

<p>Please change the auto-generated password after the first time login to the app and do not forward this email to anyone.</p>

<p><i>Sincerely yours,</i></p>

<p><i>The Qpoint Accounts Team</i></p>`
        ,
    });


    console.log('Message sent: %s', info.messageId);
};