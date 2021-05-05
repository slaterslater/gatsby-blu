import React, { useContext } from 'react'
import { Grid, Box, Flex, Text, Divider, IconButton, Button } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import store from 'store'
import { useQuery } from 'urql'
import { StoreContext } from '../contexts/StoreContext'
import CartLineItem from './cart/CartLineItem'
import { OrderSummary } from './cart/OrderSummary'
import CheckoutButton from './cart/CheckoutButton'
import { CHECKOUT_QUERY } from '../queries/checkout'

const EmptyCart = () => (
  <Box py={5} px={4} sx={{ textAlign: 'center' }}>
    <Text sx={{ fontSize: 1 }}>You have no items in your cart.</Text>
  </Box>
)

const CartDrawer = ({ onClose }) => {
  const { checkoutId } = useContext(StoreContext)
  const [{ data, fetching }] = useQuery({
    query: CHECKOUT_QUERY,
    variables: { checkoutId },
  })

  return (
    <Grid
      sx={{
        gridTemplateRows: 'max-content 1fr max-content',
        height: '100vh',
        gap: 0,
      }}
    >
      <Box>
        <Flex p={4} sx={{ alignItems: 'center' }}>
          <Text sx={{ fontSize: 3, flex: 1 }}>Your Cart</Text>
          <IconButton p={0} ml={6} onClick={onClose}>
            <Text as={IoIosClose} size={24} />
          </IconButton>
        </Flex>
      </Box>
      {data && (
        <>
          <Box>
            <Divider mb={4} mt={0} />
            {!data.node.lineItems?.edges.length && <EmptyCart />}
            {data.node.lineItems.edges.map(({ node }) => (
              <Box key={node.id} px={3} py={2}>
                <CartLineItem item={node} />
              </Box>
            ))}
          </Box>
          <Box>
            <OrderSummary
              subtotalPriceV2={data.node.subtotalPriceV2}
              totalPriceV2={data.node.totalPriceV2}
              requiresShipping={data.node.requiresShipping}
              shippingRates={data.node.availableShippingRates}
              loading={fetching}
            />
            <CheckoutButton />
          </Box>
        </>
      )}
    </Grid>
  )
}

export default CartDrawer
