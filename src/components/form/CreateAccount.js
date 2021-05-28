import { ErrorMessage, Field, Form, Formik } from 'formik'
import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import { Text, Box, Button, Label, Input } from 'theme-ui'
import { useMutation } from 'urql'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'
import { CustomerCreate } from '../../mutations/user'
import { CheckboxControl, InputControl } from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  acceptsMarketing: false,
}
const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  acceptsMarketing: yup.bool().required(),
})

const CreateAccountForm = props => {
  const [, createCustomer] = useMutation(CustomerCreate)
  const { accessToken, login } = useContext(AuthContext)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({
        email,
        password,
        firstName,
        lastName,
        acceptsMarketing,
      }) => {
        const { data, error } = await createCustomer({
          input: { firstName, lastName, email, password, acceptsMarketing },
        })
        if (!error) {
          await login({ email, password })
          navigate('/account')
        }
      }}
    >
      {({ submitting }) => (
        <Box as={Form} pt={5}>
          <InputControl
            label="first name"
            id="account_first_name"
            name="firstName"
            type="input"
            placeholder="your first name"
          />
          <InputControl
            label="last name"
            id="account_last_name"
            name="lastName"
            type="input"
            placeholder="your last name"
          />
          <InputControl
            label="email"
            id="account_email"
            name="email"
            type="email"
            placeholder="your email"
          />
          <InputControl
            label="password"
            id="account_password"
            name="password"
            type="password"
            placeholder="choose a password"
          />
          <CheckboxControl
            label="Keep me up to date on news and exclusive offers"
            name="acceptsMarketing"
            id="account_marketing"
          />
          <SubmitButton>Create Account</SubmitButton>
        </Box>
      )}
    </Formik>
  )
}

export default CreateAccountForm
