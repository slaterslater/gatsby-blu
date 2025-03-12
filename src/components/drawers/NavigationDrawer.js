import { Divider, Link, Box, Text, IconButton, Flex, Input } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { BiSearchAlt2 } from 'react-icons/bi'
import { graphql, Link as GatsbyLink, navigate, useStaticQuery } from 'gatsby'
import React, { useRef, useContext } from 'react'
import { useQuery } from 'urql'
import Accordion from '../Accordion'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'
import BelovedSignupModal from '../header/MegaMenu/BelovedSignupModal'
import { usePageContext } from '../../contexts/PageContext'

const NavGroup = ({ menu, closeDrawer, children }) => (
  <Accordion title={children}>
    {menu.subGroup.map(item => (
      <Box
        key={`drawer-box-${item.title}`}
        sx={{
          a: {
            display: 'block',
            fontSize: 0,
            textDecoration: 'none',
            color: 'inherit',
            letterSpacing: 'wider',
            '&:hover': { textDecoration: 'underline' },
            paddingTop: 2,
            paddingBottom: 2,
          },
        }}
        ml={4}
      >
        <Box mt={1} pt={4} pb={2}>
          <Text sx={{ fontSize: 0, fontWeight: 'heading' }}>{item.title}</Text>
        </Box>
        {item.links.map(link => (
          <Link
            key={`drawer-${link.path}-${link.text}`}
            as={GatsbyLink}
            to={link.path}
            onClick={closeDrawer}
            sx={
              link.isHighlighted
                ? { textTransform: 'uppercase', fontWeight: 'bold' }
                : { textTransform: 'lowercase', fontWeight: 'normal' }
            }
          >
            {link.text}
          </Link>
        ))}
        {item.title.trim() === 'how to buy an engagement ring' && (
          <BelovedSignupModal />
        )}
      </Box>
    ))}
  </Accordion>
)

const NavLink = ({ children, ...props }) => (
  <>
    <Link
      p={4}
      sx={{
        display: 'block',
        letterSpacing: 'caps',
        textTransform: 'uppercase',
        fontWeight: 'heading',
        textDecoration: 'none',
        fontSize: 0,
      }}
      {...props}
    >
      {children}
    </Link>
    <Divider />
  </>
)

const NavigationDrawer = ({ onClose }) => {
  const closeDrawer = () => onClose()
  const searchInput = useRef(null)
  const query = useStaticQuery(graphql`
    {
      allSanityMegaMenu(sort: {_createdAt: ASC}) {
        nodes {
          groups {
            title
            path
            subGroup {
              title
              links {
                text
                path
                isHighlighted
              }
            }
          }
        }
      }
    }
  `)
  const { isBeloved } = usePageContext()
  const menu = isBeloved ? 1 : 0

  const megaMenu = query.allSanityMegaMenu.nodes[menu].groups
  const accountMenu = {
    subGroup: [
      {
        title: '',
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

  const { accessToken, isLoggedIn, shouldRenew, logout } =
    useContext(AuthContext)
  const [{ data }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  })
  const guest = data?.customer?.firstName
  const their = guest ? `${guest}'${!guest.match(/s$/i) ? 's' : ''}` : null

  const toggleSignIn = () => {
    closeDrawer()
    if (shouldRenew || !isLoggedIn) {
      navigate('/account/login')
    } else {
      logout()
    }
  }

  const goToSearchResults = () => {
    onClose()
    const { value } = searchInput.current
    navigate(`/search/?q=${value}`, {
      state: { value },
    })
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
          onKeyPress={e => {
            if (e.code !== 13) return
            goToSearchResults()
          }}
          onBlur={e => {
            const { value } = e.target
            if (!value.trim()) return
            goToSearchResults()
          }}
          onSubmit={e => {
            e.preventDefault()
            goToSearchResults()
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
        {megaMenu.map(menu =>
          menu.path ? (
            <NavLink as={GatsbyLink} to={menu.path}>
              {menu.title}
            </NavLink>
          ) : (
            <NavGroup
              key={`drawer-title-${menu.title}`}
              menu={menu}
              closeDrawer={closeDrawer}
            >
              {menu.title}
            </NavGroup>
          )
        )}
        {!shouldRenew && isLoggedIn && (
          <NavGroup
            key="drawer-account"
            menu={accountMenu}
            closeDrawer={closeDrawer}
          >
            {`${their} Account`}
          </NavGroup>
        )}
        <NavLink onClick={toggleSignIn}>
          {shouldRenew || !isLoggedIn ? 'Sign in' : 'Logout'}
        </NavLink>
      </Box>
    </Flex>
  )
}

export default NavigationDrawer
