const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

// import view template from directory
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../views/emailReq.hbs"), "utf8")
const emailTemplateSource2 = fs.readFileSync(path.join(__dirname, "../views/emailRes.hbs"), "utf8")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass:process.env.PASS
    },
    tls:{
        rejectUnauthorized: false
    },
});




const mailAttribute = async ({name, phone, email, subject, message}) => {
    try {
      const template= handlebars.compile(emailTemplateSource);
      const template2 = handlebars.compile(emailTemplateSource2);

      //pass email atrribute into templates
      const emailBody = template({name, phone, email, message, subject});
      const emailBody2 = template2({name})
     
       const info = await transporter.sendMail({
        from: email,
        to: process.env.USER,
        subject,
       html: emailBody,
 });
 console.log(`Email Successfully sent to ${process.env.USER}`, info.messageId);

 // Confirmation email sent to user 
 const confirmationEmail = await transporter.sendMail({
    from: process.env.USER,
    to: email,
    subject: 'Response Delivered Confirmation',
   html: emailBody2
 });
    console.log(`Confirmation Email Successfully sent to ${email}`, confirmationEmail.messageId);  
    } catch (error) {
        console.log(error.message);
        throw new Error(`Error sending email: ${error.message}`)
    }
}


module.exports = mailAttribute;