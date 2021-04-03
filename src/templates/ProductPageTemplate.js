import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductPage from '../components/product/ProductPage'

const ProductPageTemplate = ({ data }) => (
  <Layout>
    <ProductPage
      product={data.shopifyProduct}
      yotpoProductBottomline={data.yotpoProductBottomline}
      allYotpoProductReview={data.allYotpoProductReview}
    />
  </Layout>
)

export default ProductPageTemplate

export const query = graphql`
  query ProductPage($handle: String!, $productIdentifier: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      title
      description
      productType
      vendor
      images {
        id
        originalSrc
      }
      variants {
        id
        shopifyId
        priceNumber
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
    allYotpoProductReview(
      filter: { productIdentifier: { eq: $productIdentifier } }
    ) {
      nodes {
        id
        title
        content
        name
        email
        updatedAt
        score
        votesUp
        votesDown
        reviewerType
      }
    }
    yotpoProductBottomline(productIdentifier: { eq: $productIdentifier }) {
      totalReviews
      score
    }
  }
`
