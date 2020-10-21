import * as nodemailer from 'nodemailer';
import {StaffEntity} from "../staff/staff.entity";


export const sendStaffLoginEmail = async (staff: StaffEntity) => {

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

    content = `<p>Dear <b>${staff.username}'s</b>,</p>

<p>You have been registered to our <i>Qpoint</i>, an automated behavioral point system.</p>

<p>Kindly access to our Qpoint Staff App to proceed.</p>

username: <b>${staff.username}</b><br>

password: <b>${staff.password}</b>


<p>Please change the auto-generated password after the first time login to the app and do not forward this email to anyone.</p>

<p><i>Sincerely yours,</i></p>

<p><i>The Qpoint Accounts Team</i></p>`


    const info = await transporter.sendMail({
        from: '"qpoint 👻 " <' + `${process.env.EMAIL_USERNAME}` + ">", // sender address
        to: staff.email, // list of receivers
        subject: 'Qpoint Staff Login ', // Subject line
        html: content

        ,
    });
    console.log('Message sent: %s', info.messageId);
};