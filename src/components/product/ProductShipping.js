import React, { useContext } from 'react'
import { Box, Text } from 'theme-ui'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import ProductAvailabilityButton from './ProductAvailabilityButton'

export const ProductShipping = props => {
  const { currencyCode } = useContext(CurrencyContext)

  if (currencyCode === 'CAD')
    return (
      <Box px={2} pb={2}>
        <Text
          as="small"
          sx={{
            fontSize: 0,
            letterSpacing: 'widest',
            textTransform: 'lowercase',
            lineHeight: '1.5em',
            display: 'block',
          }}
          mb={3}
        >
          free shipping canada-wide over $75
        </Text>
        <ProductAvailabilityButton />
      </Box>
    )
  return null
}
