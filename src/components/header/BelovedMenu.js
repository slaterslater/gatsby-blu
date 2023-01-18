import React from 'react'
import { Box, Grid } from 'theme-ui'
import { MegaMenuLink } from './MegaMenu/links'

const menus = ['engagement rings', 'wedding bands', 'bridal jewelry']

const BelovedMenu = () => (
  <Box
    sx={{
      display: ['none', 'flex'],
      alignSelf: 'stretch',
    }}
  >
    <Grid
      // pl={6}
      sx={{
        alignSelf: 'stretch',
        gap: 2,
        // width:
        // gridTemplateColumns: 'repeat(auto-fill, 1fr)',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
        gridTemplateColumns: [null, '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr'],
        alignItems: 'stretch',
      }}
      mx="auto"
    >
      {/* {menus.map(menu => (
        <MegaMenuLink key={menu} color="white">
          {menu}
        </MegaMenuLink>
      ))} */}
      <MegaMenuLink color="white" pl={[2, 0]}>
        engagement rings
      </MegaMenuLink>
      <MegaMenuLink color="white" pl={[4, 5, 0]}>
        wedding bands
      </MegaMenuLink>
      <MegaMenuLink
        color="white"
        sx={{ display: ['none', 'none', 'none', 'block'] }}
      >
        bridal jewelry
      </MegaMenuLink>
    </Grid>
  </Box>
)

export default BelovedMenu
