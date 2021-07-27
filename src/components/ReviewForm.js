import { Formik, Form, ErrorMessage, Field, useField } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import {
  Divider,
  Button,
  Box,
  Textarea,
  Label,
  Input,
  Text,
  IconButton,
  Heading,
  Flex,
} from 'theme-ui'
import axios from 'axios'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import ControlWrap, { InputControl } from './app/formik/FormControlWrap'
import YotpoFormConfirmation from './yotpo/YotpoFormConfirmation'
import SubmitButton from './app/formik/SubmitButton'

const StarsControl = ({ label, id, name, count = 5 }) => {
  const [, { value }, { setValue }] = useField(name)
  return (
    <ControlWrap label={label} id={id} name={name}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <IconButton
            p={0}
            key={`${name}-${i}`}
            type="button"
            onClick={() => setValue(i + 1)}
            sx={{ height: 24, width: 24 }}
          >
            {value >= i + 1 ? <IoIosStar /> : <IoIosStarOutline />}
          </IconButton>
        ))}
    </ControlWrap>
  )
}

const validationSchema = Yup.object({
  score: Yup.number().required(),
  title: Yup.string().required(),
  content: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
})

const initialValues = {
  score: null,
  title: '',
  content: '',
  name: '',
  email: '',
}

const ReviewForm = ({ yotpoProductDetails, onClose }) => {
  const [success, setSuccess] = useState(false)
  if (success) return <YotpoFormConfirmation type="review" onClose={onClose} />

  return (
    <Box>
      <Heading>Write a Review</Heading>
      <Divider mb={6} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => {
          try {
            await axios.post(`https://api.yotpo.com/v1/widget/reviews`, {
              ...yotpoProductDetails,
              review_content: values.content,
              display_name: values.name,
              email: values.email,
              review_score: values.score,
              review_title: values.title,
            })
            setSuccess(true)
          } catch (error) {
            console.log({ error })
          }
        }}
      >
        <Form>
          <StarsControl name="score" id="review_score" label="Score" />
          <InputControl
            name="title"
            type="input"
            label="Title"
            id="review_title"
            placeholder="A short title for your review"
          />
          <ControlWrap name="content" id="review_content" label="Your Review">
            <Field
              as={Textarea}
              name="content"
              id="review_content"
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
            <SubmitButton>Submit Review</SubmitButton>
          </Flex>
        </Form>
      </Formik>
    </Box>
  )
}

export default ReviewForm
