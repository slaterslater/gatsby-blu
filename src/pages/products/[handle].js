import React from 'react'
import { useQuery } from 'urql'
import ProductView from '../../views/ProductView'
import NotFoundView from '../../views/404'
import { PRODUCT_QUERY } from '../../queries/product'
import Layout from '../../components/layout'
import ProductSEO from '../../components/product/ProductSEO'
import { getProduct } from '../../hooks/product'

const ClientProductPage = ({ params: { handle } }) => {
  const [{ data }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle },
  })

  if (data?.product) {
    const product = getProduct(data.product)
    return (
      <Layout>
        <ProductSEO product={product} />
        <ProductView product={product} />
      </Layout>
    )
  }

  if (data && !data.product) return <NotFoundView />

  return false
}

export default ClientProductPage
