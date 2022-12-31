/* eslint-disable camelcase */
import axios from 'axios'
import { nanoid } from 'nanoid'
import { sendMail } from '../lib/sendMail'

export default async function (req, res) {
  if (req.body.decepticons)
    return res.status(400).json({ message: 'ERROR - decepticons' })

  const {
    first_name,
    last_name,
    email,
    callingCode,
    phoneNumber,
    address1,
    city,
    region,
    code,
  } = req.body

  const phone_number = `+${callingCode}${phoneNumber}`
  const zip = code.toUpperCase()

  const html = `
    <div style="padding: 24px; border: 1px solid #e7e7e7; border-radius: 4px;max-width: 480px;">
        <p style="padding-bottom: 4px;margin: 0;">Please send  3 contemplation cards to:</p>
        <ul style="list-style-type: none; padding-bottom: 16px;">
          <li>${first_name} ${last_name}</li>
          <li>${address1}</li>
          <li>${city}, ${region}, ${zip}</li>
          <br />
          <li>${email}</li>
          <li>${phone_number}</li>
        </ul>  
        <p style="padding-bottom: 4px;margin: 0;">Make sure to note the guest's information and the date cards were sent out on the Clienteling Tracker</p>
    </div>
  `

  const to = ['guestexperience@bluboho.com']
  const from = '<noreply@bluboho.com>'
  // eslint-disable-next-line prettier/prettier
  const subject = `${first_name} would like to receive contemplation cards - ${nanoid(6)}`

  try {
    await sendMail({ to, from, subject, html })
  } catch {
    return res.status(400).json({ message: 'ERROR - in sendMail step' })
  }

  try {
    // add profile to klaviyo list
    const API_KEY = process.env.GATSBY_KLAVIYO_API_KEY
    const LIST_ID = 'Yu5H7v'
    const url = `https://a.klaviyo.com/api/v2/list/${LIST_ID}/subscribe?api_key=${API_KEY}`
    const profiles = [
      {
        first_name,
        last_name,
        email,
        phone_number,
        sms_consent: true,
        address1,
        city,
        region,
        zip,
      },
    ]

    await axios.post(url, { profiles })
    return res
      .status(201)
      .json({ message: 'email sent and profile added to klaviyo' })
  } catch {
    return res.status(400).json({ message: 'ERROR - in klaviyo step' })
  }
}
