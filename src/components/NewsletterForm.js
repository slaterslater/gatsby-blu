import axios from 'axios'
import { useField, ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState, useContext } from 'react'
import { Input, IconButton, Box, Flex, Text } from 'theme-ui'
import * as yup from 'yup'
import { FiCheckSquare, FiAlertCircle, FiClock } from 'react-icons/fi'
import { CgArrowLongRight } from 'react-icons/cg'

import { InputControl } from './app/formik/FormControlWrap'
import SubmitButton from './app/formik/SubmitButton'
import { CalloutBox } from './product/ProductCTACallout'
import { NewsletterContext } from '../contexts/NewsletterContext'

export const NewsletterForm = ({
  setWorking,
  onSuccess,
  onError,
  children,
}) => (
  <Formik
    initialValues={{ email: '' }}
    validationSchema={yup.object({
      email: yup.string().email().required(),
    })}
    onSubmit={async (values, { setSubmitting, reset }) => {
      try {
        setWorking(true)
        const res = await axios.post(
          `${process.env.GATSBY_SERVERLESS_BASE}/newsletter`,
          values,
          { headers: { 'Content-Type': 'application/json' } }
        )
        setWorking(false)
        if (res.status >= 400 && res.status < 600) {
          onError(res, values)
        } else {
          onSuccess(res, values)
        }

        setSubmitting(false)
      } catch (e) {
        onError(e)
        setWorking(false)
      }
    }}
  >
    {children}
  </Formik>
)

const EmailField = ({ color, disabled }) => {
  const [field, meta, helpers] = useField({ name: 'email' })
  return (
    <Input
      placeholder="enter your email address"
      disabled={disabled}
      px={1}
      sx={{
        width: '100%',
        minWidth: 220,
        maxWidth: 360,
        color,
        border: 'none',
        outline: 'none',
        fontFamily: 'body',
        letterSpacing: '.1em',
        '&::placeholder': { color },
        // tries to prevent autofill from changing the input's style
        '&:-webkit-autofill, &:-webkit-autofill:focus': {
          transition:
            'background-color 600000s 0s, color 600000s 0s, font-family 600000s 0s, font-weight 600000s 0s, letter-spacing 600000s 0s',
        },
      }}
      {...field}
    />
  )
}

export const NewsletterSignUp = ({
  color = 'gray',
  onSubscribed = () => {},
}) => {
  const [error, setError] = useState(null)
  const [working, setWorking] = useState(false)
  return (
    <NewsletterForm
      onSuccess={() => {
        onSubscribed()
      }}
      onError={() => {
        console.log('error')
      }}
      setWorking={setWorking}
    >
      <Form>
        <Flex
          sx={{
            flex: '1 0 max-content',
            borderBottom: '1px solid',
            alignItems: 'center',
            borderColor: color,
          }}
        >
          <EmailField color={color} disabled={working} />
          <IconButton
            type="submit"
            ml="auto"
            sx={{
              cursor: 'pointer',
              flex: '0 1 max-content',
            }}
          >
            <Text
              as={working ? FiClock : CgArrowLongRight}
              size={24}
              sx={{ color }}
            />
            {/* {working ? (
              <Text as={FiClock} size={24} sx={{ color }} />
            ) : (
              <Text as={CgArrowLongRight} size={24} sx={{ color }} />
            )} */}
          </IconButton>
        </Flex>
        <ErrorMessage
          component={Text}
          pt={3}
          px={1}
          sx={{ color: 'error' }}
          name="email"
        />
      </Form>
    </NewsletterForm>
  )
}

export default NewsletterSignUp
