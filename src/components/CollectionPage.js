import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'theme-ui'
import CollectionProduct from './CollectionProduct'
import CollectionProductGroup from './CollectionProductGroup'
import CollectionSidebar from './CollectionSidebar'

const groupProducts = (products, fallback = 'Fallback Subgroup') =>
  products.reduce((acc, el) => {
    const { subgroup } = el
    if (subgroup) {
      return {
        ...acc,
        [subgroup]: (acc[subgroup] || []).concat(el),
      }
    }
    acc[fallback] = (acc[fallback] || []).concat(el)
    return acc
  }, {})

const CollectionPage = ({ children, products }) => {
  const productGroups = groupProducts(products)

  return (
    <Box
      sx={{
        display: ['block', 'grid'],
        gridTemplateColumns: ['1fr', 'max-content 1fr'],
        position: 'relative',
      }}
    >
      <Box as="aside" p={[0, 4]}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
          }}
        >
          <CollectionSidebar />
        </Box>
      </Box>
      <Box as="main" p={[3, 4]}>
        <div>{children}</div>
        <div>
          {Object.keys(productGroups).map(key => (
            <CollectionProductGroup groupType={key} key={key}>
              {productGroups[key].map(product => (
                <CollectionProduct key={product.id} product={product} />
              ))}
            </CollectionProductGroup>
          ))}
        </div>
      </Box>
    </Box>
  )
}

CollectionPage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})),
}

export default CollectionPage
