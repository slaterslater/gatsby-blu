import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductGrid from '../components/collection/CollectionProductGrid'

const CollectionPageTemplate = ({ data }) => {
  const { products, title } = data.shopifyCollection

  return (
    <Layout>
      {title}
      <ProductGrid products={products} />
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
