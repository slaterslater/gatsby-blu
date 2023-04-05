import React from 'react'
import { Box, Grid } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { MegaMenuLink } from './MegaMenu/links'

// const menus = ['engagement rings', 'wedding bands', 'bridal jewelry']

const BelovedMenu = () => (
  // <Box
  //   sx={{
  //     display: ['none', 'flex'],
  //     alignSelf: 'stretch',
  //   }}
  //   p={4}
  // >
  <Grid
    sx={{
      display: ['none', 'grid'],
      alignSelf: 'stretch',
      gap: 2,
      gridTemplateColumns: 'repeat(3, max-content)',
      // gridTemplateColumns: '1fr 1fr 1fr',
      // max content ... widest element should set width
      alignItems: 'stretch',
      a: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontSize: 0,
        letterSpacing: 'wider',
        paddingLeft: 6,
      },
    }}
  >
    {/* <MegaMenuLink color="white">engagement rings</MegaMenuLink>
      <MegaMenuLink color="white">wedding bands</MegaMenuLink>
      <MegaMenuLink color="white">bridal jewelry</MegaMenuLink> */}
    <GatsbyLink to="/collections/one-of-a-kind-beloved-engagement-rings/">
      engagement rings
    </GatsbyLink>
    <GatsbyLink to="/collections/wedding-bands/">wedding bands</GatsbyLink>
    <GatsbyLink to="/collections/bridal-jewelry/">bridal jewelry</GatsbyLink>
  </Grid>
  // </Box>
)

export default BelovedMenu
