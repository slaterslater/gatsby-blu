import React, { useContext } from 'react'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import FormattedPrice from '../FormattedPrice'

const VariantPrice = ({ variant }) => {
  const { currencyCode } = useContext(CurrencyContext)

  const presentmentPrice =
    variant.presentmentPrices.edges.find(
      ({ node }) => node.price.currencyCode === currencyCode
    ) || {}

  return <FormattedPrice priceV2={presentmentPrice.node.price} />
}

export default VariantPrice
