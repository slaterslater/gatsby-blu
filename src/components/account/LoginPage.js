import React from 'react'
import { Box, Heading } from 'theme-ui'
import { Link } from 'gatsby'
import LoginForm from '../form/Login'

const LoginPage = props => (
  <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
    <Heading>Login</Heading>
    <LoginForm />
    <Box>
      <Link to="/account/create">Not registered? Create an account</Link>
    </Box>
  </Box>
)

export default LoginPage
