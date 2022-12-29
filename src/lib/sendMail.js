// google oauth follows: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

import nodemailer from 'nodemailer'
import { google } from 'googleapis'

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

export const sendMail = async mail => transporter.sendMail(mail)
