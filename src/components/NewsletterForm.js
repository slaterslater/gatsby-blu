import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useState, useContext } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import * as yup from 'yup'
import { FiCheckSquare, FiAlertCircle } from 'react-icons/fi'
import { InputControl } from './app/formik/FormControlWrap'
import SubmitButton from './app/formik/SubmitButton'
import { CalloutBox } from './product/ProductCTACallout'
import { NewsletterContext } from '../contexts/NewsletterContext'

const NewsletterForm = ({ variant = 'inverted' }) => {
  const [alert, setAlert] = useState({
    icon: null,
    type: '',
    title: '',
    description: '',
  })

  const { isSubscribed, subscribe } = useContext(NewsletterContext)

  return (
    <>
      {alert.type && (
        <CalloutBox
          bg="cream"
          icon={alert.icon}
          title={alert.title}
          description={alert.description}
        />
      )}
      {!isSubscribed && (
        <Formik
          initialValues={{ email: '' }}
          validationSchema={yup.object({
            email: yup.string().email().required(),
          })}
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
                subscribe()
                reset()
              }

              setSubmitting(false)
            } catch (e) {
              console.log('function error')
            }
          }}
        >
          <Form>
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
      )}
    </>
  )
}
export default NewsletterForm
