import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Box, Button, Input, Text } from 'theme-ui'
import { useMutation } from 'urql'
import * as yup from 'yup'
import { CustomerCreate } from '../mutations/user'

const NewsletterForm = ({ variant = 'inverted' }) => {
  const [{ fetching, error, data }, mutate] = useMutation(CustomerCreate)

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={yup.object({ email: yup.string().email().required() })}
      onSubmit={async ({ email }) => {
        try {
          const res = await mutate({
            input: { email, password: '', acceptsMarketing: true },
          })
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }}
    >
      <Form>
        <Box pb={4}>
          <Field
            as={Input}
            name="email"
            type="email"
            variant={variant}
            sx={{ fontSize: 1 }}
            placeholder="Enter your email address"
          />
        </Box>
        <Button
          type="submit"
          disabled={fetching}
          variant={variant}
          sx={{ fontSize: 0 }}
        >
          Subscribe
        </Button>
      </Form>
    </Formik>
  )
}
export default NewsletterForm
