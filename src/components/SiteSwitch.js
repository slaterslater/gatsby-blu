import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Box, Grid, Image } from 'theme-ui'

const SiteSwitch = ({ isBeloved = false }) => (
  <Box bg="cream">
    {/* <Box sx={{ bg: isBeloved ? 'cream' : 'black' }}> */}
    <Grid
      sx={{
        // position: ['relative', 'relative', 'absolute'],
        // transform: 'translateY(-35px)',
        margin: '-1px',
        gap: 0,
        gridTemplateColumns: ['1fr 1fr', '210px 210px'],
        gridTemplateRows: 55,
        a: {
          display: 'flex',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '#bluboho': { bg: isBeloved ? 'bbBackground' : 'white' },
        '#beloved': { bg: 'navy' },
      }}
    >
      <GatsbyLink id="bluboho" to="/" title="bluboho homepage">
        <Image
          src="/bluboho-logo-01.svg"
          alt=""
          width={150}
          // height={50}
          px={4}
          py={3}
        />
      </GatsbyLink>
      <GatsbyLink id="beloved" to="/beloved" title="beloved by bluboho">
        <Image
          src="/beloved-logo.webp"
          alt=""
          width={180}
          height={50}
          // px={3}
          // py={2}
        />
      </GatsbyLink>
    </Grid>
  </Box>
)

export default SiteSwitch
