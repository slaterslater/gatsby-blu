import React from 'react'
import { Flex, Box, Heading } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import CreateAccountForm from '../form/CreateAccount'

const CreateAccountPage = props => (
  <Box
    as="main"
    sx={{ maxWidth: 600, h1: { fontSize: 5 } }}
    variant="sectionWrap"
    mx="auto"
  >
    <Heading as="h1">Create Account</Heading>
    <CreateAccountForm />
    <Flex
      sx={{ gap: 3, alignItems: 'baseline', justifyContent: 'right' }}
      py={5}
    >
      <Heading as="div" variant="caps" sx={{ fontSize: 9 }}>
        Already registered?
      </Heading>
      <ThemeLink sx={{ fontSize: 1 }} to="/account/login">
        Login
      </ThemeLink>
    </Flex>
  </Box>
)

export default CreateAccountPage
