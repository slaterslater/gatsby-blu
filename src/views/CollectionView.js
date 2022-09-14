import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/layout'
import ProductGrid from '../components/collection/CollectionProductGrid'
import SEO from '../components/seo'
import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'
import { getSrcWithSize } from '../components/RemoteShopifyImage'
import { escapeDoubleQuoteString } from '../lib/escapeDoubleQuoteStrings'
import { useAnalytics } from '../lib/useAnalytics'
import CollectionPageHeader from '../components/CollectionPageHeader'

export const getCollectionProducts = products => {
  if (products)
    return products.edges.map(({ node }) => ({
      ...node,
      id: `Shopify__Product__${node.id}`,
      variants: node.variants.edges.map(({ node: n }) => n),
      images: node.images.edges.map(({ node: n }) => n),
      metafields: node.metafields.edges.map(({ node: n }) => n),
    }))

  return undefined
}

const CollectionPage = ({
  title,
  description,
  products,
  handle,
  hasFilters,
  hasSidebar,
  image,
  collectionImages,
}) => {
  useAnalytics('viewItemList', products, title, handle)
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

  const ldJSONSrc = getSrcWithSize(image?.src, '1024x_crop_center')

  const collectionUrl = `${siteUrl}/collections/${handle}`

  const collectionLdJSON = `
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "${title}",
      "description": "${escapeDoubleQuoteString(description)}", 
      "image": "${ldJSONSrc}",
      "@id": "${collectionUrl}"
    }
  `

  return (
    <Layout>
      <SEO title={title} description={description} shopifyImage={image}>
        <link rel="canonical" href={collectionUrl} />
        <script type="application/ld+json">{collectionLdJSON}</script>
      </SEO>
      <CollectionPageHeader
        title={title}
        description={description}
        image={image}
      />
      <Container pt={0}>
        <CollectionFilterAndSort title={title} productCount={products.length} />
        <ProductGrid
          products={products}
          collectionTitle={title}
          collectionPath={`/collections/${handle}`}
          collectionImages={collectionImages}
        />
      </Container>
    </Layout>
  )
}

CollectionPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  hasFilters: PropTypes.bool.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    altText: PropTypes.string,
  }),
}
CollectionPage.defaultProps = {
  image: {},
  description: '',
}

export default CollectionPage
