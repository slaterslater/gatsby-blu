import { Box, Container, Text, Heading, Link, Button } from 'theme-ui'
import React, { useContext } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { AuthContext } from '../../contexts/AuthContext'

const AccountPage = ({ title, subtitle, links, currentPage, children }) => {
  const { logout } = useContext(AuthContext)

  return (
    <>
      <Container as="main" pb={8}>
        <Breadcrumbs py={0} currentPage={currentPage} links={links}>
          <Button mr={5} variant="inverted" onClick={() => logout()}>
            logout
          </Button>
        </Breadcrumbs>
        <Box pt={7}>
          <Heading>My Account</Heading>
          <Text sx={{ fontSize: 2 }}>{subtitle}</Text>
        </Box>
        {children}
      </Container>
    </>
  )
}

AccountPage.defaultProps = { links: [] }

export default AccountPage
