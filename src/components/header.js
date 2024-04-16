import { Flex, Box, Grid, IconButton } from 'theme-ui'
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
import { usePageContext } from '../contexts/PageContext'

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const { setOpenDrawer } = useContext(DrawerContext)
  const { isLoggedIn, shouldRenew } = useContext(AuthContext)
  const { isBeloved } = usePageContext()

  const color = isBeloved ? 'cream' : 'black'

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
        sx={{
          bg: isBeloved ? 'navy' : 'white',
          position: 'relative',
          zIndex: 2,
          borderBottom: '1px solid',
          borderColor: isBeloved ? 'black' : 'border',
        }}
      >
        <Grid
          sx={{
            height: [64, 96],
            gridTemplateColumns: '1fr 225px',
            // gridTemplateColumns: '1fr 180px 1fr',
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
            aria-label="Menu"
          >
            <Box as={IoIosMenu} color="black" size={24} />
          </IconButton>
          {/* <GatsbyLink id="bluboho" to="/" title="bluboho homepage">
            <Image
              src="/bluboho-logo-01.svg"
              alt=""
              width={180}
              px={4}
              py={3}
            />
          </GatsbyLink> */}
          <Flex
            sx={{
              alignItems: 'center',
              justifySelf: 'end',
            }}
            p={4}
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
                  color={color}
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
                  color={color}
                  size={24}
                  sx={{ transform: 'translateY(1px)' }}
                />
              </IconButton>
              {!isBeloved && (
                <Box sx={{ position: 'relative' }}>
                  <WishlistBadge />
                  <IconButton
                    onClick={() =>
                      shouldRenew || !isLoggedIn
                        ? navigate('/account/login', {
                            state: { toOrigin: '/account/wishlist' },
                          })
                        : navigate('/account/wishlist')
                    }
                    aria-label="Wishlist"
                  >
                    <Box as={FiHeart} color="black" size={21} />
                  </IconButton>
                </Box>
              )}
            </Box>
            {!isBeloved && <CurrencyPicker />}
            <Box sx={{ position: 'relative' }}>
              <CartBadge />
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenDrawer('cart')}
                aria-label="Cart"
              >
                <Box as={RiShoppingBagLine} color={color} size={24} />
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
