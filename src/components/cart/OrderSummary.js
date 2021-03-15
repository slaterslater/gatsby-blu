import React, { useContext, useEffect } from 'react'
import { Heading, Box, Flex, Text, Divider, Grid } from 'theme-ui'
import { useImmer } from 'use-immer'
import { StoreContext } from '../../contexts/StoreContext'
import { useFormattedPrice } from '../../hooks/utils'
import FormattedPrice from '../util/FormattedPrice'
import MotionBox from '../util/MotionBox'

const SummaryItem = ({ bold, term, children }) => (
  <Flex>
    <Box sx={{ flex: 1 }}>
      <Text sx={{ fontSize: 1, fontWeight: bold && 'heading' }}>{term}</Text>
    </Box>
    <Box>
      <Text sx={{ fontSize: 1, fontWeight: bold && 'heading' }}>
        {children}
      </Text>
    </Box>
  </Flex>
)

const OrderSummary = props => {
  const { checkout, loading } = useContext(StoreContext)

  return (
    <MotionBox p={4} animate={{ opacity: loading ? 0.5 : 1 }}>
      <Divider my={4} />
      <Grid sx={{ gridAutoFlow: 'row', gap: 2 }}>
        <SummaryItem term="subtotal">
          {checkout.subtotalPriceV2 && (
            <FormattedPrice
              amount={checkout.subtotalPriceV2.amount}
              currency={checkout.subtotalPriceV2.currencyCode}
            />
          )}
        </SummaryItem>
        {checkout.requiresShipping && (
          <SummaryItem term="estimated shipping">free</SummaryItem>
        )}
        <SummaryItem term="estimated total" bold>
          {checkout.totalPriceV2 && (
            <FormattedPrice
              amount={checkout.totalPriceV2.amount}
              currency={checkout.totalPriceV2.currencyCode}
            />
          )}
        </SummaryItem>
      </Grid>
    </MotionBox>
  )
}

export default OrderSummary
