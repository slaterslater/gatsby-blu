import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Box, Flex, Grid, Image } from 'theme-ui'
import Announcements from './Announcements'

const SiteNav = () => (
  <>
    <Box sx={{ display: ['block', 'block', 'none'] }}>
      <Announcements />
    </Box>
    <Grid
      sx={{
        margin: '-1px',
        gap: 0,
        gridTemplateColumns: ['1fr 1fr', '210px 210px 1fr'],
        gridTemplateRows: 55,
        a: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '#bluboho': { bg: 'white' },
        '#beloved': { bg: 'navy' },
        '#desktop-announcements': {
          display: ['none', 'none', 'flex'],
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}
    >
      <GatsbyLink id="bluboho" to="/" title="bluboho homepage">
        <Image src="/bluboho-logo-01.svg" alt="" width={150} px={4} py={3} />
      </GatsbyLink>
      <GatsbyLink id="beloved" to="/beloved" title="beloved by bluboho">
        <Image src="/beloved-logo.webp" alt="" width={180} height={50} />
      </GatsbyLink>
      <Flex id="desktop-announcements">
        <Announcements />
      </Flex>
    </Grid>
  </>
)

export default SiteNav
