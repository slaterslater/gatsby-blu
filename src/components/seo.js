/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { isEmpty } from 'lodash'
import { escapeDoubleQuoteString } from '../lib/escapeDoubleQuoteStrings'
import { useShopifyImage } from '../hooks/shopifyImage'

const useGatsbyImageMeta = (gatsbyImageData = {}, altText = '') => {
  const { src } = gatsbyImageData.images?.fallback || {}
  if (!src) return []
  return [
    { property: 'og:image', content: src },
    { property: 'og:image:height', content: 628 },
    { property: 'og:image:width', content: 1200 },
    { property: 'og:image:alt', content: altText },
    { property: 'twitter:image', content: src },
    { property: 'twitter:image:height', content: 1200 },
    { property: 'twitter:image:width', content: 628 },
    { property: 'twitter:image:alt', content: altText },
  ]
}

const useShopifyImageMeta = (image = {}) => {
  const gatsbyImageData = useShopifyImage({ image, width: 1200, height: 628 })
  return useGatsbyImageMeta(gatsbyImageData, image?.altText)
}

const useSEOImageMeta = ({ shopifyImage = {}, gatsbyImage = {} }) => {
  const defaultImageMeta = useShopifyImageMeta({
    url: 'https://cdn.shopify.com/s/files/1/0685/0359/files/bluboho_logo.jpg?v=1614307775',
    height: 1500,
    width: 1500,
    altText: '',
    id: 'home-logo-img',
  })

  const shopifyPageImageMeta = useShopifyImageMeta(shopifyImage)
  const gatsbyImageMeta = useGatsbyImageMeta(gatsbyImage)

  if (!isEmpty(shopifyImage)) return shopifyPageImageMeta
  if (!isEmpty(gatsbyImageMeta)) return gatsbyImageMeta
  return defaultImageMeta
}

function SEO({
  description,
  lang,
  meta = [],
  title,
  shopifyImage = {},
  sanityImage = {},
  gatsbyImage = {},
  children,
}) {
  // add blu logo for default image meta
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  const imageMeta = useSEOImageMeta({ shopifyImage, sanityImage, gatsbyImage })

  const metaDescription = escapeDoubleQuoteString(
    description || site.siteMetadata.description
  )

  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...imageMeta,
        ...meta,
      ]}
    >
      {children}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
  title: '',
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
