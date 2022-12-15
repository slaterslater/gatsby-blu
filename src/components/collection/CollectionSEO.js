import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '../seo'
import { getSrcWithSize } from '../RemoteShopifyImage'
import { escapeDoubleQuoteString } from '../../lib/escapeDoubleQuoteStrings'

const CollectionSEO = ({
  seo,
  title,
  description,
  products,
  handle,
  image,
}) => {
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

  const imageSrc = image ? image.src || image.images.fallback.src : null
  const ldJSONSrc = getSrcWithSize(imageSrc, '1024x_crop_center')

  const { title: seoTitle, description: seoDesc } = seo || {}
  const descriptionString = escapeDoubleQuoteString(description)
  const collectionUrl = `${siteUrl}/collections/${handle}`

  const collectionLdJSON = `
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "${seoTitle || title}",
      "description": "${seoDesc || descriptionString}", 
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
  `
  return (
    <SEO
      title={seoTitle || title}
      description={seoDesc || description}
      shopifyImage={image}
    >
      <link rel="canonical" href={collectionUrl} />
      <script type="application/ld+json">{collectionLdJSON}</script>
    </SEO>
  )
}

export default CollectionSEO
