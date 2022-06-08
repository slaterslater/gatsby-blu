import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductSEO from '../components/product/ProductSEO'
import ProductView from '../views/ProductView'

// yotpo_reviews has first page of reviews
// yotpo review_count
// yotpo reviews_average

import { useViewProductAnalytics, useLatestProduct } from '../hooks/product'

const ProductPageTemplate = ({ data, ...props }) => {
  const { product, alternates, badges } = data
  useViewProductAnalytics(product)
  const isHidden = useMemo(
    () => product.tags.includes('hidden'),
    [product.tags]
  )
  return (
    <Layout>
      <ProductSEO product={product} isHidden={isHidden} />
      <ProductView
        product={product}
        alternates={alternates}
        badges={badges.nodes}
      />
    </Layout>
  )
}

export default ProductPageTemplate

export const query = graphql`
  query ProductPage(
    $handle: String!
    $shopifyId: String!
    $alternates: [String]!
    $badges: [String]!
  ) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    product: shopifyProduct(handle: { eq: $handle }) {
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
        url
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
    badges: allSanityProductBadge(filter: { name: { in: $badges } }) {
      nodes {
        id
        name
        image {
          asset {
            gatsbyImageData(width: 55, placeholder: BLURRED, height: 55)
          }
        }
      }
    }
  }
`
