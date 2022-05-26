import React from 'react'
import { Box, Button, Flex, Text, Label, Checkbox, Link } from 'theme-ui'
// import { Link as GatsbyLink } from 'gatsby'
import { ErrorMessage, Field, Form, Formik, useField } from 'formik'
import { pickBy } from 'lodash'
import { bool, mixed, object, string } from 'yup'
import axios from 'axios'
import {
  HoneypotControl,
  InputControl,
  TextareaControl,
} from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'

const initialValues = {
  email: '',
  shouldEmailSubscribe: false,
  names: '',
  journeyBeginning: '',
  choosingBlu: '',
  ring: '',
  workingWithBlu: '',
  momentEngaged: '',
  ringSignificance: '',
  terms: false,
}

const isChecked = () => bool().oneOf([true], 'required')

const validationSchema = object({
  decepticons: string(),
  email: string().email().required(),
  names: string().required('required'),
  shouldEmailSubscribe: bool(),
  journeyBeginning: string(),
  choosingBlu: string(),
  ring: string(),
  workingWithBlu: string(),
  momentEngaged: string(),
  ringSignificance: string(),
  terms: isChecked(),
})

const InputField = ({ name, label, placeholder = null }) => (
  <InputControl name={name} id={name} label={label} placeholder={placeholder} />
)

const TextFeild = ({ name, label, placeholder = null, maxLength = 300 }) => {
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
        sx={{ color: 'navy', opacity: '50%', fontSize: 0 }}
      >{`${meta.value?.length || 0} / ${maxLength}`}</Text>
    </Flex>
  )
}

const CheckBoxField = ({ name, children }) => (
  <Flex>
    <Label sx={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
      <Field as={Checkbox} id={name} name={name} />
      {children}
    </Label>
    <ErrorMessage
      component={Text}
      as="p"
      pt={1}
      px={3}
      sx={{ color: 'error', alignSelf: 'center' }}
      name={name}
    />
  </Flex>
)

const FieldSetTitle = ({ text, subtext = null, fontStyle = 'italic' }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: 600,
    }}
    mx="auto"
  >
    <Text
      as="p"
      variant="caps"
      sx={{ fontStyle, whiteSpace: 'pre-line' }}
      pt={3}
    >
      {text}
    </Text>
    {subtext && <Text sx={{ whiteSpace: 'pre-line' }}>{subtext}</Text>}
  </Flex>
)

const ShareTheLoveForm = ({ onSuccess }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={async (values, actions) => {
      const { shouldEmailSubscribe, email } = values
      const keysToIgnore = ['shouldEmailSubscribe', 'terms']
      const body = pickBy(
        values,
        (val, key) => !!val && !keysToIgnore.includes(key)
      )
      body.subject = `love story from ${email}`
      try {
        Promise.all([
          await axios.post('/api/contact', body),
          shouldEmailSubscribe &&
            (await axios.post(`/api/newsletter`, { email })),
        ])
        actions.resetForm()
        actions.setSubmitting(false)
        onSuccess()
      } catch (e) {
        console.error(e)
        actions.setSubmitting(false)
      }
    }}
  >
    <Box
      as={Form}
      sx={{
        width: '100%',
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
      }}
    >
      <Box as="fieldset">
        <HoneypotControl name="decepticons" />
        <InputField name="email" label="email address" />
        <CheckBoxField name="shouldEmailSubscribe">
          <Text>
            sign up to recieve email updates on latest news and promotions
          </Text>
        </CheckBoxField>
        <InputField
          name="names"
          label="tell us a little about yourselves!"
          placeholder="names + how long you've been together"
        />
        <TextFeild
          name="journeyBeginning"
          label="how did your journey begin?"
          placeholder="when did you know you'd found the one?"
          maxLength={500}
        />
      </Box>
      <Box as="fieldset">
        <FieldSetTitle
          text={`Now that you've told us about finding the one, \ntell us about finding the ring`}
        />
        <TextFeild name="choosingBlu" label="what made you choose bluboho?" />
        <InputField
          name="ring"
          label="which ring did they say yes to?"
          placeholder="name of the ring"
        />
        <TextFeild
          name="workingWithBlu"
          label="how was your experience of working with the beloved by bluboho team to find the one?"
        />
      </Box>
      <Box as="fieldset">
        <FieldSetTitle text="okay, now for the big moment!" />
        <TextFeild
          name="momentEngaged"
          label="tell us about the moment you got engaged"
          maxLength={500}
        />
        <TextFeild
          name="ringSignificance"
          label="how do you feel when you look at your ring?"
          placeholder="what does it mean to you?"
          maxLength={200}
        />
      </Box>
      <Box as="fieldset" mt={4}>
        <CheckBoxField name="terms">
          <Text sx={{ alignSelf: 'top', whiteSpace: 'pre-line' }}>
            {`I agree to abide by the `}
            <Link
              href="/pages/terms-of-service"
              sx={{ fontWeight: 'bold' }}
              target="_blank"
            >
              bluboho&nbsp;Terms&nbsp;of&nbsp;Use
            </Link>
          </Text>
        </CheckBoxField>
      </Box>
      <Flex sx={{ justifyContent: 'center' }}>
        <SubmitButton sx={{ width: '100%', maxWidth: 360 }} mt={6}>
          Submit
        </SubmitButton>
      </Flex>
    </Box>
  </Formik>
)

export default ShareTheLoveForm
