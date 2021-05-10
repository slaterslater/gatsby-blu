import { Formik, Form } from 'formik'
import { pickBy } from 'lodash'
import React from 'react'
import * as yup from 'yup'
import { Box, Button, Grid } from 'theme-ui'
import {
  HoneypotControl,
  InputControl,
  SelectControl,
  TextareaControl,
} from './app/formik/FormControlWrap'
import SubmitButton from './app/formik/SubmitButton'

const locationOpts = [
  'in-person: 350 queen st w. (toronto)',
  'in-person: 2616 yonge st. (toronto)',
  'in-person: 293 Lakeshore Road East Oakville, Ontario L6J 1J3',
  'virtual',
]

const timeOpts = ['week day', 'weekend']
const lookingForOpts = [
  'engagement ring',
  'wedding band',
  'other bridal jewelry',
]

const hearAboutOpts = [
  'family or friend recommendation ',
  'in-store customer service recommendation ',
  'online customer service recommendation ',
  'google',
  'advertisement ',
  'instagram ',
  'facebook ',
  'blog or influencer ',
  'other',
]

const encodeNetlifyForm = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  location: yup
    .string()
    .oneOf(locationOpts, 'required field')
    .required('location is requied')
    .nullable(),
  'what are you looking for': yup
    .string()
    .oneOf(lookingForOpts, 'required field')
    .required(),
  phone: yup.string(),
  'preferred time': yup.string().oneOf(timeOpts, 'required field').required(),
  'how did you hear about us': yup
    .string()
    .oneOf(hearAboutOpts, 'required field')
    .required(),
  comments: yup.string(),
  'brot-field': yup.string(),
})

const initialValues = {
  name: '',
  email: '',
  location: null,
  'preferred time': null,
  'how did you hear about us': null,
  'what are you looking for': null,
  comments: '',
  phone: '',
  'brot-field': '',
}

const BookConsultationForm = ({ onSuccess, onError }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={async (values, actions) => {
      // console.log(values)
      try {
        await fetch(`${process.env.NETLIFY_SERVERLESS_BASE}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: pickBy(values, val => !!val),
        })
        actions.resetForm()
        onSuccess()
      } catch (e) {
        console.error(e)
      }
      actions.setSubmitting(false)
    }}
  >
    <Form name="book-a-consultation">
      <Grid sx={{ gridTemplateColumns: ['1fr', '1fr 1fr'] }}>
        <HoneypotControl name="brot-field" />
        <InputControl label="Your name" id="name" name="name" type="input" />
        <InputControl label="Your email" id="email" name="email" type="email" />
        <SelectControl
          label="Select location"
          id="location"
          name="location"
          placeholder="make a selection"
        >
          {locationOpts.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectControl>
        <InputControl
          label="Your phone number"
          id="phone"
          name="phone"
          type="phone"
        />
        <SelectControl
          label="What are you looking for?"
          id="looking_for"
          name="what are you looking for"
          placeholder="make a selection"
        >
          {lookingForOpts.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectControl>
        <SelectControl
          label="preferred time"
          id="preferred_time"
          name="preferred time"
          placeholder="make a selection"
        >
          {timeOpts.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectControl>
        <SelectControl
          label="How did you hear about bluboho bridal and ring consultations?"
          id="how_did_you"
          name="how did you hear about us"
          placeholder="make a selection"
        >
          {hearAboutOpts.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </SelectControl>
        <Box sx={{ gridColumnStart: 1, gridColumnEnd: -1 }}>
          <TextareaControl
            name="comments"
            label="any additional comments?"
            id="comments"
          />
        </Box>
        <SubmitButton sx={{ gridColumnStart: 1, gridColumnEnd: -1 }}>
          Send
        </SubmitButton>
      </Grid>
    </Form>
  </Formik>
)

export default BookConsultationForm
