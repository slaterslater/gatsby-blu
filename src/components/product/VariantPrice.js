import React, { useContext } from 'react'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { useFormattedPrice } from '../../hooks/utils'

const VariantPrice = ({ variant }) => {
  const { currencyCode } = useContext(CurrencyContext)

  const { node } =
    variant.presentmentPrices.edges.find(
      ({ node }) => node.price.currencyCode === currencyCode
    ) || {}

  const productPrice = useFormattedPrice({
    amount: node?.price.amount || variant.priceNumber,
    currency: currencyCode || 'CAD',
  })

  return productPrice
}

export default VariantPrice
