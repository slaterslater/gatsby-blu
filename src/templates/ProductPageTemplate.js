import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductSEO from '../components/product/ProductSEO'
import ProductView from '../views/ProductView'

// yotpo_reviews has first page of reviews
// yotpo review_count
// yotpo reviews_average

import { useViewProductAnalytics, useLatestProduct } from '../hooks/product'

const ProductPageTemplate = ({ data, ...props }) => {
  useViewProductAnalytics(data)

  return (
    <Layout>
      <ProductSEO product={data.shopifyProduct} />
      <ProductView product={data.shopifyProduct} alternates={data.alternates} />
    </Layout>
  )
}

export default ProductPageTemplate

export const query = graphql`
  query ProductPage(
    $handle: String!
    $shopifyId: String!
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
        priceV2 {
          amount
          currencyCode
        }
        sku
        selectedOptions {
          name
          value
        }
      }
    }
    alternates: allShopifyProduct(
      filter: { shopifyId: { in: $alternates, ne: $shopifyId } }
    ) {
      nodes {
        id
        handle
        title
        options {
          name
          values
        }
        variants {
          selectedOptions {
            name
            value
          }
          availableForSale
        }
      }
    }
  }
`
