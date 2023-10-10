import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useMutation } from 'urql'
import { navigate } from 'gatsby'
import React, { useContext, useState } from 'react'
import { Text, Box, Button, Label, Input } from 'theme-ui'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'
import { CustomerAccessTokenCreate } from '../../mutations/auth'

const initialValues = { email: '', password: '' }
const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(80).required(),
})

const LoginForm = ({ toOrigin }) => {
  const [showError, setShowError] = useState(false)
  const { login } = useContext(AuthContext)
  return (
    <>
      {showError && <p>there was a problem loggin in :(</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ email, password }, { setSubmitting }) => {
          setShowError(false)
          try {
            await login({ email, password })
            return navigate(toOrigin || '/account')
          } catch (e) {
            console.log(e)
            setShowError(true)
            setSubmitting(false)
          }
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
              <Label htmlFor="login_password" pb={2}>
                Password
              </Label>
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
    </>
  )
}

export default LoginForm
