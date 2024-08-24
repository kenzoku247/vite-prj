const { emailVerification, passwordVerification } = require('@/templates/emailVerification');

const { Resend } = require('resend');

const sendMail = async ({
  email,
  name,
  link,
  admin_email,
  subject = 'Verify your email',
  type = 'emailVerification',
}) => {
  try {
    console.log(email);
    const resend = new Resend(process.env.RESEND_API);
  
    const data = await resend.emails.send({
      from: admin_email,
      to: [email],
      subject,
      html:
        type === 'emailVerification'
          ? emailVerification({ name, link })
          : passwordVerification({ name, link }),
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error sending email:', error)
    throw error;
  }
};

module.exports = sendMail;
