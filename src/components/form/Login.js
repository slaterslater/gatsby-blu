import { ErrorMessage, Field, Form, Formik } from 'formik'
import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import { Text, Box, Button, Label, Input } from 'theme-ui'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'

const initialValues = { email: '', password: '' }
const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const LoginForm = props => {
  const { accessToken, login } = useContext(AuthContext)
  console.info(accessToken)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ email, password }) => {
        await login({ email, password })
        navigate('/account/orders')
      }}
    >
      {({ submitting }) => (
        <Form>
          <Box pb={3}>
            <Label htmlFor="login_email" pb={2}>
              Email
            </Label>
            <Field
              name="email"
              id="login_email"
              as={Input}
              type="email"
              placeholder="enter your email address"
            />
            <ErrorMessage component={Text} pt={3} name="email" />
          </Box>
          <Box pb={3}>
            <Label htmlFor="login_password">Password</Label>
            <Field
              name="password"
              id="login_password"
              as={Input}
              type="password"
              placeholder="enter your password"
            />
            <ErrorMessage component={Text} name="password" />
          </Box>
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
