import { Box, Container, Text, Heading, Link, Grid, Button } from 'theme-ui'
import React, { useContext } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { AuthContext } from '../../contexts/AuthContext'
import ThemeLink from '../app/ThemeLink'

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
        <Grid pt={7} sx={{ gridTemplateColumns: '180px 1fr' }}>
          <Box>
            <Box>
              <ThemeLink to="/account/orders">Orders</ThemeLink>
            </Box>
            <Box>
              <ThemeLink to="/account/wishlist">Wishlist</ThemeLink>
            </Box>
          </Box>
          <Box>
            <Heading>{title}</Heading>
            <Text sx={{ fontSize: 2 }}>{subtitle}</Text>
            {children}
          </Box>
        </Grid>
      </Container>
    </>
  )
}

AccountPage.defaultProps = { links: [] }

export default AccountPage
