import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'theme-ui'
import CollectionSidebar from './CollectionSidebar'
import CollectionProductGrid from './collection/CollectionProductGrid'

const CollectionPage = ({ children, products }) => (
  <Box
    sx={{
      display: ['block', 'grid'],
      gridTemplateColumns: ['1fr', 'max-content 1fr'],
      position: 'relative',
      gap: [0, 6],
    }}
  >
    <Box as="aside">
      <Box
        sx={{
          position: 'sticky',
          top: [0, 80],
        }}
      >
        <CollectionSidebar />
      </Box>
    </Box>
    <Box as="main" p={[3, 4]}>
      <div>{children}</div>
      <CollectionProductGrid products={products} />
    </Box>
  </Box>
)

CollectionPage.propTypes = {
  children: PropTypes.node.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CollectionPage
