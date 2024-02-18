const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass:process.env.PASS
    }
});

const mailAttribute = async ({name, phone, email, subject, message}) => {
    try {
       const info = await transporter.sendMail({
        from: email,
        to: process.env.USER,
        subject,
        text:`
        Name: ${name}
       Phone:  ${phone} 
       Message: ${message}`
 });
  console.log(`Email Successfully sent to ${process.env.USER}`, info.messageId);
    } catch (error) {
        console.log(error.message);
        throw new Error(`Error sending email: ${error.message}`)
    }
}


module.exports = mailAttribute;