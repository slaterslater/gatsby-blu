import { Box, Flex, Text, Divider } from 'theme-ui'
import React from 'react'
import PropTypes from 'prop-types'
import ThemeLink from './app/ThemeLink'

const NavigationCollectionLink = ({ handle, children }) => (
  <ThemeLink
    to={`/collections/${handle}`}
    variant="nav"
    py={1}
    pr={[3, 0]}
    sx={{
      fontSize: [0, 1],
      flex: '0 0 auto',
      whiteSpace: 'nowrap',
      scrollSnapAlign: 'start',
    }}
  >
    {children}
  </ThemeLink>
)
NavigationCollectionLink.propTypes = {
  handle: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

const collectionLinks = [
  {
    handle: 'newarrivals',
    label: 'New Arrivals',
  },
  {
    handle: 'best-sellers',
    label: 'Best Sellers',
  },
  {
    handle: 'necklaces',
    label: 'Necklaces',
  },
  {
    handle: 'rings',
    label: 'Rings',
  },
  {
    handle: 'earrings',
    label: 'Earrings',
  },
  {
    handle: 'bridal',
    label: 'Engagement',
  },
  {
    handle: 'bracelets',
    label: 'Bracelets',
  },
]

const CollectionSidebar = () => (
  <Flex
    mt={[-5, 9]}
    mr={[-5, 0]}
    pt={[3, 0]}
    pb={[4, 0]}
    as="nav"
    sx={{
      flexDirection: ['row', 'column'],
      overflowX: 'auto',
      webkitOverflowScrolling: 'touch',
      scrollSnapType: 'x mandatory',
      scrollBehavior: 'smooth',
    }}
  >
    {collectionLinks.map(({ handle, label }) => (
      <NavigationCollectionLink key={`sidebar-link-${handle}`} handle={handle}>
        {label}
      </NavigationCollectionLink>
    ))}
  </Flex>
)

export default CollectionSidebar
