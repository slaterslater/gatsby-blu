const nodemailer = require('nodemailer')
const googleapis = require('googleapis')

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
    from: 'bluboho contact form <ian@bluboho.com>',
    to: 'ian@graydiant.com',
    subject: 'New Contact',
    html,
  })

  // console.log(info)

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  }
}
