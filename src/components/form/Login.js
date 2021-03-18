import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { Box, Button, Label, Heading, Input } from 'theme-ui'
import { useMutation } from 'urql'
import * as yup from 'yup'
import { CustomerAccessTokenCreate } from '../../mutations/auth'

const initialValues = { email: '', password: '' }
const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const LoginForm = props => {
  const [{ data, error, fetching }, createAccessToken] = useMutation(
    CustomerAccessTokenCreate
  )

  const { accessToken, expiresAt } = data?.customerAccessTokenCreate
    .customerAccessToken || { accessToken: '', expiresAt: '' }

  console.log(data, error, fetching)

  useEffect(() => {
    if (accessToken && expiresAt) {
      console.log({ accessToken, expiresAt })
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('expiresAt', expiresAt)
    }
  }, [accessToken, expiresAt])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ email, password }, { setSubmitting }) => {
        console.log({ email, password })
        const variables = { input: { email, password } }
        console.log({ variables })
        await createAccessToken({ input: { email, password } })
        // localStorage.setItem('accessToken', accessToken)
        // localStorage.setItem('expiresAt', expiresAt)
        setSubmitting(false)
        console.log('done')
        // await createAccessToken({ input: { email, password } })
        // console.log('done')
      }}
    >
      <Form>
        <Label htmlFor="login_email">Email</Label>
        <Field
          name="email"
          id="login_email"
          as={Input}
          type="email"
          placeholder="enter your email address"
        />
        <Label htmlFor="login_password">Password</Label>
        <Field
          name="password"
          id="login_password"
          as={Input}
          type="password"
          placeholder="enter your password"
        />
        <Button type="submit" disabled={fetching}>
          Submit
        </Button>
      </Form>
    </Formik>
  )
}

export default LoginForm
