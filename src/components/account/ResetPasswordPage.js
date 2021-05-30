import { navigate, useMatch } from '@reach/router'
import { Form, Formik } from 'formik'
import { Container, Heading } from 'theme-ui'
import React, { useState, useContext } from 'react'
import { useMutation } from 'urql'
import * as yup from 'yup'
import { CustomerPasswordReset } from '../../mutations/auth'
import { InputControl } from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'
import { AuthContext } from '../../contexts/AuthContext'

const initialValues = { password: '' }
const validationSchema = yup.object({
  password: yup.string().required(),
})

const ResetPasswordPage = props => {
  const [showError, setShowError] = useState(false)
  const { storeAccessToken } = useContext(AuthContext)
  const { customerId, resetToken } = useMatch(
    '/account/reset/:customerId/:resetToken'
  )

  const id = btoa(`gid://shopify/Customer/${customerId}`)

  const [, resetPassword] = useMutation(CustomerPasswordReset)

  return (
    <Container as="main" sx={{ maxWidth: 480 }}>
      <Heading pb={5}>reset your password</Heading>
      {showError && <p>there was a problem resetting your password</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ password }, { setSubmitting }) => {
          setShowError(false)
          const {
            data: {
              customerReset: { customerAccessToken, customerUserErrors },
            },
          } = await resetPassword({ id, input: { resetToken, password } })
          if (customerAccessToken) {
            storeAccessToken(customerAccessToken)
            navigate('/account')
          } else if (customerUserErrors) {
            setShowError(true)
          }
          setSubmitting(false)
        }}
      >
        <Form>
          <InputControl
            type="password"
            name="password"
            label="enter your new password"
            id="reset_password"
          />
          <SubmitButton>Reset Password</SubmitButton>
        </Form>
      </Formik>
    </Container>
  )
}

export default ResetPasswordPage
