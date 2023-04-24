import React from 'react'
import SEO from '../seo'
import { getSrcWithSize } from '../RemoteShopifyImage'
import { escapeDoubleQuoteString } from '../../lib/escapeDoubleQuoteStrings'
import useSite from '../../lib/useSite'

const CollectionSEO = ({
  seo = {},
  title,
  description,
  products,
  handle,
  image,
}) => {
  const { siteUrl } = useSite()

  const imageSrc = image ? image.originalSrc : null
  // const imageSrc = image ? image.originalSrc || image.images.fallback.src : null
  const ldJSONSrc = getSrcWithSize(imageSrc, '1024x_crop_center')

  // const { title: seoTitle, description: seoDesc } = seo || {}
  const seoTitle = escapeDoubleQuoteString(seo.title || title)
  const seoDesc =
    escapeDoubleQuoteString(seo.description || description) || seoTitle
  // const descriptionString = escapeDoubleQuoteString(description)
  const collectionUrl = `${siteUrl}/collections/${handle}`

  const collectionLdJSON = `
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "${seoTitle}",
      "description": "${seoDesc}", 
      "image": "${ldJSONSrc}",
      "url": "${collectionUrl}",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [${products
          .map(
            product =>
              `{
                "@type": "WebPage",
                "name": "${escapeDoubleQuoteString(product.title)}",
                "url": "${siteUrl}/products/${product.handle}"
              }`
          )
          .toString()}]
      }
    }
  `
  return (
    <SEO title={seoTitle} description={seoDesc} shopifyImage={image}>
      <link rel="canonical" href={collectionUrl} />
      <script type="application/ld+json">{collectionLdJSON}</script>
    </SEO>
  )
}

export default CollectionSEO
