import React, { useState } from 'react'
import { Box, Link, Container, Divider, Text } from 'theme-ui'
import Layout from '../layout'
import ProductGrid from './CollectionProductGrid'
import ResultsHeader from './ResultsHeader'
import SEO from '../seo'
import CollectionFilterAndSort from './CollectionFilterAndSort'
import CollectionSidebar from '../CollectionSidebar'

const CollectionPage = ({
  title,
  description,
  products,
  hasFilters,
  hasSidebar,
}) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Layout>
      <SEO title={title} description={description} />
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
          <Box as="main" p={[3, 4]}>
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

export default CollectionPage
