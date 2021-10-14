import React, { useContext } from 'react'
import { useQuery } from 'urql'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ProductListItem from './ListItem'

const ProductItemByHandle = ({ handle }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_ITEM_QUERY,
    variables: { handle, countryCode },
  })

  if (data) return <ProductListItem />

  return null
}

export default ProductItemByHandle
