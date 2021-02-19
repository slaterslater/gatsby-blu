import { Box, Image, Link, Grid } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { IoIosMenu, IoIosSearch } from 'react-icons/io'
import PropTypes from 'prop-types'
import React from 'react'
import logo from '../images/bluboho-logo-vector-white.svg'

const Header = ({ siteTitle }) => (
  <Box
    as="header"
    bg="#14191f"
    p={3}
    sx={{ position: 'sticky', top: 0, zIndex: 1 }}
  >
    <Grid sx={{ gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'center' }}>
      <Box>
        <Box as={IoIosMenu} color="white" size={24} />
      </Box>
      <Link as={GatsbyLink} to="/" sx={{ justifySelf: 'center' }}>
        <Image
          src={logo}
          alt="bluboho"
          title="bluboho"
          sx={{ height: 28, display: 'block' }}
        />
      </Link>
      <Box sx={{ justifySelf: 'end' }}>
        <Box as={IoIosSearch} color="white" size={24} />
      </Box>
    </Grid>
  </Box>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
