import React, { useEffect } from 'react'
import { useQuery } from 'urql'
import { graphql } from 'gatsby'
import { PRODUCT_QUERY } from '../queries/product'
import Layout from '../components/layout'
import ProductSEO from '../components/product/ProductSEO'
import ProductPage, { getProduct } from '../views/ProductView'
import { useGAEvent } from '../lib/useGAEvent'
import { useGtagViewItem } from '../hooks/gtag'
import { usePinEffect } from '../hooks/pintrk'

const ProductPageTemplate = ({ data }) => {
  const [{ data: latestData }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle: data.shopifyProduct.handle },
  })

  const latestProduct = latestData
    ? getProduct(latestData.productByHandle)
    : null

  const sendGAEvent = useGAEvent({
    category: data.shopifyProduct.productType,
    action: 'Viewed Product',
  })

  usePinEffect('pageview', data.shopifyProduct.handle)

  useGtagViewItem(data.shopifyProduct)

  useEffect(() => {
    sendGAEvent()
  }, [])

  return (
    <Layout>
      <ProductSEO product={data.shopifyProduct} />
      <ProductPage
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
