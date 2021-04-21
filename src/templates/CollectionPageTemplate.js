import React from 'react'
import { graphql } from 'gatsby'
import { Container, Divider, Text } from 'theme-ui'
import Layout from '../components/layout'
import ProductGrid from '../components/collection/CollectionProductGrid'
import ResultsHeader from '../components/collection/ResultsHeader'

const CollectionPageTemplate = ({ data }) => {
  const { products, title, description } = data.shopifyCollection

  return (
    <Layout>
      <Container>
        <ResultsHeader
          title={title}
          description={description}
          resultType="products"
          count={products?.length || 0}
        />
        <Divider />
        <ProductGrid products={products} />
      </Container>
    </Layout>
  )
}

export default CollectionPageTemplate

export const query = graphql`
  query CollectionPage($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      description
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
