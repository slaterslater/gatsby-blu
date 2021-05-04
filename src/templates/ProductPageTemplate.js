import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { useLocation } from '@reach/router'
import Layout from '../components/layout'
import ProductPage from '../components/product/ProductPage'
import { useGAEvent } from '../lib/useGAEvent'
import SEO from '../components/seo'
import { useProductTitle } from '../components/ProductTitle'

const ProductPageTemplate = ({ data }) => {
  const location = useLocation()
  const title = useProductTitle(data.shopifyProduct.title)
  const sendGAEvent = useGAEvent({
    category: data.shopifyProduct.productType,
    action: 'Viewed Product',
  })
  useEffect(() => {
    sendGAEvent()
  }, [])

  const productLdJSON = `
    {
      "@type": "Product",
      "@id": "${location.href}",
      "brand": {
        "name": "${data.shopifyProduct.vendor}"
      },
      "name": "${title}",
      "description": "${data.shopifyProduct.description}",
      "category": "${data.shopifyProduct.productType}",
      "url": "${location.href}",
      "sku": "${data.shopifyProduct.variants[0].sku}",
      "offers": [${data.shopifyProduct.variants
        .map(
          variant => `
          {
          "@type": "Offer",
          "name": "${variant.title}",
          "availability": "https://schema.org/${
            variant.availableForSale ? 'InStock' : 'OutOfStock'
          }",
          "price": "${variant.priceNumber}",
          "priceCurrency": "CAD",
          "url": "${location.href}?variant=${variant.sku}",
          "sku": "${variant.sku}"
          }
        `
        )
        .toString()}]
    }
  `

  return (
    <Layout>
      <SEO title={title}>
        <script type="application/ld+json">{productLdJSON}</script>
      </SEO>
      <ProductPage
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
    shopifyProduct(handle: { eq: $handle }) {
      title
      descriptionHtml
      description
      productType
      vendor
      onlineStoreUrl
      options {
        name
        values
      }
      images {
        id
        originalSrc
        altText
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
