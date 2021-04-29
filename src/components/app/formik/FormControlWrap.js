import React from 'react'
import PropTypes from 'prop-types'
import { Field, ErrorMessage } from 'formik'
import { Box, Textarea, Label, Input, Select, Text } from 'theme-ui'

const FormControlWrap = ({ label, id, name, children }) => (
  <Box pb={3}>
    <Label htmlFor={id} pb={2}>
      {label}
    </Label>
    {children}
    <ErrorMessage
      component={Text}
      pt={3}
      px={1}
      sx={{ color: 'error' }}
      name={name}
    />
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

export const SelectControl = ({
  label,
  id,
  name,
  type,
  defaultValue,
  children,
  placeholder,
}) => (
  <FormControlWrap label={label} id={id} name={name}>
    <Field name={name} id={id} as={Select} type={type}>
      {placeholder && (
        <option value={placeholder} disabled selected>
          {placeholder}
        </option>
      )}
      {children}
    </Field>
  </FormControlWrap>
)

export const TextareaControl = ({ label, id, name, type, placeholder }) => (
  <FormControlWrap label={label} id={id} name={name}>
    <Field
      name={name}
      id={id}
      as={Textarea}
      type={type}
      placeholder={placeholder}
    />
  </FormControlWrap>
)

export const HoneypotControl = ({ name = 'bot-field' }) => (
  <Box sx={{ display: 'none' }}>
    <label htmlFor={`_${name}`}>
      don't fill this out if you're human
      <Field id={`_${name}`} name="name" />
    </label>
  </Box>
)
HoneypotControl.propTypes = {
  name: PropTypes.string,
}
