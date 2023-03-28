import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductSEO from '../components/product/ProductSEO'
import ProductView from '../views/ProductView'

import { useViewProductAnalytics } from '../hooks/product'

const ProductPageTemplate = ({ data, ...props }) => {
  const { product, alternates, badges, stack, card, rating, reviews } = data
  useViewProductAnalytics(product)

  return (
    <Layout>
      <ProductSEO product={product} rating={rating} reviews={reviews.nodes} />
      <ProductView
        product={product}
        alternates={alternates}
        badges={badges.nodes}
        stack={stack.nodes}
        card={card}
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
    $stackWithIds: [String]!
    $cardTitleExp: String!
    $productIdentifier: String!
  ) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    product: shopifyProduct(handle: { eq: $handle }) {
      id: shopifyId
      title
      handle
      descriptionHtml
      description
      seo {
        title
        description
      }
      productType
      vendor
      tags
      handle
      options {
        name
        values
      }
      images {
        src
        gatsbyImageData(placeholder: BLURRED)
      }
      metafields {
        key
        value
      }
      priceRangeV2 {
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
        availableForSale
        price
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
    stack: allShopifyProduct(filter: { shopifyId: { in: $stackWithIds } }) {
      nodes {
        shopifyId
        title
        tags
        options {
          name
          values
        }
        metafields {
          key
          value
        }
        images {
          gatsbyImageData(placeholder: BLURRED, width: 80)
        }
        variants {
          shopifyId
          availableForSale
          selectedOptions {
            name
            value
          }
          price
        }
      }
    }
    card: sanityCard(title: { regex: $cardTitleExp }) {
      title
      subtitle
      text
      stones
      amplify
      amulets
      collectionHandle
      energy
      image {
        asset {
          gatsbyImageData(
            width: 250
            height: 425
            placeholder: BLURRED
            layout: FIXED
          )
        }
      }
      icons {
        asset {
          gatsbyImageData(
            width: 285
            height: 75
            placeholder: BLURRED
            layout: FIXED
          )
        }
      }
    }
    reviews: allYotpoProductReview(
      filter: { productIdentifier: { eq: $productIdentifier } }
    ) {
      nodes {
        name
        title
        score
        content
        createdAt(formatString: "YYYY-MM-DD")
      }
    }
    rating: yotpoProductBottomline(
      productIdentifier: { eq: $productIdentifier }
    ) {
      totalReviews
      score
    }
  }
`
