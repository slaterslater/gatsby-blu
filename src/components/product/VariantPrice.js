import React, { useContext } from 'react'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import FormattedPrice, { useFormattedPrice } from '../FormattedPrice'
import { ProductContext } from './ProductContext'

const VariantPrice = ({ variant }) => {
  const { quantity } = useContext(ProductContext)
  const { currencyCode } = useContext(CurrencyContext)

  const presentmentPrice =
    variant.presentmentPrices.edges.find(
      ({ node }) => node.price.currencyCode === currencyCode
    ) || {}

  return useFormattedPrice({
    ...presentmentPrice.node.price,
    amount: presentmentPrice.node.price.amount * quantity,
  })
}

export default VariantPrice
