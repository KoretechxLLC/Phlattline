import nodemailer from "nodemailer";

interface SendEmailOptions {
  email: string;
  subject: string;
  message: string;
}

interface SendEmailWithAttachmentOptions extends SendEmailOptions {
  pdfPath: string;
}

export const sendEmail = async ({ email, subject, message }: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      requireTLS: true,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: message,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  } catch (err) {
    throw err;
  }
};

export const sendEmailWithAttachment = async ({
  email,
  subject,
  message,
  pdfPath,
}: any) => {
  try {
    const transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.HOST,
      requireTLS: true,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: message,
      attachments: [{ filename: "ticketevent.pdf", path: pdfPath }],
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  } catch (err) {
    throw err;
  }
};
