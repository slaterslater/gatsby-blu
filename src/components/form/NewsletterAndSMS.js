import axios from 'axios'
import { Form, Formik } from 'formik'
import React from 'react'
import { Box, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { object, string } from 'yup'
import { HoneypotControl } from '../app/formik/FormControlWrap'
import { InputField, PhoneNumberInput } from './fields'
import SubmitButton from '../app/formik/SubmitButton'

const initialValues = {
  email: '',
  callingCode: '',
  phoneNumber: '',
}

const validationSchema = object().shape(
  {
    decepticons: string(),
    email: string()
      .email('invalid email')
      .when('phoneNumber', {
        is: phoneNumber => !phoneNumber || phoneNumber.length === 0,
        then: string().required('At least one of the fields is required'),
      }),
    phoneNumber: string().when('email', {
      is: email => !email || email.length === 0,
      then: string().required('At least one of the fields is required'),
    }),
  },
  ['email', 'phoneNumber']
)

const NewsletterAndSMS = ({ onSuccess }) => (
  <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          const { email, phoneNumber, callingCode, decepticons } = values
          // signup
          if (decepticons) throw new TypeError('signup error')
          if (email) axios.post(`/api/newsletter`, { email })
          if (phoneNumber) axios.post(`/api/sms`, { phoneNumber, callingCode })
          // show message & reset form
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
            width: '100%',
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
          span: { textTransform: 'lowercase', display: 'block' },
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
          button: { width: 160, display: 'block' },
        }}
        mx="auto"
      >
        <HoneypotControl name="decepticons" />
        <InputField
          name="email"
          label="email"
          placeholder="enter your email address"
        />
        <Text sx={{ textAlign: 'center' }}>and / or</Text>
        <PhoneNumberInput />
        <SubmitButton variant="inverted" mt={5} mx="auto">
          sign up
        </SubmitButton>
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

export default NewsletterAndSMS
