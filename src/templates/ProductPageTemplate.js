import React, { useEffect } from 'react'
import { useQuery } from 'urql'
import { graphql } from 'gatsby'
import { parse } from 'qs'
import { useLocation } from '@reach/router'
import { PRODUCT_QUERY } from '../queries/product'
import Layout from '../components/layout'
import ProductSEO from '../components/product/ProductSEO'
import ProductView, { getProduct } from '../views/ProductView'
import { useAnalytics } from '../lib/useAnalytics'

const useViewProductAnalytics = data => {
  const { search } = useLocation()

  const { variant, currency } = parse(search?.replace('?', ''))
  useAnalytics('viewProduct', {
    product: data.shopifyProduct,
    variant,
    currency,
  })
}

const ProductPageTemplate = ({ data, ...props }) => {
  const [{ data: latestData }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle: data.shopifyProduct.handle },
  })

  const latestProduct = latestData
    ? getProduct(latestData.productByHandle)
    : null

  useViewProductAnalytics(data)

  return (
    <Layout>
      <ProductSEO product={data.shopifyProduct} />
      <ProductView
        product={latestProduct || data.shopifyProduct}
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
        availableForSale
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
