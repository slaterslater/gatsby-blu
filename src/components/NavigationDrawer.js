import { Divider, Link, Box, Text, IconButton, Flex } from 'theme-ui'
import { IoIosClose, IoIosAdd } from 'react-icons/io'
import { Link as GatsbyLink } from 'gatsby'
import React, { useContext, useState } from 'react'
import { megaMenu } from './header/MegaMenu'
import { AuthContext } from '../contexts/AuthContext'
import ThemeLink from './app/ThemeLink'

const NavGroup = ({ menu, children }) => {
  const [open, set] = useState(false)

  return (
    <Box sx={{ position: 'relative' }}>
      <Box py={4}>
        <Link
          sx={{ display: 'flex', textDecoration: 'none' }}
          onClick={() => set(prev => !prev)}
        >
          <Text sx={{ flex: 1 }} variant="caps">
            {children}
          </Text>
          <Text as={IoIosAdd} />
        </Link>
      </Box>
      <Divider />
      {open && (
        <Box pb={5}>
          {menu.map(item => (
            <Box key={`drawer-box-${item.title}`} pt={4}>
              <Box pb={1}>
                <Text sx={{ fontWeight: 'heading', fontSize: 1 }}>
                  {item.title}
                </Text>
              </Box>
              {item.links.map(link => (
                <Box key={`drawer-${link.path}-${link.text}`} py={1}>
                  <Link
                    as={GatsbyLink}
                    to={link.path}
                    sx={{ textDecoration: 'none', fontSize: 1 }}
                  >
                    {link.text}
                  </Link>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

const NavigationDrawer = ({ onClose }) => {
  const { logout } = useContext(AuthContext)

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <Flex p={4} sx={{ position: 'sticky' }}>
        <IconButton p={0} onClick={onClose}>
          <Text as={IoIosClose} size={36} />
        </IconButton>
      </Flex>
      <Divider mt={0} />
      <Box px={5} py={2} sx={{ flex: 1, overflowY: 'auto' }}>
        <Box py={4}>
          <ThemeLink
            to="/search"
            sx={{ display: 'flex', textDecoration: 'none' }}
          >
            <Text sx={{ flex: 1 }} variant="caps">
              Search
            </Text>
            <Text as={IoIosAdd} />
          </ThemeLink>
        </Box>
        <Divider />
        {Object.keys(megaMenu).map(menu => (
          <NavGroup key={`drawer-title-${menu}`} menu={megaMenu[menu]}>
            {menu}
          </NavGroup>
        ))}
      </Box>
      <Box p={5}>
        <Link
          as={GatsbyLink}
          to="/account"
          sx={{
            letterSpacing: 'caps',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontSize: 1,
          }}
        >
          Account
        </Link>
      </Box>
    </Flex>
  )
}

export default NavigationDrawer
