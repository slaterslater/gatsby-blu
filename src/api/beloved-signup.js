// google oauth follows: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import axios from 'axios'

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
  const { email, message, decepticons } = req.body

  if (decepticons) {
    return res.status(400).text('oops! something went wrong')
  }

  const html = `
    <div style="padding: 24px; border: 1px solid #e7e7e7; border-radius: 4px;max-width: 480px;">
      <div style="padding-bottom: 16px;">
        <p style="padding-bottom: 4px;margin: 0;">email: ${email}</p>
        <p style="margin: 0;padding:0;">${message}</p>
      </div>
    </div>
  `

  const to = ['guestexperience@bluboho.com', 'maddie@bluboho.com']
  const from = `<noreply@bluboho.com>`
  const subject = `beloved signup - ${email}`

  try {
    await transporter.sendMail({
      from,
      subject,
      to,
      html,
    })
  } catch {
    return res.status(400).text('error sending email')
  }

  try {
    // add profile to klaviyo list
    const API_KEY = process.env.GATSBY_KLAVIYO_API_KEY
    const LIST_ID = 'Yug94i'
    const url = `https://a.klaviyo.com/api/v2/list/${LIST_ID}/members?api_key=${API_KEY}`
    const profiles = [{ email }]
    await axios.post(url, { profiles })
    return res.status(201).json({ message: 'profile added to klaviyo' })
  } catch (e) {
    return res.status(400).text('error adding profile to klaviyo')
  }
}
