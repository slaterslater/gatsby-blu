import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Link, Container, Divider } from 'theme-ui'
import { useLocation } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../layout'
import ProductGrid from './CollectionProductGrid'
import ResultsHeader from './ResultsHeader'
import SEO from '../seo'
import CollectionFilterAndSort from './CollectionFilterAndSort'
import { getSrcWithSize } from '../RemoteShopifyImage'
import { escapeDoubleQuoteString } from '../../lib/escapeDoubleQuoteStrings'
import { useGtagViewItemList } from '../../hooks/gtag'

const CollectionPage = ({
  title,
  description,
  products,
  handle,
  hasFilters,
  hasSidebar,
  image,
}) => {
  useGtagViewItemList(products, title, handle)
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

  const [isOpen, setOpen] = useState(false)
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
      <SEO title={title} description={description}>
        <script type="application/ld+json">{collectionLdJSON}</script>
      </SEO>
      <Container as="main">
        <ResultsHeader
          title={title}
          description={description}
          resultType="products"
          count={products?.length || 0}
        >
          {hasFilters && (
            <Box sx={{ textAlign: 'right' }} pt={3}>
              <Link
                sx={{ fontSize: 1 }}
                variant="unset"
                onClick={() => setOpen(prev => !prev)}
              >
                Filter &amp; Sort
              </Link>
            </Box>
          )}
        </ResultsHeader>
        {hasFilters && <CollectionFilterAndSort isOpen={isOpen} />}
        <Divider />
        <ProductGrid
          products={products}
          collectionTitle={title}
          collectionPath={`/collections/${handle}`}
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
