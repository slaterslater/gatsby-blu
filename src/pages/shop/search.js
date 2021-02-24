import React from 'react'
import { useQuery } from 'urql'
import Layout from '../../components/layout'
import { PRODUCT_QUERY } from '../../queries/search'

const SearchPage = props => {
  console.log(props)
  // const [query] = useQuery({
  //   query: PRODUCT_QUERY,
  //   variables: { query: term, first: 250 },
  //   pause: term.length < 3,
  // })

  return <Layout>search!</Layout>
}

export default SearchPage
