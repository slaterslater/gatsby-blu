import React from 'react'
import { Box, Flex, Text, Divider, IconButton } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'

const EmptyCart = () => (
  <Box py={5} px={4} sx={{ textAlign: 'center' }}>
    <Text sx={{ fontSize: 1 }}>You have no items in your cart.</Text>
    <Divider m={5} />
    <Text sx={{ fontSize: 1 }}>Sign Up for 10% off your first order*</Text>
  </Box>
)

const CartDrawer = ({ onClose }) => (
  <Box>
    <Flex p={4}>
      <Text sx={{ fontSize: 4, fontWeight: 'heading', flex: 1 }}>
        Your Cart
      </Text>
      <IconButton p={0} ml={6} onClick={onClose}>
        <Text as={IoIosClose} size={36} />
      </IconButton>
    </Flex>
    <Divider mb={4} />
    <EmptyCart />
  </Box>
)

export default CartDrawer
