// google oauth follows: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

const nodemailer = require('nodemailer')
const googleapis = require('googleapis')
const { nanoid } = require('nanoid')
const createRecipientList = require('./createRecipientList')

const { OAuth2 } = googleapis.google.auth

const oauth2Client = new OAuth2(
  process.env.CONTACT_FORM_OAUTH_CLIENT_ID,
  process.env.CONTACT_FORM_OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
)

oauth2Client.setCredentials({
  refresh_token: process.env.CONTACT_FORM_REFRESH_TOKEN,
})
const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'ian@bluboho.com',
    clientId: process.env.CONTACT_FORM_OAUTH_CLIENT_ID,
    clientSecret: process.env.CONTACT_FORM_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.CONTACT_FORM_REFRESH_TOKEN,
    accessToken,
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
    <div style="padding: 24px; border: 1px solid #e7e7e7; border-radius: 4px;max-width: 480px;">
      ${Object.keys(body)
        .filter(key => key === 'subject')
        .map(
          key => `
          <div style="padding-bottom: 16px;">
            <p style="padding-bottom: 4px;margin: 0;"><b>${key}</b></p>
            <p style="margin: 0;padding:0;">${body[key]}</p>
          </div>
          `
        )
        .join('')}
    </div>
  `

  const to = createRecipientList(body)

  // include a nanoid in the subject to avoid threading
  const nanoId = nanoid(6)
  const subject = `${body.subject} - ${nanoId}`

  const info = await transporter.sendMail({
    from: 'bluboho contact form <ian@bluboho.com>',
    subject,
    to,
    html,
  })

  console.log(to, info)

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  }
}
