import { Flex, Text, Box, Image, Link, Grid, IconButton } from 'theme-ui'
import { Link as GatsbyLink, navigate } from 'gatsby'
import { IoIosMenu } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { RiShoppingBagLine } from 'react-icons/ri'
import { BiSearchAlt2 } from 'react-icons/bi'
import { FiHeart } from 'react-icons/fi'
import React, { useContext, useState } from 'react'
import logo from '../images/bluboho-logo-vector-black.svg'
import HeaderSearch from './HeaderSearch'
import MegaMenu from './header/MegaMenu'
import { DrawerContext } from './drawers'
import CartBadge from './cart/CartBadge'
import { AuthContext } from '../contexts/AuthContext'
import WishlistBadge from './header/WishlistBadge'

const Header = () => {
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
        bg="white"
        sx={{
          position: 'relative',
          zIndex: 2,
          borderBottom: '1px solid',
          borderColor: 'border',
        }}
      >
        <Grid
          sx={{
            height: [64, 96],
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
            aria-label="Menu"
          >
            <Box as={IoIosMenu} color="black" size={24} />
          </IconButton>
          <Link as={GatsbyLink} to="/" sx={{ justifySelf: 'center' }}>
            <Image
              src={logo}
              alt="bluboho"
              title="bluboho"
              sx={{ height: 26, display: 'block' }}
            />
          </Link>
          <Flex
            sx={{
              alignItems: 'center',
              justifySelf: 'end',
            }}
            p={4}
          >
            <Flex>
              <IconButton
                sx={{ cursor: 'pointer', display: ['none', 'flex'] }}
                as={GatsbyLink}
                to="/account"
                mr={2}
                aria-label="Account"
              >
                <Text
                  as={AiOutlineUser}
                  color="black"
                  size={24}
                  sx={{ transform: 'translateY(1px)' }}
                />
              </IconButton>
              <IconButton
                sx={{ cursor: 'pointer', display: ['none', 'flex'] }}
                onClick={() => setSearchOpen(state => !state)}
                mr={2}
                aria-label="Search"
              >
                <Text
                  as={BiSearchAlt2}
                  color="black"
                  size={24}
                  sx={{ transform: 'translateY(1px)' }}
                />
              </IconButton>
              {/* <IconButton
                as={GatsbyLink}
                sx={{ cursor: 'pointer', display: ['flex', 'none'] }}
                to="/search"
                mr={2}
                aria-label="Search"
              >
                <Text
                  as={BiSearchAlt2}
                  color="black"
                  size={24}
                  sx={{ transform: 'translateY(1px)' }}
                />
              </IconButton> */}
            </Flex>
            <Box sx={{ position: 'relative' }}>
              <WishlistBadge />
              <IconButton
                sx={{ cursor: 'pointer' }}
                mr={2}
                onClick={() =>
                  shouldRenew || !isLoggedIn
                    ? navigate('/account/login', {
                        state: { toOrigin: '/account/wishlist' },
                      })
                    : navigate('/account/wishlist')
                }
                aria-label="Wishlist"
              >
                <Text as={FiHeart} color="black" size={21} />
              </IconButton>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <CartBadge />
              <IconButton
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenDrawer('cart')}
                aria-label="Cart"
              >
                <Text as={RiShoppingBagLine} color="black" size={24} />
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
