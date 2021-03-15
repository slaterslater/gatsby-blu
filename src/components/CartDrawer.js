import React, { useContext } from 'react'
import { Grid, Box, Flex, Text, Divider, IconButton, Button } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { StoreContext } from '../contexts/StoreContext'
import LineItem from './cart/LineItem'
import OrderSummary from './cart/OrderSummary'
import CheckoutButton from './cart/CheckoutButton'

const EmptyCart = () => (
  <Box py={5} px={4} sx={{ textAlign: 'center' }}>
    <Text sx={{ fontSize: 1 }}>You have no items in your cart.</Text>
    <Divider m={5} />
    <Text sx={{ fontSize: 1 }}>Sign Up for 10% off your first order*</Text>
  </Box>
)

const CartDrawer = ({ onClose }) => {
  const { checkout, updateLineItem, removeLineItem } = useContext(StoreContext)
  return (
    <Grid
      sx={{
        gridTemplateRows: 'max-content 1fr max-content',
        height: '100vh',
        gap: 0,
      }}
    >
      <Box>
        <Flex p={4}>
          <Text sx={{ fontSize: 4, flex: 1 }}>Your Cart</Text>
          <IconButton p={0} ml={6} onClick={onClose}>
            <Text as={IoIosClose} size={36} />
          </IconButton>
        </Flex>
      </Box>
      <Box>
        <Divider mb={4} />
        {!checkout.lineItems.length && <EmptyCart />}
        {checkout?.lineItems.map(item => (
          <LineItem
            item={item}
            key={item.id}
            onUpdateQuantity={delta =>
              updateLineItem({
                lineItemId: item.id,
                quantity: item.quantity + delta,
              })
            }
            onRemoveItem={() => removeLineItem(item.id)}
          />
        ))}
      </Box>
      <Box>
        <OrderSummary />
        <CheckoutButton />
      </Box>
    </Grid>
  )
}

export default CartDrawer
