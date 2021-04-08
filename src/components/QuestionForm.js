import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { Divider, Button, Box, Textarea, Heading, Flex } from 'theme-ui'
import axios from 'axios'
import ControlWrap, { InputControl } from './util/FormControlWrap'

const validationSchema = Yup.object({
  content: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
})

const initialValues = {
  content: '',
  name: '',
  email: '',
}

const confirmation = `
THANK YOU FOR POSTING A QUESTION!
Please click on the link in the confirmation email we just sent you to submit your question.

Your question will appear on the site once someone answers it.
`

const QuestionForm = ({ yotpoProductDetails }) => (
  <Box>
    <Heading>Ask A Question</Heading>
    <Divider mb={6} />
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async values => {
        const res = await axios.post(
          `https://api.yotpo.com/questions/send_confirmation_mail`,
          {
            ...yotpoProductDetails,
            review_content: values.content,
            display_name: values.name,
            email: values.email,
          }
        )
      }}
    >
      <Form>
        <ControlWrap name="content" id="review_content" label="Your Review">
          <Field
            as={Textarea}
            name="review_content"
            placeholder="Your Review"
          />
        </ControlWrap>
        <InputControl
          name="name"
          type="input"
          label="Your Name"
          id="review_name"
          placeholder="Your name for the review"
        />
        <InputControl
          name="email"
          type="email"
          label="Your Email"
          id="review_name"
          placeholder="Your email to verify the review"
        />
        <Divider mt={4} mb={5} />
        <Flex sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit">Submit Review</Button>
        </Flex>
      </Form>
    </Formik>
  </Box>
)

export default QuestionForm
