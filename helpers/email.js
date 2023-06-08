const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail' or 'SendGrid'
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// Function to send an email with HTML content
module.exports.sendMail = async (email, name, otp) => {
  try {
    const htmlFilePath = path.join(
      __dirname,
      "..",
      "emailTemplates",
      "otpVerification.html"
    );
    const htmlContent = fs.readFileSync(htmlFilePath, "utf8");
    const formattedHtml = htmlContent
      .replace("{name}", name)
      .replace("{otp}", otp);
    const mailOptions = {
      from: "saketvts@example.com",
      to: email,
      subject: "OTP Verification",
      html: formattedHtml,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error:", error);
  }
};
