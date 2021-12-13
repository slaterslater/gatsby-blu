import React, { useContext } from 'react'
import { Box, Flex, Text, Divider, IconButton, Button } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { useQuery } from 'urql'
import axios from 'axios'
import { CgHello } from 'react-icons/cg'
import { StoreContext } from '../contexts/StoreContext'
import CartLineItem from './cart/CartLineItem'
import { OrderSummary } from './cart/OrderSummary'
import CheckoutButton from './cart/CheckoutButton'
import { CHECKOUT_QUERY } from '../queries/checkout'
import OrderNote from './OrderNote'
import { useAnalytics } from '../lib/useAnalytics'

const EmptyWishlist = () => (
  <Box py={5} px={4} sx={{ textAlign: 'center' }}>
    <Text sx={{ fontSize: 1 }}>You have no items in your wishlist.</Text>
  </Box>
)

const sayHello = async () => {
  const res = await axios.post(`/api/hello`, {
    headers: { 'Content-Type': 'application/json' },
  })
  const json = await res.json()
  console.log({ json })
  return false
}

// const CartTag = ({ checkout }) => {
//   useAnalytics('viewCart', checkout)
//   return false
// }

const WishlistDrawer = ({ onClose }) => {
  const { checkoutId } = useContext(StoreContext)
  const [{ data, fetching }] = useQuery({
    query: CHECKOUT_QUERY,
    variables: { checkoutId },
  })

  const { webUrl: checkoutUrl } = data?.node || {}

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      {/* {data && <CartTag checkout={data.node} />} */}
      <Box>
        <Flex p={4} sx={{ alignItems: 'center' }}>
          <Text sx={{ fontSize: 3, flex: 1 }}>Your Wishlist</Text>
          <IconButton p={0} ml={6} onClick={onClose}>
            <Text as={IoIosClose} size={24} />
          </IconButton>
        </Flex>
        <Divider m={0} />
      </Box>
      {data && (
        <>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {!data.node.lineItems?.edges.length && <EmptyWishlist />}
            {data.node.lineItems.edges.map(({ node }) => (
              <Box key={node.id} py={4} px={3}>
                <CartLineItem item={node} />
              </Box>
            ))}
          </Box>
          {/* <Box>
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
          </Box> */}
          <Box>
            <Button
              onClick={() => {
                sayHello()
              }}
            >
              HELLO
            </Button>
          </Box>
        </>
      )}
    </Flex>
  )
}

export default WishlistDrawer
