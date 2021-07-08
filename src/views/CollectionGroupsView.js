import React from 'react'
import ResultsHeader from '../components/collection/ResultsHeader'
import CollectionProductGroup from '../components/CollectionProductGroup'
import Layout from '../components/layout'

const CollectionGroupsView = ({ collections }) => {
  return <Layout>
        <ResultsHeader
          title={title}
          description={description}
          resultType="products"
          count={products?.length || 0}
        >
          {collections.map(collection => 
    <CollectionProductGroup key={collection.title} title={collection.title} description={collection.description} products={collection.products} /> )}

    </Layout>
}

export default CollectionGroupsView

eport 
