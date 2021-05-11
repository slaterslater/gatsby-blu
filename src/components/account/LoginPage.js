import React from 'react'
import { Box, Heading } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import LoginForm from '../form/Login'

const LoginPage = props => (
  <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
    <Heading pb={5}>Login</Heading>
    <LoginForm />
    <Box pt={5}>
      <ThemeLink sx={{ fontSize: 1 }} to="/account/create">
        Not registered? Create an account
      </ThemeLink>
    </Box>
  </Box>
)

export default LoginPage
