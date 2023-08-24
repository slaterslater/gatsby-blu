import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'theme-ui'
import Layout from '../components/layout'
import ProductGrid from '../components/collection/CollectionProductGrid'
import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'
import { useAnalytics } from '../lib/useAnalytics'
import CollectionPageHeader from '../components/CollectionPageHeader'
import CollectionSEO from '../components/collection/CollectionSEO'
import PageContentSEO from '../components/PageContentSEO'
import { useSortedFilteredProducts } from '../hooks/collection'

const CollectionPage = ({
  seo,
  title,
  description,
  descriptionHtml,
  products,
  handle,
  hasFilters,
  hasSidebar,
  image,
  collectionImages,
  card,
  content,
  isBeloved,
  allowQuickAdd,
  badges,
}) => {
  useAnalytics('viewItemList', products, title, handle)

  const sortedProducts = useSortedFilteredProducts(products)

  return (
    <Layout isBeloved={isBeloved}>
      <CollectionSEO
        seo={seo}
        title={title}
        description={description}
        image={image}
        products={products}
        handle={handle}
      />
      {!card && (
        <CollectionPageHeader
          title={title}
          description={description}
          descriptionHtml={descriptionHtml}
          image={image}
        />
      )}
      <Container pt={0}>
        <CollectionFilterAndSort title={title} products={products} />
        <ProductGrid
          products={sortedProducts || products}
          collectionTitle={title}
          collectionPath={`/collections/${handle}`}
          collectionImages={collectionImages}
          allowQuickAdd={allowQuickAdd}
          badges={badges}
          card={card}
        />
        {content && <PageContentSEO title={title} content={content} />}
      </Container>
    </Layout>
  )
}

CollectionPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape({})),
  hasFilters: PropTypes.bool.isRequired,
  // image: PropTypes.shape({
  //   // src: PropTypes.string,
  //   // altText: PropTypes.string,
  // }),
}
CollectionPage.defaultProps = {
  // image: {},
  description: '',
}

export default CollectionPage
