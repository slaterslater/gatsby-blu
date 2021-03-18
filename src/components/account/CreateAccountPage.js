import React from 'react'
import { Box, Heading } from 'theme-ui'
import { Link } from 'gatsby'

const CreateAccountPage = props => (
  <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
    <Heading>Create Account</Heading>
    <Box>
      <Link to="/account/login">Already registered? Login</Link>
    </Box>
  </Box>
)

export default CreateAccountPage
