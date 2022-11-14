import { Box, Container, Text, Heading, Link, Grid, Button } from 'theme-ui'
import React, { useContext } from 'react'
import { Breadcrumbs } from '../Breadcrumbs'
import { AuthContext } from '../../contexts/AuthContext'
import ThemeLink from '../app/ThemeLink'

const AccountPage = ({ title, subtitle, links, currentPage, children }) => {
  const { logout } = useContext(AuthContext)

  return (
    <Container as="main" p={0} pb={[0, 8]} px={[0, 6]}>
      {/* <Breadcrumbs py={0} currentPage={currentPage} links={links}>
          <Button mr={5} variant="inverted" onClick={() => logout()}>
            logout
          </Button>
        </Breadcrumbs> */}
      <Box
        pt={[4, 7]}
        sx={{
          display: ['flex', 'grid'],
          flexDirection: 'column-reverse',
          gridTemplateColumns: '180px 1fr',
        }}
      >
        <Box
          as="nav"
          mt={[3, 0]}
          py={[6, 0]}
          sx={{
            width: ['100%', 170],
            backgroundColor: ['bbBackground', 'white'],
          }}
        >
          <Box
            as="ul"
            p={0}
            px={[6, 0]}
            sx={{
              listStyle: 'none',
              columnCount: [2, 1],
            }}
          >
            <Box as="li" mb={2} mx={[5, 0]}>
              <Link as={ThemeLink} variant="caps" to="/account/orders">
                Orders
              </Link>
            </Box>
            <Box as="li" mb={2} mx={[5, 0]}>
              <Link as={ThemeLink} variant="caps" to="/account/wishlist">
                Wishlist
              </Link>
            </Box>
            <Box as="li" mb={2} mx={[5, 0]}>
              <Link
                role="button"
                variant="caps"
                aria-pressed={false}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => logout()}
              >
                logout
              </Link>
            </Box>
          </Box>
        </Box>
        <Box>
          <Heading as="h1" variant="h2" sx={{ textAlign: ['center', 'left'] }}>
            {title}
          </Heading>
          <Text sx={{ fontSize: 2, textAlign: ['center', 'left'] }}>
            {subtitle}
          </Text>
          {children}
        </Box>
      </Box>
    </Container>
  )
}

AccountPage.defaultProps = { links: [] }

export default AccountPage
