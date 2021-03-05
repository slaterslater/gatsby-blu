import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductPage from '../components/product/ProductPage'

const ProductPageTemplate = ({ data }) => (
  <Layout>
    <ProductPage product={data.shopifyProduct} />
  </Layout>
)

export default ProductPageTemplate

export const query = graphql`
  query ProductPage($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      title
      description
      productType
      vendor
      images {
        originalSrc
      }
      variants {
        priceNumber
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
`
