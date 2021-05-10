const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: 'bluboho contact form <bluboho@example.com>',
    to: 'guestexperience@example.com',
    subject: 'New Contact',
    html: `<p>this is a consultation request</p>`,
  })

  console.log(info)

  return {
    statusCode: 200,
    body: info,
  }
}
