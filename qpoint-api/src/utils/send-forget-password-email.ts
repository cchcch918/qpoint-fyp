import * as nodemailer from 'nodemailer';
import {StaffEntity} from "../staff/staff.entity";

export const sendEmail = async (user: StaffEntity) => {

console.log("[email]:", user.email)
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
        to: user.email, // list of receivers
        subject: 'Qpoint Password Recovery', // Subject line
        html:
            `
<p>Hi ${user.username},</p>
<p>We received a request to access your Qpoint Account ${user.username} through a new password.</p>

<p>Kindly access the link below to recover your account password.</p>

<p>The link will expired in 1 hour.</p>

<a href="http://localhost:4200/pre-login/password-recovery/${user.username}/${user.resetPasswordToken}"><b>Click here to recover your password</b></a>

<p>If you did not request this code, it is possible that someone else is trying to access your Qpoint account. <b>Do not forward the link to anyone.</b></p>

<p>You received this message because this email address is listed as the recovery email for the Qpoint Account ${user.email}.</p>

<p><i>Sincerely yours,</i></p>

<p><i>The Qpoint Accounts Team</i></p>
`
        ,
    });


    function censorWord(str) {
        if (str.length < 3)
            return str.slice(0, 1) + "*".repeat(str.length - 1);
        else
            return str.slice(0, 3) + "*".repeat(str.length - 3);
    }

    function censorEmail(email) {
        const arr = email.split("@");
        return censorWord(arr[0]) + "@" + arr[1];
    }

    return {censoredEmail: censorEmail(info.accepted[0])};
};







