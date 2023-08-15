const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
// const { ctrlWrapper } = require("../decorators/ctrlWrapper.js");

dotenv.config();
const { EMAIL_SENDER, BASE_URL, SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = (email, verificationCode) => {
  const msg = {
    to: email,
    from: EMAIL_SENDER,
    subject: "Email verification",
    text: "Click on the link to confirm your registration.",
    html: `<strong><a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Confirm your registration.</a></strong>`,
  };

  return sgMail.send(msg);
};

module.exports = sendVerificationEmail;
