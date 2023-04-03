import React, { useContext } from 'react'
import { useQuery } from 'urql'
import propTypes from 'prop-types'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ProductListItem from './ListItem'

const ProductItemByHandle = ({ handle }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_ITEM_QUERY,
    variables: { handle, countryCode },
  })

  if (!data) return null
  return <ProductListItem />
}

export default ProductItemByHandle

ProductItemByHandle.propTypes = {
  handle: propTypes.string,
}
