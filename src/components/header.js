import { Flex, Button, Text, Box, Image, Link, Grid } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { IoIosMenu, IoIosSearch } from 'react-icons/io'
import React, { useState } from 'react'
import logo from '../images/bluboho-logo-vector-white.svg'
import HeaderSearch from './HeaderSearch'
import MegaMenu from './header/MegaMenu'
// import HeaderDropdown from './header/HeaderDropdown'

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false)

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
          <Box
            as={IoIosMenu}
            color="white"
            size={24}
            sx={{ display: ['block', 'block', 'none'] }}
            ml={4}
          />
          <Link as={GatsbyLink} to="/" sx={{ justifySelf: 'center' }} p={4}>
            <Image
              src={logo}
              alt="bluboho"
              title="bluboho"
              sx={{ height: 28, display: 'block' }}
            />
          </Link>
          <Box sx={{ justifySelf: 'end' }} p={4}>
            <Button
              type="button"
              variant="unset"
              onClick={() => setSearchOpen(state => !state)}
            >
              <Text as={IoIosSearch} color="white" size={24} />
            </Button>
          </Box>
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
