import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Box, Button, Flex, Input, Text } from 'theme-ui'
import { useMutation } from 'urql'
import * as yup from 'yup'
import { CustomerCreate } from '../mutations/user'
import { InputControl } from './app/formik/FormControlWrap'
import SubmitButton from './app/formik/SubmitButton'

const NewsletterForm = ({ variant = 'inverted', isSubscribed }) => {
  if (isSubscribed) return false

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={yup.object({ email: yup.string().email().required() })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log('submitting')
        try {
          const res = await axios.post(
            `${process.env.GATSBY_SERVERLESS_BASE}/newsletter`,
            values,
            { headers: { 'Content-Type': 'application/json' } }
          )

          if (res.status >= 400 && res.status < 600) {
            console.log('server error')
          } else {
            console.log('success')
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
  )
}
export default NewsletterForm
