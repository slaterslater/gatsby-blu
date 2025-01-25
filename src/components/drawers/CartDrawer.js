import React, { useContext, useEffect } from 'react'
import { Box, Flex, Text, Divider, IconButton } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { useMutation, useQuery } from 'urql'
import { StoreContext } from '../../contexts/StoreContext'
import CartLineItem from '../cart/CartLineItem'
import { OrderSummary } from '../cart/OrderSummary'
import CheckoutButton from '../cart/CheckoutButton'
import { CART_QUERY } from '../../queries/checkout'
import OrderNote from '../OrderNote'
import { useAnalytics } from '../../lib/useAnalytics'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { AuthContext } from '../../contexts/AuthContext'
import {
  AssociateCustomerWithCheckout,
  RemoveCheckoutLineItem,
} from '../../mutations/cart'
import AddOns from '../cart/AddOns'

const EmptyCart = () => (
  <Box py={5} px={4} sx={{ textAlign: 'center' }}>
    <Text sx={{ fontSize: 1 }}>You have no items in your cart.</Text>
  </Box>
)

const CartTag = ({ cart }) => {
  useAnalytics('viewCart', cart)
  return false
}

const CartDrawer = ({ onClose }) => {
  const { cartId } = useContext(StoreContext)
  const { countryCode } = useContext(CurrencyContext)
  const { accessToken } = useContext(AuthContext)

  const [, associateCustomerWithCheckout] = useMutation(
    AssociateCustomerWithCheckout
  )
  const [, removeLineItem] = useMutation(RemoveCheckoutLineItem)

  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: CART_QUERY,
    variables: { cartId, countryCode },
  })

  const refreshCheckout = () =>
    reexecuteQuery({ requestPolicy: 'network-only' })

  const { cart } = data || {}
  const lines = cart?.lines?.nodes || []

  // remove lineitems if product doesn't exist anymore
  useEffect(() => {
    lines.forEach(item => {
      if (item.variant) return
      removeLineItem({ cartId, lineIds: [item.id] })
    })
  }, [lines])

  // useEffect(() => {
  //   if ((accessToken, cartId)) {
  //     associateCustomerWithCheckout({
  //       cartId,
  //       customerAccessToken: accessToken,
  //     })
  //   }
  // }, [accessToken, cartId, associateCustomerWithCheckout])
  console.log({cart})

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
      pb={3}
    >
      {data && <CartTag cart={cart} />}
      <Box>
        <Flex p={4} sx={{ alignItems: 'center' }}>
          <Text sx={{ fontSize: 3, flex: 1 }}>Your Bag</Text>
          <IconButton p={0} ml={6} onClick={onClose}>
            <Text as={IoIosClose} size={24} />
          </IconButton>
        </Flex>
        <Divider m={0} />
      </Box>
      {data && (
        <>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {!lines.length && <EmptyCart />}
            {lines.map(item => (
              <Box key={item.id} py={4} px={3}>
                <CartLineItem item={item} onRemoveItem={refreshCheckout} />
              </Box>
            ))}
          </Box>
          <AddOns
            products={data.addons?.products.nodes || []}
            cartId={cartId}
          />
          <OrderNote initialNote={cart.note} />
          <OrderSummary
            subtotalPriceV2={cart.cost.subtotalAmount}
            totalPriceV2={cart.cost.totalAmount}
            // requiresShipping={checkout.requiresShipping}
            // shippingRates={checkout.availableShippingRates}
            note={cart.note}
            loading={fetching}
          />
          <CheckoutButton href={cart.checkoutUrl} />
        </>
      )}
    </Flex>
  )
}

export default CartDrawer
