import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Link, Box, Container, Divider } from 'theme-ui'
import ProductTypeCollectionPage from '../../components/ProductTypeCollectionPage'
import Layout from '../../components/layout'
import ResultsHeader from '../../components/collection/ResultsHeader'
import CollectionFilterAndSort from '../../components/collection/CollectionFilterAndSort'

function ShopAllPage({ data }) {
  const { nodes, totalCount } = data.allShopifyProduct
  const [isOpen, setOpen] = useState(false)

  const allProducts = nodes.filter(node =>
    [
      'Ring',
      'Bracelet',
      'Earring',
      'Engagement Ring',
      'Necklace',
      'Ring',
    ].includes(node.productType)
  )

  return (
    <Layout>
      <Container>
        <ProductTypeCollectionPage
          collectionTitle="Shop All Products"
          products={allProducts}
        >
          <ResultsHeader
            title="Shop All Products"
            resultType="products"
            count={allProducts.length}
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
  query ShopAllQuery {
    allShopifyProduct(filter: { availableForSale: { eq: true } }) {
      nodes {
        productType
        title
        description
        tags
        id
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          originalSrc
          altText
        }
      }
    }
  }
`
