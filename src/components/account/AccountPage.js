import { Box, Container, Text, Heading } from 'theme-ui'
import React from 'react'
import Breadcrumbs from '../Breadcrumbs'

const AccountPage = ({ title, subtitle, links, currentPage, children }) => (
  <>
    <Breadcrumbs currentPage={currentPage} links={links} />
    <Container as="main" pb={8}>
      <Box pt={7}>
        <Heading>My Account</Heading>
        <Text sx={{ fontSize: 2 }}>{subtitle}</Text>
      </Box>
      {children}
    </Container>
  </>
)

AccountPage.defaultProps = { links: [] }

export default AccountPage
