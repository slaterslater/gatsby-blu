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
    // address1,
    // city,
    // region,
    // code,
  } = req.body

  const phone_number = `+${callingCode}${phoneNumber}`
  // const zip = code.toUpperCase()
  // <li>${address1}</li>
  // <li>${city}, ${region}, ${zip}</li>

  const html = `
    <div style="padding: 24px; border: 1px solid #e7e7e7; border-radius: 4px;max-width: 480px;">
        <p style="padding-bottom: 4px;margin: 0;">Please send  3 contemplation cards to:</p>
        <ul style="list-style-type: none; padding-bottom: 16px;">
          <li>${first_name} ${last_name}</li>

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
    // // add profile to klaviyo list
    const API_KEY = process.env.GATSBY_KLAVIYO_API_KEY
    const LIST_ID = 'Yu5H7v'

    const options = {
      method: 'POST',
      url: 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
      headers: {
        accept: 'application/json',
        revision: '2024-07-15',
        'content-type': 'application/json',
        Authorization: `Klaviyo-API-Key ${API_KEY}`,
      },
      data: {
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    subscriptions: {
                      email: { marketing: { consent: 'SUBSCRIBED' } },
                      sms: { marketing: { consent: 'SUBSCRIBED' } },
                    },
                    email,
                    phone_number,
                  },
                },
              ],
            },
            historical_import: false,
          },
          relationships: {
            list: { data: { type: 'list', id: LIST_ID } },
          },
        },
      },
    }

    await axios(options)

    return res
      .status(201)
      .json({ message: 'email sent and profile added to klaviyo' })
  } catch (error) {
    return res.status(400).json({ message: 'ERROR - in klaviyo step', error })
    // if (error.response) {
    //   console.error('Error data:', error.response.data)
    //   console.error('Error status:', error.response.status)
    //   console.error('Error headers:', error.response.headers)
    // } else {
    //   console.error('Error message:', error.message)
    // }
  }
}
