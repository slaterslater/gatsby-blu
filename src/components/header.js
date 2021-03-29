import { Flex, Text, Box, Image, Link, Grid, IconButton } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { IoIosMenu, IoIosSearch } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { IoBagSharp } from 'react-icons/io5'
import React, { useContext, useState } from 'react'
import logo from '../images/bluboho-logo-vector-white.svg'
import HeaderSearch from './HeaderSearch'
import MegaMenu from './header/MegaMenu'
import { DrawerContext } from './drawers'
import CartBadge from './cart/CartBadge'
// import HeaderDropdown from './header/HeaderDropdown'

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [, setOpenDrawer] = useContext(DrawerContext)

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 10, boxShadow: 'small' }}>
      <Box
        as="header"
        bg="#14191f"
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Grid
          sx={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: 'center',
            gap: 4,
            position: 'relative',
            zIndex: 3,
          }}
        >
          <MegaMenu />
          <IconButton
            p={0}
            ml={4}
            type="button"
            sx={{ display: ['block', 'block', 'none'] }}
            onClick={() => setOpenDrawer('navigation')}
          >
            <Box as={IoIosMenu} color="white" size={24} />
          </IconButton>
          <Link as={GatsbyLink} to="/" sx={{ justifySelf: 'center' }} p={4}>
            <Image
              src={logo}
              alt="bluboho"
              title="bluboho"
              sx={{ height: 28, display: 'block' }}
            />
          </Link>
          <Flex sx={{ alignItems: 'center', justifySelf: 'end' }} p={4}>
            <GatsbyLink to="/account">
              <Text as={AiOutlineUser} color="white" size={24} />
            </GatsbyLink>
            <IconButton
              sx={{ cursor: 'pointer' }}
              onClick={() => setSearchOpen(state => !state)}
              mr={2}
            >
              <Text
                as={IoIosSearch}
                color="white"
                size={24}
                sx={{ transform: 'translateY(1px)' }}
              />
            </IconButton>
            <Box sx={{ position: 'relative' }}>
              <CartBadge />
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenDrawer('cart')}
              >
                <Text as={IoBagSharp} color="white" size={24} />
              </IconButton>
            </Box>
          </Flex>
        </Grid>
        <HeaderSearch
          isOpen={searchOpen}
          onClose={() => setSearchOpen(state => !state)}
        />
      </Box>
    </Box>
  )
}

export default Header
