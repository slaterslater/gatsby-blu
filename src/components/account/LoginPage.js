import React from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import LoginForm from '../form/Login'

const LoginPage = ({ location }) => (
  <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
    <Heading pb={5}>Login</Heading>
    <LoginForm toOrigin={location.state?.toOrigin} />
    <Flex pt={5} sx={{ justifyContent: 'space-between' }}>
      <ThemeLink sx={{ fontSize: 1 }} mr={1} to="/account/create">
        create an account
      </ThemeLink>
      <ThemeLink sx={{ fontSize: 1 }} to="/account/forgot-password">
        forgot your password
      </ThemeLink>
    </Flex>
  </Box>
)

export default LoginPage
