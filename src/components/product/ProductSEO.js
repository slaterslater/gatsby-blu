import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from '../seo'
import { useProductTitle } from '../ProductTitle'
import { escapeDoubleQuoteString } from '../../lib/escapeDoubleQuoteStrings'
import { getSrcWithSize } from '../RemoteShopifyImage'

const ProductSEO = ({ product, rating, reviews }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  const title = useProductTitle(product.title)
  const { title: seoTitle, description: seoDesc } = product.seo || {}

  const productUrl = `${siteUrl}/products/${product.handle}`
  const descriptionString = escapeDoubleQuoteString(product.description)
  const ldJSONSrc = getSrcWithSize(product.images[0]?.url, '1024x_crop_center')

  const { score = 0, totalReviews = 0 } = rating || {}

  const productLdJSON = `
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": "${productUrl}",
      "brand": {
        "name": "${product.vendor}"
      },
      "name": "${seoTitle || title}",
      "description": "${seoDesc || descriptionString}",
      "image": "${ldJSONSrc}",
      "category": "${product.productType}",
      "url": "${productUrl}",
      "sku": "${product.variants[0].sku}",
      "offers": [${product.variants
        .map(
          variant => `
          {
            "@type": "Offer",
            "name": "${escapeDoubleQuoteString(variant.title)}",
            "availability": "https://schema.org/${
              variant.availableForSale ? 'InStock' : 'OutOfStock'
            }",
            "price": "${variant.priceNumber}",
            "priceCurrency": "CAD",
            "url": "${productUrl}?variant=${variant.sku}",
            "sku": "${variant.sku || 'n/a'}"
          }`
        )
        .toString()}],
      ${
        reviews.length
          ? `"review": [${reviews
              .map(
                review => `{
            "@type": "Review",
            "author": "${review.name}",
            "datePublished": "${review.createdAt}",
            "reviewBody": "${escapeDoubleQuoteString(review.content)}",
            "name": "${review.title}",
            "reviewRating": {
              "@type": "Rating",
              "bestRating": "5",
              "ratingValue": "${review.score}",
              "worstRating": "1"
            }
          }`
              )
              .toString()}],
      "aggregateRating": {
        "@type": "AggregateRating",
        "reviewCount": "${rating.totalReviews}",
        "ratingValue": "${rating.score}"
      }`
          : ''
      }
    }
  `
  const noIndex = [
    {
      name: 'robots',
      content: 'noindex',
    },
  ]

  return (
    <SEO
      title={seoTitle || product.title.toLowerCase()}
      description={seoDesc || product.description}
      shopifyImage={product.images[0]}
      meta={product.tags.includes('hidden') ? noIndex : []}
    >
      <link rel="canonical" href={productUrl} />
      <script type="application/ld+json">{productLdJSON}</script>
    </SEO>
  )
}

export default ProductSEO
