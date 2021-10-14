import React, { useContext } from 'react'
import { Box, Text } from 'theme-ui'
import { CurrencyContext } from '../../contexts/CurrencyContext'

export const ProductShipping = props => {
  const { currencyCode } = useContext(CurrencyContext)

  if (currencyCode === 'CAD')
    return (
      <Box mt={-2} pb={2} sx={{ textAlign: 'center' }}>
        <Text
          as="small"
          sx={{
            fontSize: 0,
            letterSpacing: 'widest',
            textTransform: 'lowercase',
            lineHeight: '1.5em',
          }}
        >
          FREE SHIPPING WITHIN CANADA: 2-14 BUSINESS DAYS
        </Text>
      </Box>
    )
  return null
}
