"use strict";
import nodemailer from "nodemailer";

const validatePassword = async(to) => {
  try{


    let testAccount = await nodemailer.createTestAccount();

 
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user, 
        pass: testAccount.pass 
      }
    });
  
   
    let info = await transporter.sendMail({
      from: `"Hezron Kimutai" hezronchelimo.hc@gmail.com`, 
      to: `${to}`, 
      subject: "Reset Password", 
      text: "Hello lost your password", 
      html: "<b>Password</b>"
    });
  return  {
      id : info.messageId,
      Preview : nodemailer.getTestMessageUrl(info)
    }
  }catch(err){
    console.log(err)
  }

}

module.exports = {validatePassword};