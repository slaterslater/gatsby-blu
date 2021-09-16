import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductSEO from '../components/product/ProductSEO'
import ProductView from '../views/ProductView'

import { useViewProductAnalytics, useLatestProduct } from '../hooks/product'

const ProductPageTemplate = ({ data, ...props }) => {
  useViewProductAnalytics(data)

  return (
    <Layout>
      <ProductSEO product={data.shopifyProduct} />
      <ProductView
        product={data.shopifyProduct}
        yotpoProductReview={data.yotpoProductReview}
        yotpoProductQa={data.yotpoProductQa}
        alternates={data.alternates}
      />
    </Layout>
  )
}

export default ProductPageTemplate

export const query = graphql`
  query ProductPage(
    $handle: String!
    $productId: String!
    $alternates: [String]!
  ) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      descriptionHtml
      description
      productType
      vendor
      tags
      handle
      options {
        name
        values
      }
      images {
        id
        originalSrc
        altText
        height
        width
      }
      metafields {
        key
        value
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
      variants {
        title
        id
        shopifyId
        priceNumber
        presentmentPrices {
          edges {
            node {
              price {
                amount
                currencyCode
              }
            }
          }
        }
        sku
        selectedOptions {
          name
          value
        }
      }
    }
    alternates: allShopifyProduct(filter: { shopifyId: { in: $alternates } }) {
      nodes {
        id
        handle
        title
        variants {
          selectedOptions {
            name
            value
          }
          availableForSale
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
