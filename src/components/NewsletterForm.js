import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import * as yup from 'yup'
import { FiCheckSquare, FiAlertCircle } from 'react-icons/fi'
import { InputControl } from './app/formik/FormControlWrap'
import SubmitButton from './app/formik/SubmitButton'
import { CalloutBox } from './product/ProductCTACallout'

const NewsletterForm = ({
  variant = 'inverted',
  isSubscribed,
  onSuccess = () => {},
}) => {
  const [alert, setAlert] = useState({
    icon: null,
    type: '',
    title: '',
    description: '',
  })

  if (isSubscribed) return false

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={yup.object({ email: yup.string().email().required() })}
      onSubmit={async (values, { setSubmitting, reset }) => {
        console.log('submitting')
        try {
          const res = await axios.post(
            `${process.env.GATSBY_SERVERLESS_BASE}/newsletter`,
            values,
            { headers: { 'Content-Type': 'application/json' } }
          )

          if (res.status >= 400 && res.status < 600) {
            setAlert({
              icon: FiAlertCircle,
              type: 'error',
              title: 'Oops!',
              description: 'something went wrong',
            })
          } else {
            setAlert({
              icon: FiCheckSquare,
              type: 'success',
              title: 'success!',
              description: `${values.email} is subscribed to the newsletter`,
            })
            reset()
            onSuccess()
          }

          setSubmitting(false)
        } catch (e) {
          console.log('function error')
        }
      }}
    >
      <Form>
        {alert.type && (
          <CalloutBox
            bg="cream"
            icon={alert.icon}
            title={alert.title}
            description={alert.description}
          />
        )}
        <Box pt={4}>
          <InputControl
            label="Email Address"
            name="email"
            type="email"
            id="newsletter_page_email"
          />
        </Box>
        <Flex sx={{ justifyContent: 'flex-end' }}>
          <SubmitButton>Subscribe</SubmitButton>
        </Flex>
      </Form>
    </Formik>
  )
}
export default NewsletterForm
