import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductPage from '../components/product/ProductPage'

const ProductPageTemplate = ({ data }) => (
  <Layout>
    <ProductPage
      product={data.shopifyProduct}
      yotpoProductReview={data.yotpoProductReview}
      yotpoProductQa={data.yotpoProductQa}
    />
  </Layout>
)

export default ProductPageTemplate

export const query = graphql`
  query ProductPage($handle: String!, $productId: String!) {
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
    yotpoProductReview(productId: { eq: $productId }) {
      bottomline {
        totalReview
        averageScore
      }
      id
      reviews {
        id
        createdAt
        content
        score
        votesUp
        votesDown
        imagesData {
          thumbUrl
        }
        comment {
          createdAt
          content
        }
        user {
          userType
          displayName
          socialImage
        }
      }
    }
    yotpoProductQa(productId: { eq: $productId }) {
      questions {
        id
        createdAt
        content
        userType
        asker {
          displayName
          socialImage
        }
        sortedPublicAnswers {
          votesUp
          votesDown
          createdAt
          content
          answerer {
            slug
          }
        }
      }
    }
  }
`
