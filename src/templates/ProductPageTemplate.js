import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductSEO from '../components/product/ProductSEO'
import ProductView from '../views/ProductView'

import { useViewProductAnalytics } from '../hooks/product'

const ProductPageTemplate = ({ data, pageContext, ...props }) => {
  const { product, alternates, badges, stack, card, rating, reviews } = data
  const { content } = data.sanityCollectionSeo || {}
  const { isBeloved, pickers } = pageContext

  useViewProductAnalytics(product)

  return (
    <Layout isBeloved={isBeloved}>
      <ProductSEO product={product} rating={rating} reviews={reviews.nodes} />
      <ProductView
        product={product}
        alternates={alternates}
        pickers={pickers}
        badges={badges.nodes}
        stack={stack.nodes}
        card={card}
        content={content}
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
      legacyResourceId
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
      #images {
      # src
      # gatsbyImageData(placeholder: BLURRED)
      #}
      media {
        ... on ShopifyMediaImage {
          mediaContentType
          image {
            src
            gatsbyImageData(placeholder: BLURRED)
          }
        }
       ... on ShopifyVideo {
          mediaContentType
          sources {
            format
            url
          }
        }
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
        metafield (namespace: "custom", key: "metal_option_text"){
          value
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
        #images {
        #  gatsbyImageData(placeholder: BLURRED, width: 80)
        #}
        media {
          ... on ShopifyMediaImage {
            image {
              gatsbyImageData(placeholder: BLURRED, width: 80)
            }
          }
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
    sanityCollectionSeo(type: { eq: "product" }, handle: { eq: $handle }) {
      content {
        ... on SanityCollectionSEOheading {
          heading
        }
        ... on SanityCollectionSEOtext {
          quote
        }
        ... on SanityCollectionSEOblock {
          blocks: _rawBlock
        }
        ... on SanityCollectionSEOimage {
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`
