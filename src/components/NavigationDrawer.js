import { Divider, Link, Box, Text, IconButton, Flex } from 'theme-ui'
import { IoIosClose, IoIosAdd } from 'react-icons/io'
import { Link as GatsbyLink } from 'gatsby'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { menus } from './header/MegaMenu'

const NavGroup = ({ menu, children }) => {
  const [open, set] = useState(false)

  return (
    <Box sx={{ position: 'relative' }}>
      <Box py={4}>
        <Link sx={{ display: 'flex' }} onClick={() => set(prev => !prev)}>
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

const NavigationDrawer = ({ onClose }) => (
  <Box sx={{ position: 'relative' }}>
    <Flex p={4} sx={{ position: 'sticky' }}>
      <IconButton p={0} onClick={onClose}>
        <Text as={IoIosClose} size={36} />
      </IconButton>
    </Flex>
    <Divider mt={0} />
    <Box px={5} py={2}>
      <NavGroup menu={menus.shop}>Shop</NavGroup>
      <NavGroup menu={menus['gift-guides']}>Gifts</NavGroup>
      <NavGroup menu={menus['stories-menu']}>Stories</NavGroup>
      <NavGroup menu={menus['everything-blu-menu']}>Everything Blu</NavGroup>
    </Box>
    <Box>
      <GatsbyLink to="/account/login">Login</GatsbyLink>
    </Box>
  </Box>
)

export default NavigationDrawer
