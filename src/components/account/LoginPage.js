import React from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import LoginForm from '../form/Login'

const LoginPage = props => (
  <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
    <Heading pb={5}>Login</Heading>
    <LoginForm />
    <Flex pt={5}>
      <ThemeLink sx={{ fontSize: 1 }} mr={1} to="/account/create">
        create an account
      </ThemeLink>
      <ThemeLink sx={{ fontSize: 1 }} to="/account/forgot-password">
        forgot your password?
      </ThemeLink>
    </Flex>
  </Box>
)

export default LoginPage
