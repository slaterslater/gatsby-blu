import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Link, Container, Divider } from 'theme-ui'
import { useLocation } from '@reach/router'
import Layout from '../layout'
import ProductGrid from './CollectionProductGrid'
import ResultsHeader from './ResultsHeader'
import SEO from '../seo'
import CollectionFilterAndSort from './CollectionFilterAndSort'
import CollectionSidebar from '../CollectionSidebar'
import { getSrcWithSize } from '../RemoteShopifyImage'

const CollectionPage = ({
  title,
  description,
  products,
  hasFilters,
  hasSidebar,
  image,
}) => {
  const location = useLocation()
  const [isOpen, setOpen] = useState(false)
  const ldJSONSrc = getSrcWithSize(image?.src, '1024x_crop_center')

  const collectionLdJSON = `
    "@type": "CollectionPage",
    "name": "${title}",
    "url": "${location.handle}",
    "description": "${description}", 
    "image": "${ldJSONSrc}"
  `

  return (
    <Layout>
      <SEO title={title} description={description}>
        <script type="application/ld+json">{collectionLdJSON}</script>
      </SEO>
      <Container>
        <Box
          sx={{
            display: ['block', 'grid'],
            gridTemplateColumns: ['1fr', 'max-content 1fr'],
            position: 'relative',
            gap: [0, 6],
          }}
        >
          <Box as="aside">
            {hasSidebar && (
              <Box
                sx={{
                  position: 'sticky',
                  top: [0, 80],
                }}
              >
                <CollectionSidebar />
              </Box>
            )}
          </Box>
          <Box as="main">
            <ResultsHeader
              title={title}
              description={description}
              resultType="products"
              count={products?.length || 0}
            >
              {hasFilters && (
                <Box sx={{ textAlign: 'right' }} pt={3}>
                  <Link
                    sx={{ fontSize: 1 }}
                    variant="unset"
                    onClick={() => setOpen(prev => !prev)}
                  >
                    Filter &amp; Sort
                  </Link>
                </Box>
              )}
            </ResultsHeader>
            {hasFilters && <CollectionFilterAndSort isOpen={isOpen} />}
            <Divider />
            <ProductGrid products={products} />
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

CollectionPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  hasFilters: PropTypes.bool.isRequired,
  hasSidebar: PropTypes.bool.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    altText: PropTypes.string,
  }),
}
CollectionPage.defaultProps = {
  image: {},
  description: '',
}

export default CollectionPage
