import axios from 'axios'
import { useField, ErrorMessage, Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { Input, IconButton, Box, Flex, Text } from 'theme-ui'
import * as yup from 'yup'
import { FiClock } from 'react-icons/fi'
import { CgArrowLongRight } from 'react-icons/cg'
import CallingCodePicker from './CallingCodePicker'

export const SmsForm = ({ setWorking, onSuccess, onError, children }) => (
  <Formik
    initialValues={{ callingCode: '', phoneNumber: '' }}
    validationSchema={yup.object({
      callingCode: yup.string().max(2),
      phoneNumber: yup.string().min(10),
    })}
    onSubmit={async (values, { setSubmitting, reset }) => {
      try {
        setWorking(true)
        const res = await axios.post(`/api/sms`, values, {
          headers: { 'Content-Type': 'application/json' },
        })
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

const PhoneNumberField = ({ color, disabled }) => {
  const [field, meta, helpers] = useField({ name: 'phoneNumber' })
  const { value } = meta
  const { setValue } = helpers

  // useEffect(() => {
  //   if (!value) return
  //   const digits = value.replace(/[^0-9]/g, '')
  //   const len = digits.length
  //   console.log(digits)
  //   let phone = ''
  //   if (len > 0) {
  //     phone += `(${digits.slice(0, 2)}`
  //   }
  //   if (len > 2) {
  //     phone += `${digits.slice(2, 3)}) `
  //   }
  //   if (len > 3) {
  //     phone += digits.slice(3, 6)
  //   }
  //   // if (digits.length > 4) {
  //   //   phone += ` ${digits.slice(2, 7)}`
  //   // }
  //   setValue(phone)
  // }, [value])

  useEffect(() => {
    if (!value) return
    const phoneNumber = value.replace(/[^0-9]/g, '')
    if (value !== phoneNumber) setValue(phoneNumber)
  }, [value])

  return (
    <Input
      placeholder="enter your phone number"
      disabled={disabled}
      maxLength={10}
      px={2}
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

const CallingCodeField = ({ callingCode = 1 }) => {
  const [field, meta, helpers] = useField({ name: 'callingCode' })
  const { value } = meta
  const { setValue } = helpers

  useEffect(() => {
    if (value !== callingCode) setValue(String(callingCode))
  }, [callingCode])

  return <Input type="hidden" {...field} />
}

export const SmsSignUp = ({ color = 'gray', onSubscribed = () => {} }) => {
  const [working, setWorking] = useState(false)
  const countries = [
    { abbr: 'CA', callingCode: 1 },
    { abbr: 'UK', callingCode: 44 },
    { abbr: 'US', callingCode: 1 },
  ]
  const [currentCountry, setCurrentCountry] = useState(countries[0])

  return (
    <SmsForm
      onSuccess={() => {
        onSubscribed()
      }}
      onError={() => {
        console.log('error')
      }}
      setWorking={setWorking}
    >
      <Box as={Form} mt={3} mb={5}>
        <Flex
          sx={{
            flex: '1 0 max-content',
            borderBottom: '1px solid',
            alignItems: 'center',
            borderColor: color,
          }}
        >
          <CallingCodePicker
            color={color}
            countries={countries}
            currentCountry={currentCountry}
            setCurrentCountry={setCurrentCountry}
          />
          <CallingCodeField callingCode={currentCountry.callingCode} />
          <PhoneNumberField color={color} disabled={working} />
          <IconButton
            type="submit"
            ml="auto"
            sx={{
              cursor: 'pointer',
              flex: '0 1 max-content',
            }}
            p={4}
          >
            <Text
              as={working ? FiClock : CgArrowLongRight}
              size={24}
              sx={{ color, minWidth: 25 }}
            />
          </IconButton>
        </Flex>
        <ErrorMessage
          component={Text}
          pt={3}
          px={1}
          sx={{ color: 'error' }}
          name="email"
        />
        <ErrorMessage
          component={Text}
          pt={3}
          px={1}
          sx={{ color: 'error' }}
          name="phone"
        />
      </Box>
    </SmsForm>
  )
}

export default SmsSignUp
