import React from 'react'
import { Box, Heading } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import CreateAccountForm from '../form/CreateAccount'

const CreateAccountPage = props => (
  <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
    <Heading>Create Account</Heading>
    <CreateAccountForm />
    <Box pt={5}>
      <ThemeLink sx={{ fontSize: 1 }} to="/account/login">
        Already registered? Login
      </ThemeLink>
    </Box>
  </Box>
)

export default CreateAccountPage
