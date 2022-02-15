import React from 'react'
import { Box, Flex } from 'theme-ui'
import { Form, Formik } from 'formik'
import { pickBy } from 'lodash'
import { object, string } from 'yup'
import {
  HoneypotControl,
  InputControl,
  TextareaControl,
} from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'

const initialValues = {
  name: '',
  email: '',
  website: '',
  instagram: '',
  message: '',
}
const validationSchema = object({
  name: string().required(),
  email: string().email().required(),
  website: string(),
  instagram: string(),
  message: string(),
  decepticons: string(),
})

const WholesaleForm = ({ onSuccess }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={async (values, actions) => {
      const body = pickBy(values, val => !!val)
      const { name, email } = values
      body.subject = `wholesale application from ${name} (${email})`
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        actions.resetForm()
        onSuccess()
      } catch (e) {
        console.error(e)
      }
      actions.setSubmitting(false)
    }}
  >
    <Box
      as={Form}
      sx={{
        width: '100%',
        'input, textarea': {
          fontFamily: 'body',
          color: 'text',
          fontSize: 0,
          letterSpacing: 'wider',
          '&::placeholder': {
            color: 'text',
          },
        },
        label: {
          textTransform: 'uppercase',
          color: 'text',
          fontSize: 0,
          fontWeight: 'heading',
          letterSpacing: 'caps',
        },
      }}
    >
      <HoneypotControl name="decepticons" />
      {['name', 'email', 'company-website', 'company-instagram'].map(value => (
        <InputControl
          key={`input-${value}`}
          name={value}
          id={value}
          label={value.replace(/-/g, ' ')}
          placeholder={`your ${value.replace(/.*-/, '')}`}
          mb={2}
        />
      ))}
      <TextareaControl
        name="message"
        id="message"
        label="send us a note"
        placeholder="your message"
        rows="12"
      />
      <Flex>
        <SubmitButton sx={{ width: [115, 160] }} mt={4}>
          Submit
        </SubmitButton>
      </Flex>
    </Box>
  </Formik>
)

export default WholesaleForm
