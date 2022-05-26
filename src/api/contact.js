// google oauth follows: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { nanoid } from 'nanoid'

import createRecipientList from '../lib/createRecipientList'

const oauth2Client = new google.auth.OAuth2(
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
    user: 'noreply@bluboho.com',
    clientId: process.env.CONTACT_FORM_OAUTH_CLIENT_ID,
    clientSecret: process.env.CONTACT_FORM_OAUTH_CLIENT_SECRET,
    refreshToken: process.env.CONTACT_FORM_REFRESH_TOKEN,
    accessToken,
  },
})

export default async function (req, res) {
  const { body } = req

  if (body.decepticons) {
    return res.status(400).text('oops! something went wrong')
  }

  const html = `
    <div style="padding: 24px; border: 1px solid #e7e7e7; border-radius: 4px;max-width: 480px;">
      ${Object.keys(body)
        .filter(key => key !== 'subject')
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
  const from = `bluboho contact form <noreply@bluboho.com>`
  // include a nanoid in the subject to avoid threading
  const subject = `${body.subject} - ${nanoid(6)}`

  const info = await transporter.sendMail({
    from,
    subject,
    to,
    html,
  })

  return res.status(200).json(info)
}
