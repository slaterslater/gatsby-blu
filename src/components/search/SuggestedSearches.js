import React from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'

const SearchLink = ({ children, ...props }) => (
  <Box sx={{ lineHeight: 1.5 }}>
    <ThemeLink
      sx={{ fontSize: 1, textDecoration: 'none' }}
      to={`/search?q=${children}`}
    >
      {children}
    </ThemeLink>
  </Box>
)

const SuggestedSearches = props => (
  <Flex pt={6} pl={2} sx={{}}>
    <Box>
      <Heading variant="caps" pb={4}>
        Top Searches:
      </Heading>
      <SearchLink>Stacking Rings</SearchLink>
      <SearchLink>Sapphire Rings</SearchLink>
      <SearchLink>Charm Necklaces</SearchLink>
      <SearchLink>Threader Earrings</SearchLink>
      <SearchLink>Gold Necklaces</SearchLink>
    </Box>
  </Flex>
)

export default SuggestedSearches
