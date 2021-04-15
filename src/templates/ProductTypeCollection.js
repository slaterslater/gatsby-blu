import React from 'react'
import { graphql } from 'gatsby'
import { Divider, Container } from 'theme-ui'
import Layout from '../components/layout'
import ResultsHeader from '../components/collection/ResultsHeader'
import ProductTypeCollectionPage from '../components/ProductTypeCollectionPage'

const ProductTypeCollection = ({ data }) => {
  const { nodes, totalCount } = data.allShopifyProduct
  const { text } = data.productTypeNavigationJson

  return (
    <Layout>
      <Container>
        <ProductTypeCollectionPage products={nodes}>
          <ResultsHeader
            title={text}
            description={`${text}: pretty great`}
            resultType="products"
            count={totalCount}
          />
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
      }
    }
  }
`
