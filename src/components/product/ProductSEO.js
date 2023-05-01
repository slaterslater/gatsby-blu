import React from 'react'
import SEO from '../seo'
import { useProductTitle } from '../ProductTitle'
import { escapeDoubleQuoteString } from '../../lib/escapeDoubleQuoteStrings'
import { getSrcWithSize } from '../RemoteShopifyImage'
import useSite from '../../lib/useSite'

const ProductSEO = ({ product, rating, reviews = [] }) => {
  const { siteUrl } = useSite()
  const title = useProductTitle(product.title)
  const { title: seoTitle, description: seoDesc } = product.seo || {}
  const description = seoDesc || product.description
  const productUrl = `${siteUrl}/products/${product.handle}`
  const ldJSONSrc = getSrcWithSize(product.images[0]?.src, '1024x_crop_center')
  const { score = 0, totalReviews = 0 } = rating || {}
  console.log({ totalReviews })
  const productLdJSON = `
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": "${productUrl}",
      "brand": {
        "name": "${product.vendor}"
      },
      "name": "${escapeDoubleQuoteString(seoTitle || title)}",
      "description": "${escapeDoubleQuoteString(description)}",
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
            "price": "${variant.price}",
            "priceCurrency": "CAD",
            "url": "${productUrl}?variant=${variant.sku}",
            "sku": "${variant.sku || 'n/a'}"
          }`
        )
        .toString()}],
      ${
        totalReviews
          ? `"aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "${score.toPrecision(3)}",
        "reviewCount": "${totalReviews}"
      },`
          : ''
      }
      "review": [${reviews
        .map(
          review => `
          {
            "@type": "Review",
            "author": "${review.name}",
            "datePublished": "${review.createdAt}",
            "reviewBody": "${escapeDoubleQuoteString(review.content)}",
            "name": "${escapeDoubleQuoteString(review.title)}",
            "reviewRating": {
              "@type": "Rating",
              "bestRating": "5",
              "ratingValue": "${review.score}",
              "worstRating": "1"
            }
          }`
        )
        .toString()}]
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
      description={description}
      shopifyImage={product.images[0]}
      meta={product.tags.includes('hidden') ? noIndex : []}
    >
      <link rel="canonical" href={productUrl} />
      <script type="application/ld+json">{productLdJSON}</script>
    </SEO>
  )
}

export default ProductSEO
