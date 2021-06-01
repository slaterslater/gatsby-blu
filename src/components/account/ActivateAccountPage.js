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

  const { customerId, activationToken } = useMatch(
    '/account/activate/:customerId/:activationToken'
  )

  const id = btoa(`gid://shopify/Customer/${customerId}`)

  const [, activateCustomer] = useMutation(CustomerActivate)

  // console.log(customerId, id)

  return (
    <Container as="main" sx={{ maxWidth: 480 }}>
      <Heading pb={5}>activate your account</Heading>
      {showError && <p>there was a problem activating your account</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ password }, { setSubmitting }) => {
          setShowError(false)
          const res = await activateCustomer({
            id,
            input: { activationToken, password },
          })
          const { customerAccessToken, customerUserErrors } =
            res.data.customerActivate || {}
          if (customerAccessToken) {
            storeAccessToken(customerAccessToken)
            navigate('/account')
          } else if (customerUserErrors?.length) {
            setShowError(true)
          } else {
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
          <SubmitButton>Save Password</SubmitButton>
        </Form>
      </Formik>
    </Container>
  )
}

export default ActivateAccountPage
