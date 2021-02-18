import { Field, Form, Formik } from 'formik'
import React from 'react'
import { Box, Button, Input, Text } from 'theme-ui'

const NewsletterForm = () => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={() => console.log('form go!')}
  >
    <Form>
      <Box pb={3}>
        <Field
          as={Input}
          name="email"
          type="email"
          variant="inverted"
          sx={{ fontSize: 1 }}
          placeholder="Enter your email address"
        />
      </Box>
      <Button type="submit" variant="inverted" sx={{ fontSize: 0 }}>
        Subscribe
      </Button>
    </Form>
  </Formik>
)

export default NewsletterForm
