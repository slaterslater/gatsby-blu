const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ian@bluboho.com',
//     pass: 'Thisismyblubohopassword1!1!',
//   },
// })

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)

  if (body.decepticon)
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'oops! something went wrong',
      }),
    }

  const html = `
    <div>
      <dl>
        ${Object.keys(body)
          .map(
            key => `
            <div>
              <dt>${key}</dt>
              <dd>${body[key]}</dd>
            </div>
            `
          )
          .join('')}
      </dl>
    </div>
  `

  const info = await transporter.sendMail({
    from: 'bluboho contact form <website@bluboho.com>',
    to: process.env.INBOUND_EMAIL_ADDRESS,
    subject: 'New Contact',
    html,
  })

  // console.log(info)

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  }
}
