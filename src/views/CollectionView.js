import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'theme-ui'

import Layout from '../components/layout'
import ProductGrid from '../components/collection/CollectionProductGrid'

import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'

import { useAnalytics } from '../lib/useAnalytics'
import CollectionPageHeader from '../components/CollectionPageHeader'
import ContemplationCard from '../components/product/ContemplationCard'
import CollectionSEO from '../components/collection/CollectionSEO'

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
  seo,
  title,
  description,
  products,
  handle,
  hasFilters,
  hasSidebar,
  image,
  collectionImages,
  card,
}) => {
  useAnalytics('viewItemList', products, title, handle)

  return (
    <Layout>
      <CollectionSEO
        seo={seo}
        title={title}
        description={description}
        image={image}
        products={products}
        handle={handle}
      />
      {card ? (
        <ContemplationCard card={card} isPageHeader />
      ) : (
        <CollectionPageHeader
          title={title}
          description={description}
          image={image}
        />
      )}
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
