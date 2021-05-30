import { navigate, useMatch } from '@reach/router'
import { Form, Formik } from 'formik'
import { Container, Heading } from 'theme-ui'
import React, { useState, useContext } from 'react'
import { useMutation } from 'urql'
import * as yup from 'yup'
import { CustomerActivate, CustomerPasswordReset } from '../../mutations/auth'
import { InputControl } from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'
import { AuthContext } from '../../contexts/AuthContext'

const initialValues = { password: '' }
const validationSchema = yup.object({
  password: yup.string().required(),
})

const ActivateAccountPage = props => {
  const [showError, setShowError] = useState(false)
  const { storeAccessToken } = useContext(AuthContext)

  const { customerId, resetToken } = useMatch(
    '/account/activate/:customerId/:resetToken'
  )

  const id = btoa(`gid://shopify/Customer/${customerId}`)

  const [, resetPassword] = useMutation(CustomerActivate)

  return (
    <Container as="main" sx={{ maxWidth: 480 }}>
      <Heading pb={5}>activate your account</Heading>
      {showError && <p>there was a problem activating your account</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ password }, { setSubmitting }) => {
          setShowError(false)
          const {
            data: {
              customerActivate: { customerAccessToken, customerUserErrors },
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
            label="enter a new password"
            id="reset_password"
          />
          <SubmitButton>Reset Password</SubmitButton>
        </Form>
      </Formik>
    </Container>
  )
}

export default ActivateAccountPage
