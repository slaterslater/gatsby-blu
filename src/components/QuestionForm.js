import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { Divider, Box, Textarea, Heading, Flex } from 'theme-ui'
import axios from 'axios'
import ControlWrap, { InputControl } from './app/formik/FormControlWrap'
import YotpoFormConfirmation from './yotpo/YotpoFormConfirmation'
import SubmitButton from './app/formik/SubmitButton'
import { delay } from '../lib/delay'

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

const QuestionForm = ({ yotpoProductDetails, onClose }) => {
  const [success, setSuccess] = useState(false)
  if (success)
    return <YotpoFormConfirmation onClose={onClose} type="question" />

  return (
    <Box>
      <Heading>Ask A Question</Heading>
      <Divider mb={6} />
      {!success && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async values => {
            try {
              await axios.post(
                `https://api.yotpo.com/questions/send_confirmation_mail`,
                {
                  ...yotpoProductDetails,
                  review_content: values.content,
                  display_name: values.name,
                  email: values.email,
                }
              )
              setSuccess(true)
            } catch (error) {
              console.log({ error })
            }
          }}
        >
          <Form>
            <ControlWrap
              name="content"
              id="question_content"
              label="Your Question"
            >
              <Field
                as={Textarea}
                id="question_content"
                name="content"
                placeholder="Question Review"
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
              <SubmitButton>Submit Question</SubmitButton>
            </Flex>
          </Form>
        </Formik>
      )}
    </Box>
  )
}

export default QuestionForm
