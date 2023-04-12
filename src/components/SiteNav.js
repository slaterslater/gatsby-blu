import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Flex, Grid, Image } from 'theme-ui'
import Announcements from './Announcements'
import { usePageContext } from '../contexts/PageContext'

const SiteNav = () => {
  const { isBeloved } = usePageContext()
  return (
    <Grid
      bg="cream"
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
        '#bluboho': { bg: isBeloved ? 'bbBackground' : 'white' },
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
  )
}

export default SiteNav
