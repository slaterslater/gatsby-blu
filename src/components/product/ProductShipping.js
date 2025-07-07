import React, { useContext } from 'react'
import { Box, Link, Text } from 'theme-ui'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import ProductAvailabilityButton from './ProductAvailabilityButton'

export const ProductShipping = props => {
  const { currencyCode } = useContext(CurrencyContext)
  const linkStyles = { fontWeight: '600', fontSize: 0, letterSpacing: 'widest' }
  const textStyles = {
            fontSize: 0,
            letterSpacing: 'widest',
            textTransform: 'lowercase',
            lineHeight: '1.5em',
            display: 'block',
          }

  if (currencyCode === 'CAD')
    return (
      <Box px={2} pb={2}>
        <Text
          as="small"
          sx={textStyles}
          mb={2}
        >
          <Link href="/pages/shipping/" target="_blank" sx={linkStyles}>free shipping</Link> canada-wide over $250
        </Text>
        <ProductAvailabilityButton />
        <Text
          as="small"
          sx={textStyles}
          mb={2}
        >
          see our <Link href="/pages/exchange-policy/" target="_blank" sx={linkStyles}>return and exchange policy</Link>
        </Text>
      </Box>
    )
  return null
}
