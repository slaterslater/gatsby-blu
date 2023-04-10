import { Flex, Box, Image, Link, Grid, IconButton, Heading } from 'theme-ui'
import { Link as GatsbyLink, navigate } from 'gatsby'
import { IoIosMenu } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { RiShoppingBagLine } from 'react-icons/ri'
import { BiSearchAlt2 } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import React, { useContext, useState } from 'react'
import HeaderSearch from './HeaderSearch'
import MegaMenu from './header/MegaMenu'
import { DrawerContext } from './drawers'
import CartBadge from './cart/CartBadge'
import { AuthContext } from '../contexts/AuthContext'
import WishlistBadge from './header/WishlistBadge'
import CurrencyPicker from './CurrencyPicker'
import BelovedMenu from './header/BelovedMenu'
import { MegaMenuLink } from './header/MegaMenu/links'

const BelovedHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const { setOpenDrawer } = useContext(DrawerContext)
  const { isLoggedIn, shouldRenew } = useContext(AuthContext)

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: 'small',
      }}
    >
      <Box
        as="header"
        bg="navy"
        sx={{
          position: 'relative',
          zIndex: 2,
          borderBottom: '1px solid',
          borderColor: 'black',
        }}
      >
        <Grid
          sx={{
            gap: 0,
            height: [64, 96],
            gridTemplateColumns: '1fr 150px',
            // position: 'relative',
            // gridTemplateColumns: 'repeat(2, 1fr)',
            alignItems: 'center',
            zIndex: 3,
          }}
        >
          {/* <BelovedMenu /> */}
          <MegaMenu isBeloved />
          <IconButton
            p={0}
            ml={4}
            type="button"
            sx={{ display: ['block', 'block', 'none'] }}
            onClick={() => setOpenDrawer('navigation')}
            aria-label="Menu"
          >
            <Box as={IoIosMenu} color="cream" size={24} />
          </IconButton>
          <Flex
            sx={{
              width: '100%',
              alignItems: 'center',
              justifySelf: 'end',
              justifyContent: 'flex-end',
            }}
            p={4}
            mr={[0, 0, 5]}
          >
            <Box
              sx={{
                display: ['none', 'flex'],
                'a, button': { cursor: 'pointer' },
              }}
            >
              <IconButton
                as={GatsbyLink}
                to="/account"
                mr={2}
                aria-label="Account"
              >
                <Box
                  as={AiOutlineUser}
                  color="cream"
                  size={24}
                  sx={{ transform: 'translateY(1px)' }}
                />
              </IconButton>
              <IconButton
                onClick={() => setSearchOpen(state => !state)}
                mr={2}
                aria-label="Search"
              >
                <Box
                  as={BiSearchAlt2}
                  color="cream"
                  size={24}
                  sx={{ transform: 'translateY(1px)' }}
                />
              </IconButton>
            </Box>
            {/* <CurrencyPicker /> */}
            <Box sx={{ position: 'relative' }}>
              <CartBadge />
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenDrawer('cart')}
                aria-label="Cart"
              >
                <Box as={RiShoppingBagLine} color="cream" size={24} />
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

export default BelovedHeader
