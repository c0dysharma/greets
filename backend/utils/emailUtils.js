const nodemailer = require('nodemailer');

const emailHost =
  process.env.NODE_ENV === 'production'
    ? process.env.EMAIL_HOST_PROD
    : process.env.EMAIL_HOST_DEV;

const emailPort =
  process.env.NODE_ENV === 'production'
    ? process.env.EMAIL_PORT_PROD
    : process.env.EMAIL_PORT_DEV;

const emailUser =
  process.env.NODE_ENV === 'production'
    ? process.env.EMAIL_USER_PROD
    : process.env.EMAIL_USER_DEV;

const emailPass =
  process.env.NODE_ENV === 'production'
    ? process.env.EMAIL_PASS_PROD
    : process.env.EMAIL_PASS_DEV;

const emailFrom =
  process.env.NODE_ENV === 'production' ? process.env.EMAIL_FROM_PROD : null;

const emailTransporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

exports.sendEmail = async (from, to, subject, text) => {
  const emailInfo = await emailTransporter.sendMail({
    from: emailFrom || from,
    to,
    subject,
    text,
  });
  return emailInfo;
};
