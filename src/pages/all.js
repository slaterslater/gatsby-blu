import { Button, Container, Grid, Divider, Heading } from 'theme-ui'
import { useQuery } from 'urql'
import React, { useState } from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import Layout from '../components/layout'
import { PAGINATED_COLLECTION_PRODUCTS_QUERY } from '../queries/collection'
import SearchProduct from '../components/SearchProduct'
// import ResultsHeader from '../components/collection/ResultsHeader'

const Page = ({ cursor, isLastPage, onLoadMore }) => {
  const [{ data, fetching }] = useQuery({
    query: PAGINATED_COLLECTION_PRODUCTS_QUERY,
    variables: { handle: 'all', after: cursor },
  })

  // console.log(cursor, data?.collectionByHandle.products.edges[0].cursor)

  if (!data) return false

  return (
    <>
      {data.collectionByHandle.products.edges.map(({ node }) => {
        const images = node.images.edges.map(({ node }) => node)
        return (
          <SearchProduct
            key={`search-result-${node.id}`}
            product={node}
            images={images}
          />
        )
      })}
      {data?.collectionByHandle.products.pageInfo.hasNextPage && isLastPage && (
        <Button
          onClick={() => {
            onLoadMore(
              data.collectionByHandle.products.edges[
                data.collectionByHandle.products.edges.length - 1
              ].cursor
            )
          }}
          type="button"
        >
          Get More PRoducts
        </Button>
      )}
    </>
  )
}

const AllProductsPage = props => {
  const [pageParams, setPageParams] = useState([{ cursor: null }])

  return (
    <Layout>
      <Container>
        <Heading as="h1">All</Heading>
        <Divider />
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
