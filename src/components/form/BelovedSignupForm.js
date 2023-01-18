import React from 'react'
import { Box, Flex, Text, Heading } from 'theme-ui'
import { Form, Formik, useField } from 'formik'
import { object, string } from 'yup'
import axios from 'axios'
import {
  HoneypotControl,
  InputControl,
  TextareaControl,
} from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'

const initialValues = {
  email: '',
  message: '',
}

const validationSchema = object({
  decepticons: string(),
  email: string().email('invalid email').required('required'),
  message: string(),
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

const BelovedSignupForm = ({ onSuccess }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={async (values, actions) => {
      const { email, message } = values
      const body = {
        email,
        message,
      }
      try {
        axios.post(`/api/beloved-signup`, body)
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
          fontFamily: 'body',
          color: 'text',
          fontSize: 0,
          letterSpacing: 'wider',
          '&::placeholder': {
            color: 'text',
          },
        },
        'label[for]': { paddingTop: 35 },
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
      }}
      mx="auto"
    >
      <Heading as="h2" variant="h2" sx={{ textAlign: 'center' }} pt={[5, 1]}>
        get in touch
      </Heading>
      <Text
        as="p"
        variant="copy"
        sx={{ textAlign: 'center', maxWidth: 420 }}
        pt={6}
        mx="auto"
      >
        request assistance from our beloved by bluboho experts— let us know how
        we can help, and we'll follow up with the answers to your questions.
      </Text>
      <Box as="fieldset">
        <HoneypotControl name="decepticons" />
        <InputField name="email" label="email" />
        <TextField
          name="message"
          label="message"
          placeholder="let us know what you're looking for— a particular stone colour, ring recommendations, sizing advice, suggestions on where to start, etc."
          maxLength={500}
        />
      </Box>
      <Flex sx={{ justifyContent: 'center' }}>
        <SubmitButton sx={{ width: '100%', maxWidth: 360 }} mt={6}>
          send
        </SubmitButton>
      </Flex>
    </Box>
  </Formik>
)

export default BelovedSignupForm
