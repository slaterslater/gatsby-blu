import React, { useState } from 'react'
import { Box, Flex, Label, Link, Text } from 'theme-ui'
import { useField, ErrorMessage, Form, Formik } from 'formik'
import { boolean, object, string } from 'yup'
import axios from 'axios'
import {
  HoneypotControl,
  InputControl,
  TextareaControl,
} from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'
import CallingCodePicker from '../CallingCodePicker'
import { countries } from '../../data/smsCountries'
import { CallingCodeField, PhoneNumberField } from '../SmsForm'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  callingCode: '',
  phoneNumber: '',
  message: '',
}

const validationSchema = object({
  decepticons: string(),
  firstName: string().required(),
  lastName: string().required(),
  email: string()
    .email('invalid email')
    .when('phoneNumber', {
      is: num => !num || num.length === 0,
      then: string().required('at least one of EMAIL or PHONE is required'),
    }),
  message: string(),
  callingCode: string().max(2),
  phoneNumber: string().min(10),
})

const InputField = ({ name, label, placeholder = null }) => (
  <InputControl name={name} id={name} label={label} placeholder={placeholder} />
)

const TextField = ({ name, label, placeholder = null, maxLength = 300 }) => {
  const [, meta] = useField({ name })
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <TextareaControl
        id={name}
        name={name}
        label={label}
        placeholder={placeholder}
        maxLength={maxLength}
        rows="10"
      />
      <Text
        as="p"
        ml="auto"
        sx={{ color: 'primary', opacity: '50%', fontSize: 0 }}
      >{`${meta.value?.length || 0} / ${maxLength}`}</Text>
    </Flex>
  )
}

const BelovedSignupForm = ({
  onSuccess,
  withPhone = false,
  withMessage = false,
}) => {
  const [currentCountry, setCurrentCountry] = useState(countries[0])
  const color = 'primary'

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          await axios.post(`/api/beloved-signup`, values)
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
        autoComplete="off"
        sx={{
          width: '100%',
          maxWidth: 650,
          div: { paddingBottom: 0 },
          fieldset: { border: 'none' },
          'input, textarea': {
            bg: 'white',
            fontFamily: 'body',
            color: 'text',
            fontSize: 0,
            letterSpacing: 'wider',
            '&::placeholder': {
              color: 'text',
            },
          },
          'label[for]': { paddingTop: 25 },
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
          '#phoneError': {
            display: 'block',
            color: 'error',
            fontSize: 0,
            fontWeight: 'normal',
          },
        }}
        mx="auto"
      >
        <Box as="fieldset">
          <HoneypotControl name="decepticons" />
          <InputField name="firstName" label="first name" />
          <InputField name="lastName" label="last name" />
          <InputField name="email" label="email" />
          {withPhone && (
            <>
              <Label htmlFor="phoneNumber" pb={2}>
                phone
              </Label>
              <Flex
                sx={{
                  bg: 'white',
                  flex: '1 0 max-content',
                  alignItems: 'center',
                  border: '1px solid',
                  borderColor: 'border',
                }}
              >
                <CallingCodePicker
                  color={color}
                  countries={countries}
                  currentCountry={currentCountry}
                  setCurrentCountry={setCurrentCountry}
                />
                <CallingCodeField callingCode={currentCountry.callingCode} />
                <PhoneNumberField color={color} />
              </Flex>
              <ErrorMessage
                id="phoneError"
                component={Text}
                pt={3}
                px={1}
                sx={{ color: 'error' }}
                name="phoneNumber"
              />
            </>
          )}
          {withMessage && (
            <TextField
              name="message"
              label="message"
              placeholder="let us know what you're looking for— a particular stone colour, ring recommendations, sizing advice, suggestions on where to start, etc."
              maxLength={500}
            />
          )}
        </Box>
        <Flex sx={{ justifyContent: 'center' }}>
          <SubmitButton
            sx={{ width: '100%', maxWidth: 360, bg: 'navy' }}
            mt={6}
          >
            send
          </SubmitButton>
        </Flex>
        {withPhone && (
          <Text
            as="p"
            variant="copy"
            sx={{
              fontSize: 0,
              color: 'primary',
            }}
            mt={6}
            p={4}
          >
            by submitting this form and signing up via text, you consent to
            receive marketing text messages, promotions and reminders from
            bluboho at the number provided! message and data rates may apply.
            message frequency varies. you can unsubscribe at any time by
            replying STOP or clicking the unsubscribe link in your e-mail. view
            our{' '}
            <Link
              href="/pages/privacy-policy"
              target="_blank"
              sx={{ fontWeight: '600', fontSize: 0 }}
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/pages/terms-of-service"
              target="_blank"
              sx={{ fontWeight: '600', fontSize: 0 }}
            >
              Terms of Service
            </Link>{' '}
            for more info.
          </Text>
        )}
      </Box>
    </Formik>
  )
}

export default BelovedSignupForm
