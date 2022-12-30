import React from 'react'
import { Box, Flex, Text, Link } from 'theme-ui'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'
import axios from 'axios'
import { Link as GatsbyLink } from 'gatsby'
import { HoneypotControl } from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'
import { InputField, PhoneNumberInput } from './fields'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  callingCode: '',
  phoneNumber: '',
  address1: '',
  region: '',
  city: '',
  code: '',
}

const codeRegex = /^(\d{5}|[a-z]\d[a-z]\s?\d[a-z]\d)$/i

const validationSchema = object({
  decepticons: string(),
  callingCode: string(),
  first_name: string().trim().required('required'),
  last_name: string().trim().required('required'),
  email: string().email('invalid email').required('required'),
  phoneNumber: string().trim().min(10).required('required'),
  address1: string().trim().required('required'),
  region: string().trim().required('required'),
  city: string().trim().required('required'),
  code: string().matches(codeRegex, 'invalid').required('required'),
})

const CardSignupForm = ({ onSuccess }) => (
  <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          axios.post(`/api/request-cards`, { ...values })
          setTimeout(() => {
            actions.resetForm()
            actions.setSubmitting(false)
            onSuccess()
          }, 650)
        } catch (e) {
          console.error(e)
          actions.setSubmitting(false)
        }
      }}
    >
      <Box
        as={Form}
        // autoComplete="off"
        sx={{
          width: '100%',
          maxWidth: 650,
          fieldset: { border: 'none' },
          'input, textarea': {
            fontFamily: 'body',
            color: 'text',
            fontSize: 0,
            letterSpacing: 'wider',
            '&::placeholder': {
              color: 'text',
            },
          },
          'label[for]': { paddingTop: '8px' },
          'label, span': {
            textTransform: 'uppercase',
            color: 'text',
            fontSize: 0,
            fontWeight: 'heading',
            letterSpacing: 'caps',
          },
          label: { paddingTop: 1 },
          'label[for^="photo"]': { display: 'none' },
          span: { textTransform: 'lowercase' },
          // prevents blue highlight...
          'input:focus, select:focus, textarea:focus, button:focus': {
            outline: 'none',
          },
          p: { height: 0, paddingTop: 0, lineHeight: 0 },
          '.flex': {
            display: ['block', 'flex'],
            justifyContent: 'space-between',
            div: { marginLeft: [0, '10px'] },
            'div:nth-of-type(1)': { marginLeft: 0 },
          },
        }}
        mx="auto"
      >
        <HoneypotControl name="decepticons" />
        <Box className="flex" sx={{ div: { flex: 1 } }}>
          <InputField name="first_name" label="first name" />
          <InputField name="last_name" label="last name" />
        </Box>
        <InputField name="email" label="email" />
        <PhoneNumberInput />
        <InputField name="address1" label="address" />
        <Box className="flex" sx={{ 'div:nth-of-type(1)': { flex: 1 } }}>
          <InputField name="city" label="city" />
          <InputField name="region" label="prov / state" />
          <InputField name="code" label="code / zip" maxLength="7" />
        </Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <SubmitButton sx={{ width: '100%', maxWidth: 360 }} mt={5}>
            send
          </SubmitButton>
        </Flex>
      </Box>
    </Formik>
    <Text
      as="p"
      variant="copy"
      sx={{
        fontSize: 0,
        maxWidth: 500,
        a: { color: 'primary', fontWeight: '600' },
      }}
      pb={4}
      px={3}
      mt={7}
      mx="auto"
    >
      by submitting this form and signing up via text, you consent to receive
      marketing text messages, promotions and reminders from bluboho at the
      number provided! message and data rates may apply. message frequency
      varies. you can unsubscribe at any time by replying STOP or clicking the
      unsubscribe link in your e-mail. view our{' '}
      <GatsbyLink to="/pages/privacy-policy">Privacy Policy</GatsbyLink> and{' '}
      <GatsbyLink to="/pages/terms-of-service">Terms of Service</GatsbyLink> for
      more info.
    </Text>
  </>
)

export default CardSignupForm
