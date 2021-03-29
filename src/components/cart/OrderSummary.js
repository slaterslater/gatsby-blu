import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text, Divider, Grid } from 'theme-ui'
import { StoreContext } from '../../contexts/StoreContext'
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

export const OrderSummary = ({
  loading,
  subtotalPriceV2,
  requiresShipping,
  shippingPriceV2,
  totalPriceV2,
}) => (
  <MotionBox p={4} animate={{ opacity: loading ? 0.5 : 1 }}>
    <Divider my={4} />
    <Grid sx={{ gridAutoFlow: 'row', gap: 2 }}>
      <SummaryItem term="subtotal">
        {subtotalPriceV2 && (
          <FormattedPrice
            amount={subtotalPriceV2.amount}
            currency={subtotalPriceV2.currencyCode}
          />
        )}
      </SummaryItem>
      {requiresShipping && (
        <SummaryItem term="estimated shipping">free</SummaryItem>
      )}
      <SummaryItem term="estimated total" bold>
        {totalPriceV2 && (
          <FormattedPrice
            amount={totalPriceV2.amount}
            currency={totalPriceV2.currencyCode}
          />
        )}
      </SummaryItem>
    </Grid>
  </MotionBox>
)
OrderSummary.propTypes = {
  loading: PropTypes.bool.isRequired,
  subtotalPriceV2: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  totalPriceV2: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  shippingPriceV2: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
  }),
  requiresShipping: PropTypes.bool.isRequired,
}
OrderSummary.defaultProps = { shippingPriceV2: null }

export const CartOrderSummary = () => {
  const {
    checkout: {
      subtotalPriceV2,
      shippingPriceV2,
      totalPriceV2,
      requiresShipping,
    },
    loading,
  } = useContext(StoreContext)

  return (
    <OrderSummary
      {...{
        subtotalPriceV2,
        shippingPriceV2,
        totalPriceV2,
        loading,
        requiresShipping,
      }}
    />
  )
}

export default CartOrderSummary
