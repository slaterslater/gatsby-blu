import React from 'react'
import PropTypes from 'prop-types'
import { useField, Field, ErrorMessage } from 'formik'
import {
  Flex,
  Button,
  Box,
  Textarea,
  Label,
  Input,
  Select,
  Text,
  Checkbox,
} from 'theme-ui'

const FormControlWrap = ({ label, id, name, children }) => (
  <Box pb={3}>
    <Label htmlFor={id} pb={2}>
      {label}
    </Label>
    {children}
    {!!name && (
      <ErrorMessage
        component={Text}
        as="p"
        pt={2}
        px={1}
        sx={{ color: 'error', fontSize: 0 }}
        name={name}
      />
    )}
  </Box>
)

export default FormControlWrap

export const CheckboxControl = ({ label, id, name }) => (
  <Box pb={3}>
    <Label sx={{ display: 'flex', alignItems: 'center' }}>
      <Field as={Checkbox} id={id} name={name} />
      <Text>{label}</Text>
    </Label>
    <ErrorMessage
      component={Text}
      pt={3}
      px={1}
      sx={{ color: 'error' }}
      name={name}
    />
  </Box>
)

export const InputControl = ({
  label,
  id,
  name,
  type,
  placeholder,
  variant = 'input',
  ...props
}) => (
  <FormControlWrap label={label} id={id} name={name}>
    <Field
      name={name}
      id={id}
      as={Input}
      type={type}
      placeholder={placeholder}
      variant={variant}
      {...props}
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
        <option value={placeholder} defaultValue>
          {placeholder}
        </option>
      )}
      {children}
    </Field>
  </FormControlWrap>
)

const SegmentedField = ({ label, id, name, options }) => {
  const [field, _, helpers] = useField({ name })

  return (
    <Flex sx={{ gap: 2 }}>
      {options.map(({ value, component }) => (
        <Button
          type="button"
          variant="outline"
          sx={{
            borderColor: value === field.value ? 'black' : 'border',
            display: 'inline-flex',
            alignItems: 'center',
          }}
          onClick={() => {
            helpers.setValue(value)
          }}
        >
          {component || value}
        </Button>
      ))}
    </Flex>
  )
}

export const SegmentedControl = ({ label, id, name, options }) => (
  <FormControlWrap label={label} id={id} name={name}>
    <SegmentedField {...{ label, id, name, options }} />
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
      <Field id={`_${name}`} name={name} />
    </label>
  </Box>
)
HoneypotControl.propTypes = {
  name: PropTypes.string,
}
