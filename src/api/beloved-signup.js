// google oauth follows: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
import axios from 'axios'
import { sendMail } from '../lib/sendMail'

export default async function (req, res) {
  const {
    firstName,
    lastName,
    email,
    message,
    callingCode,
    phoneNumber,
    decepticons,
  } = req.body

  if (decepticons) {
    return res.status(400).json({ error: 'oops! something went wrong' })
  }

  // send email
  if (email) {
    const html = `
    <div style="padding: 24px; border: 1px solid #e7e7e7; border-radius: 4px;max-width: 480px;">
      <div style="padding-bottom: 16px;">
        <p style="padding-bottom: 4px;margin: 0;">${firstName} ${lastName}</p>
        <p style="padding-bottom: 4px;margin: 0;">email: ${email}</p>
        <p style="margin: 0;padding:0;">${message}</p>
      </div>
    </div>
  `

    const to = ['guestexperience@bluboho.com', 'maddie@bluboho.com']
    const from = `<noreply@bluboho.com>`
    const subject = `beloved signup - ${email}`

    try {
      await sendMail({ to, from, subject, html })
    } catch {
      return res.status(400).json({ error: 'error sending email' })
    }
  }

  // add email & phone to klaviyo
  try {
    const API_KEY = process.env.GATSBY_KLAVIYO_API_KEY
    const LIST_ID = 'Yug94i'
    const url = `https://a.klaviyo.com/api/v2/list/${LIST_ID}/members?api_key=${API_KEY}`

    const values = {
      first_name: firstName,
      last_name: lastName,
    }

    if (email) values.email = email
    if (phoneNumber) values.phone_number = `+${callingCode}${phoneNumber}`

    await axios.post(url, { profiles: [values] })
    return res.status(201).json({ message: 'profile added to klaviyo' })
  } catch (e) {
    return res.status(400).json({ error: 'error adding profile to klaviyo' })
  }
}
