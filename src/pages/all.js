import { Button, Container, Grid, Divider, Heading } from 'theme-ui'
import { useQuery } from 'urql'
import React, { useContext, useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import { PAGINATED_COLLECTION_PRODUCTS_QUERY } from '../queries/collection'
import SearchProduct from '../components/SearchProduct'
import { CurrencyContext } from '../contexts/CurrencyContext'
import CollectionPageHeader from '../components/CollectionPageHeader'
import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'

const Page = ({ cursor, isLastPage, onLoadMore }) => {
  const { countryCode } = useContext(CurrencyContext)

  // 2D0
  // a function that makes the query based on filter/sort?

  const [{ data, fetching }] = useQuery({
    query: PAGINATED_COLLECTION_PRODUCTS_QUERY,
    variables: { handle: 'all', after: cursor, countryCode },
  })

  if (!data) return false
  const filteredCollections = data.collection.products.edges.filter(
    ({ node }) => !node.tags.includes('hidden')
  )

  return (
    <>
      {filteredCollections.map(({ node }) => {
        const images = node.images.edges.map(({ node }) => node)
        return (
          <SearchProduct
            key={`search-result-${node.id}`}
            product={node}
            images={images}
          />
        )
      })}
      {data?.collection.products.pageInfo.hasNextPage && isLastPage && (
        <Button
          onClick={() => {
            onLoadMore(
              filteredCollections[filteredCollections.length - 1].cursor
            )
          }}
          type="button"
        >
          Get More Products
        </Button>
      )}
    </>
  )
}

const AllProductsPage = props => {
  const [pageParams, setPageParams] = useState([{ cursor: null }])
  const title = 'all fine jewelry'
  const description =
    'explore our array of sustainable, handmade fine jewelry— from dainty stacking rings to statement earrings, delicate silver bracelets to solid gold everyday jewelry and beyond, we have unique jewelry options for every occasion'

  return (
    <Layout title={title} description={description}>
      <CollectionPageHeader title={title} description={description}>
        <StaticImage src="../images/all-product-page-header.webp" />
      </CollectionPageHeader>
      <Container>
        {/* <CollectionFilterAndSort title={title} productCount={0} /> */}
        <Grid
          py={[3, 4, 5]}
          sx={{
            gridTemplateColumns: [
              'repeat(2, 1fr)',
              'repeat(auto-fill, minmax(190px, 1fr))',
              'repeat(auto-fill, minmax(240px, 1fr))',
            ],
            gap: [3, 4, 5],
          }}
        >
          {pageParams.map((params, i) => (
            <Page
              cursor={params.cursor}
              key={`${i}-${params.cursor}`}
              isLastPage={i === pageParams.length - 1}
              onLoadMore={cursor =>
                setPageParams(prev => [...prev, { cursor }])
              }
            />
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default AllProductsPage
