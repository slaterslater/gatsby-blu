import React, { useState } from 'react'
import { Container, Heading } from 'theme-ui'
import RecoverPassword from '../form/RecoverPassword'

const ForgotPasswordPage = props => {
  const [showSuccess, setShowSuccess] = useState(false)

  return (
    <Container as="main" sx={{ maxWidth: 480 }}>
      <Heading pb={5}>forgot your password</Heading>
      {showSuccess && <p>check your email to reset your password</p>}
      {!showSuccess && (
        <RecoverPassword onSuccess={() => setShowSuccess(true)} />
      )}
    </Container>
  )
}

export default ForgotPasswordPage
