import * as nodemailer from 'nodemailer';
import {ParentEntity} from "../parent/parent.entity";


export const sendParentsLoginEmail = async (parent: ParentEntity, studentName: string, parentExists: boolean) => {

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

    let content = '';

    if (!parentExists) {
        content = `<p>Hi <b>${studentName}'s</b> parents,</p>

<p>Your children (${studentName}) has been registered to our <i>Qpoint</i>, an automated behavioral point system.</p>

<p>Kindly access to our app to keep track your children activities in school.</p>

username: <b>${parent.email}</b><br>

password: <b>${parent.password}</b>

<p>Please change the auto-generated password after the first time login to the app and do not forward this email to anyone.</p>

<p><i>Sincerely yours,</i></p>

<p><i>The Qpoint Accounts Team</i></p>`
    } else {
        content = `<p>Hi <b>${studentName}'s</b> parents,</p>

<p>Your children (${studentName}) has been registered to our <i>Qpoint</i>, an automated behavioral point system.</p>

<p>Kindly access to our app to keep track your children activities in school by using your same existing account.</p>

<p>Please change the auto-generated password after the first time login to the app and do not forward this email to anyone.</p>

<p><i>Sincerely yours,</i></p>

<p><i>The Qpoint Accounts Team</i></p>`
    }

    const info = await transporter.sendMail({
        from: '"qpoint 👻 " <' + `${process.env.EMAIL_USERNAME}` + ">", // sender address
        to: parent.email, // list of receivers
        subject: 'Qpoint Parent Login ', // Subject line
        html: content

        ,
    });
    console.log('Message sent: %s', info.messageId);
};