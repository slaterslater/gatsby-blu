import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Link, Box, Container, Divider } from 'theme-ui'
import ProductTypeCollectionPage from '../../components/ProductTypeCollectionPage'
import Layout from '../../components/layout'
import ResultsHeader from '../../components/collection/ResultsHeader'
import CollectionFilterAndSort from '../../components/collection/CollectionFilterAndSort'

function ShopAllPage({ data }) {
  const { nodes, totalCount } = data.shopifyCollection
  const [isOpen, setOpen] = useState(false)

  return (
    <Layout>
      <Container>
        <ProductTypeCollectionPage
          collectionTitle="Shop All Products"
          products={nodes}
        >
          <ResultsHeader
            title="Shop All Products"
            resultType="products"
            count={totalCount}
          >
            <Box sx={{ textAlign: 'right' }} pt={3}>
              <Link
                sx={{ fontSize: 1 }}
                variant="unset"
                onClick={() => setOpen(prev => !prev)}
              >
                Filter &amp; Sort
              </Link>
            </Box>
          </ResultsHeader>
          <CollectionFilterAndSort isOpen={isOpen} />
          <Divider />
        </ProductTypeCollectionPage>
      </Container>
    </Layout>
  )
}

export default ShopAllPage

export const query = graphql`
  query AllPage {
    shopifyCollection(handle: { eq: "all" }) {
      title
      description
      handle
      products {
        handle
        title
        images {
          originalSrc
          altText
        }
        priceRange {
          minVariantPrice {
            currencyCode
            amount
          }
          maxVariantPrice {
            currencyCode
            amount
          }
        }
      }
    }
  }
`
