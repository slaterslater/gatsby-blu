import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Box, Label, Input } from 'theme-ui'

const FormControlWrap = ({ label, id, name, children }) => (
  <Box pb={3}>
    <Label htmlFor={id} pb={2}>
      {label}
    </Label>
    {children}
    <ErrorMessage component={Text} pt={3} name={name} />
  </Box>
)

export default FormControlWrap

export const InputControl = ({ label, id, name, type, placeholder }) => (
  <FormControlWrap label={label} id={id} name={name}>
    <Field
      name={name}
      id={id}
      as={Input}
      type={type}
      placeholder={placeholder}
    />
  </FormControlWrap>
)
