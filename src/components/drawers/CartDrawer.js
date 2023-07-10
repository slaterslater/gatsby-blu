import React, { useContext, useEffect } from 'react'
import { Box, Flex, Text, Divider, IconButton, Button } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { useMutation, useQuery } from 'urql'
import { StoreContext } from '../../contexts/StoreContext'
import CartLineItem from '../cart/CartLineItem'
import { OrderSummary } from '../cart/OrderSummary'
import CheckoutButton from '../cart/CheckoutButton'
import { CHECKOUT_QUERY } from '../../queries/checkout'
import OrderNote from '../OrderNote'
import { useAnalytics } from '../../lib/useAnalytics'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { AuthContext } from '../../contexts/AuthContext'
import {
  AssociateCustomerWithCheckout,
  RemoveCheckoutLineItem,
} from '../../mutations/cart'

const EmptyCart = () => (
  <Box py={5} px={4} sx={{ textAlign: 'center' }}>
    <Text sx={{ fontSize: 1 }}>You have no items in your cart.</Text>
  </Box>
)

const CartTag = ({ checkout }) => {
  useAnalytics('viewCart', checkout)
  return false
}

const CartDrawer = ({ onClose }) => {
  const { checkoutId } = useContext(StoreContext)
  const { countryCode } = useContext(CurrencyContext)
  const { accessToken } = useContext(AuthContext)

  const [{ data, fetching }] = useQuery({
    query: CHECKOUT_QUERY,
    variables: { checkoutId, countryCode },
  })

  const { webUrl: checkoutUrl } = data?.node || {}
  const lineItems = data?.node.lineItems?.edges || []

  const [, associateCustomerWithCheckout] = useMutation(
    AssociateCustomerWithCheckout
  )
  const [, removeLineItem] = useMutation(RemoveCheckoutLineItem)

  useEffect(() => {
    if ((accessToken, checkoutId)) {
      associateCustomerWithCheckout({
        checkoutId,
        customerAccessToken: accessToken,
      })
    }
  }, [accessToken, checkoutId, associateCustomerWithCheckout])

  // remove items that are no longer for sale
  useEffect(() => {
    lineItems.forEach(item => {
      if (item.node.variant) return
      removeLineItem({ checkoutId, lineItemIds: [item.node.id] })
    })
  }, [lineItems])

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {data && <CartTag checkout={data.node} />}
      <Box>
        <Flex p={4} sx={{ alignItems: 'center' }}>
          <Text sx={{ fontSize: 3, flex: 1 }}>Your Cart</Text>
          <IconButton p={0} ml={6} onClick={onClose}>
            <Text as={IoIosClose} size={24} />
          </IconButton>
        </Flex>
        <Divider m={0} />
      </Box>
      {data && (
        <>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {!lineItems.length && <EmptyCart />}
            {lineItems.map(({ node }) => (
              <Box key={node.id} py={4} px={3}>
                <CartLineItem item={node} />
              </Box>
            ))}
          </Box>
          <Box>
            <OrderNote initialNote={data.node.note} />
            <OrderSummary
              subtotalPriceV2={data.node.subtotalPriceV2}
              totalPriceV2={data.node.totalPriceV2}
              requiresShipping={data.node.requiresShipping}
              shippingRates={data.node.availableShippingRates}
              loading={fetching}
              note={data.node.note}
            />
            <CheckoutButton href={checkoutUrl} />
          </Box>
        </>
      )}
    </Flex>
  )
}

export default CartDrawer
