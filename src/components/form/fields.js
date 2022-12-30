import { ErrorMessage, useField } from 'formik'
import React, { useEffect, useState } from 'react'
import { Flex, Input, Text, Label, Box } from 'theme-ui'
import { InputControl, TextareaControl } from '../app/formik/FormControlWrap'
import CallingCodePicker from '../CallingCodePicker'

export const InputField = ({ name, label, placeholder = '', ...props }) => (
  <InputControl
    name={name}
    id={name}
    label={label}
    placeholder={placeholder}
    sx={{ borderRadius: 2 }}
    mb={2}
    {...props}
  />
)

export const TextField = ({
  name,
  label,
  placeholder = null,
  maxLength = 300,
}) => {
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

const PhoneNumberField = ({ color, disabled }) => {
  const [field, meta, helpers] = useField({ name: 'phoneNumber' })
  const { value } = meta
  const { setValue } = helpers

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

export const PhoneNumberInput = ({ color = 'gray', ...props }) => {
  const countries = [
    { abbr: 'CA', callingCode: 1 },
    { abbr: 'UK', callingCode: 44 },
    { abbr: 'US', callingCode: 1 },
  ]
  const [currentCountry, setCurrentCountry] = useState(countries[0])
  return (
    <Box pb={3}>
      <Label htmlFor="phoneNumber" pb={2}>
        phone
      </Label>
      <Flex
        sx={{
          border: '1px solid',
          borderColor: 'border',
          borderRadius: 2,
          paddingLeft: 2,
        }}
        mb={2}
        {...props}
      >
        <CallingCodePicker
          color={color}
          countries={countries}
          currentCountry={currentCountry}
          setCurrentCountry={setCurrentCountry}
        />
        <CallingCodeField callingCode={currentCountry.callingCode} />
        {/* <PhoneNumberField color={color} disabled={working} /> */}
        <PhoneNumberField color={color} />
      </Flex>
      <ErrorMessage
        component={Text}
        as="p"
        mt={3}
        px={1}
        sx={{ color: 'error', fontSize: 0 }}
        name="phoneNumber"
      />
    </Box>
  )
}
