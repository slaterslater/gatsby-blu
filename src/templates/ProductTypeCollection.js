import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Box, Link, Divider, Container } from 'theme-ui'
import Layout from '../components/layout'
import ResultsHeader from '../components/collection/ResultsHeader'
import ProductTypeCollectionPage from '../components/ProductTypeCollectionPage'
import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'

const ProductTypeCollection = ({ data }) => {
  const { nodes, totalCount } = data.allShopifyProduct
  const { text } = data.productTypeNavigationJson
  // if route has filter or sort param, make true
  const [isOpen, setOpen] = useState(false)

  const filterOptions = nodes.reduce((acc, el) => {
    const nextFilters = acc

    el.variants.forEach(variant => {
      variant.selectedOptions.forEach(option => {
        const filterCategory = option.name.toLowerCase()
        if (!nextFilters[filterCategory]) {
          nextFilters[filterCategory] = []
        }

        nextFilters[filterCategory] = Array.from(
          new Set([...nextFilters[filterCategory], option.value.toLowerCase()])
        )
      })
    })

    return nextFilters
  }, {})

  return (
    <Layout>
      <Container>
        <ProductTypeCollectionPage products={nodes}>
          <ResultsHeader
            title={text}
            description={`${text}: pretty great`}
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
          <Divider mt={4} />
        </ProductTypeCollectionPage>
      </Container>
    </Layout>
  )
}

export default ProductTypeCollection

export const query = graphql`
  query ProductTypeCollection($productType: String!) {
    productTypeNavigationJson(productType: { eq: $productType }) {
      text
    }
    allShopifyProduct(
      filter: {
        productType: { eq: $productType }
        availableForSale: { eq: true }
      }
    ) {
      totalCount
      nodes {
        handle
        description
        title
        id
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        tags
        id
        images {
          originalSrc
          altText
        }
        variants {
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`
