import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductPage from '../components/product/ProductPage'
import { useGAEvent } from '../lib/useGAEvent'
import SEO from '../components/seo'
import { useProductTitle } from '../components/ProductTitle'
import { useShopifyImageMeta } from '../components/RemoteShopifyImage'
import { escapeDoubleQuoteString } from '../lib/escapeDoubleQuoteStrings'
import { useGtagViewItem } from '../hooks/gtag'
import { usePinEffect } from '../hooks/pintrk'

const ProductPageTemplate = ({ data }) => {
  const title = useProductTitle(data.shopifyProduct.title)
  const sendGAEvent = useGAEvent({
    category: data.shopifyProduct.productType,
    action: 'Viewed Product',
  })

  usePinEffect('pageview', data.shopifyProduct.handle)

  useGtagViewItem(data.shopifyProduct)

  useEffect(() => {
    sendGAEvent()
  }, [])

  const productUrl = `${data.site.siteMetadata.siteUrl}/products/${data.shopifyProduct.handle}`

  const productLdJSON = `
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": "${productUrl}",
      "brand": {
        "name": "${data.shopifyProduct.vendor}"
      },
      "name": "${title}",
      "description": "${escapeDoubleQuoteString(
        data.shopifyProduct.description
      )}",
      "category": "${data.shopifyProduct.productType}",
      "url": "${productUrl}",
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
          "url": "${productUrl}?variant=${variant.sku}",
          "sku": "${variant.sku}"
          }
        `
        )
        .toString()}]
    }
  `
  const imageMeta = useShopifyImageMeta(data.shopifyProduct.images[0])

  return (
    <Layout>
      <SEO
        title={title}
        description={data.shopifyProduct.description}
        meta={imageMeta}
        originalSrc={data.shopifyProduct.images[0]?.originalSrc}
      >
        <script type="application/ld+json">{productLdJSON}</script>
      </SEO>
      <ProductPage
        tags={data.shopifyProduct.tags}
        product={data.shopifyProduct}
        yotpoProductReview={data.yotpoProductReview}
        yotpoProductQa={data.yotpoProductQa}
        alternates={data.alternates}
        productUrl={productUrl}
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
