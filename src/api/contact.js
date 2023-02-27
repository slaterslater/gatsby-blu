import { nanoid } from 'nanoid'
import { sendMail } from '../lib/sendMail'

import createRecipientList from '../lib/createRecipientList'

export default async function (req, res) {
  // res.setHeader('Access-Control-Allow-Origin', '*')
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

  try {
    await sendMail({
      from,
      subject,
      to,
      html,
    })

    return res.status(200).json({ message: 'contact form sent successfully' })
  } catch {
    return res.status(400).json({ message: 'ERROR sending mail...' })
  }
}
