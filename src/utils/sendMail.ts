import nodemailer from "nodemailer"; // ✅ fixed typo
import envConfig from "../config/config";

interface IMailData {
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (mailData: IMailData) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: envConfig.nodemailerUser,
      pass: envConfig.nodemailerPass,
    },
  });

  const mailFormat = {
    from: `${envConfig.nodemailerSender} <${envConfig.nodemailerUser}>`, // ✅ valid from address
    to: mailData.to,
    subject: mailData.subject,
    html: mailData.html,
  };

  try {
    const info = await transport.sendMail(mailFormat);
    console.log("✅ Email sent:", info.response); // helpful logging
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Email sending failed.");
  }
};

export default sendMail;
