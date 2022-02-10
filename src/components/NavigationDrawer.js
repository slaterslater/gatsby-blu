import { Divider, Link, Box, Text, IconButton, Flex, Input } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { BiSearchAlt2 } from 'react-icons/bi'
import { graphql, Link as GatsbyLink, navigate, useStaticQuery } from 'gatsby'
import React, { useRef, useContext } from 'react'
import { useQuery } from 'urql'
import Accordion from './Accordion'
import { AuthContext } from '../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../queries/customer'

const NavGroup = ({ menu, closeDrawer, children }) => (
  <Accordion title={children}>
    {menu.subGroup.map(item => (
      <Box key={`drawer-box-${item.title}`} ml={4}>
        <Box mt={1} py={4}>
          <Text sx={{ fontSize: 0, fontWeight: 'heading' }}>{item.title}</Text>
        </Box>
        {item.links.map(link => (
          <Box key={`drawer-${link.path}-${link.text}`} pb={2}>
            <Link
              variant="small"
              as={GatsbyLink}
              to={link.path}
              onClick={closeDrawer}
              sx={{ textDecoration: 'none', fontSize: 0 }}
            >
              {link.text}
            </Link>
          </Box>
        ))}
      </Box>
    ))}
  </Accordion>
)

const NavigationDrawer = ({ onClose }) => {
  const closeDrawer = () => onClose()
  const searchInput = useRef(null)
  const query = useStaticQuery(graphql`
    {
      allSanityMegaMenu {
        nodes {
          groups {
            title
            subGroup {
              title
              links {
                text
                path
              }
            }
          }
        }
      }
    }
  `)
  const megaMenu = query.allSanityMegaMenu.nodes[0].groups
  const accountMenu = {
    subGroup: [
      {
        title: null,
        links: [
          {
            text: 'orders',
            path: '/account/orders',
          },
          {
            text: 'wishlist',
            path: '/account/wishlist',
          },
        ],
      },
    ],
  }

  const { accessToken, isLoggedIn, shouldRenew, login, logout } =
    useContext(AuthContext)
  const [{ data }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  })

  const guest = data?.customer.firstName
  const their = guest ? `${guest}'${!guest.match(/s$/i) ? 's' : ''}` : null
  // const miniMenu = [
  //   {
  //     title: 'Account',
  //     path: '/account',
  //   },
  //   {
  //     title: 'Wishlist',
  //     path: '/account/wishlist',
  //   },
  // ]

  const toggleSignIn = () => {
    closeDrawer()
    if (shouldRenew || !isLoggedIn) {
      navigate('/account/login')
    } else {
      logout()
    }
  }

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <Flex p={4} sx={{ position: 'sticky', justifyContent: 'flex-end' }}>
        <IconButton p={0} onClick={onClose}>
          <Text as={IoIosClose} size={36} />
        </IconButton>
      </Flex>
      <Divider mt={0} />
      <Box px={5} sx={{ overflowY: 'auto' }}>
        <Flex
          as="form"
          py={4}
          onSubmit={e => {
            e.preventDefault()
            onClose()
            navigate(`/search/?q=${searchInput.current.value}`)
          }}
        >
          <Text as={BiSearchAlt2} size={18} ml={4} />
          <Input
            ref={searchInput}
            variant="bigSearch"
            type="text"
            placeholder="search bluboho"
            py={0}
            sx={{
              fontWeight: 'heading',
              fontSize: 0,
              '&:focus': {
                outline: 'none',
              },
            }}
          />
        </Flex>
        <Divider />
        {megaMenu.map(menu => (
          <NavGroup
            key={`drawer-title-${menu.title}`}
            menu={menu}
            closeDrawer={closeDrawer}
          >
            {menu.title}
          </NavGroup>
        ))}
        {!shouldRenew && isLoggedIn && (
          <NavGroup
            key="drawer-account"
            menu={accountMenu}
            closeDrawer={closeDrawer}
          >
            {`${their} Account`}
          </NavGroup>
        )}
        {/* {miniMenu.map(menu => (
          <Box key={`drawer-title-${menu.title}`}>
            <Link
              as={GatsbyLink}
              to={menu.path}
              onClick={closeDrawer}
              p={4}
              sx={{
                display: 'block',
                letterSpacing: 'caps',
                textTransform: 'uppercase',
                fontWeight: 'heading',
                textDecoration: 'none',
                fontSize: 0,
              }}
            >
              {menu.title}
            </Link>
            <Divider />
          </Box>
        ))} */}
        <Link
          onClick={toggleSignIn}
          p={4}
          sx={{
            display: 'block',
            letterSpacing: 'caps',
            textTransform: 'uppercase',
            fontWeight: 'heading',
            textDecoration: 'none',
            fontSize: 0,
          }}
        >
          {shouldRenew || !isLoggedIn ? 'Sign in' : 'Logout'}
        </Link>
        <Divider />
      </Box>
    </Flex>
  )
}

export default NavigationDrawer
