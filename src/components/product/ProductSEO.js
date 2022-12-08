import React from 'react'
import SEO from '../seo'
import { useProductTitle } from '../ProductTitle'
import { escapeDoubleQuoteString } from '../../lib/escapeDoubleQuoteStrings'

const ProductSEO = ({ product }) => {
  const title = useProductTitle(product.title)
  const productUrl = `https://www.bluboho.com/products/${product.handle}`
  const descriptionString = escapeDoubleQuoteString(product.description)

  const { title: seoTitle, description: seoDesc } = product.seo || {}

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
      "category": "${product.productType}",
      "url": "${productUrl}",
      "sku": "${product.variants[0].sku}",
      "offers": [${product.variants
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
