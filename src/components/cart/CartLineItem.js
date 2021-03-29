import { Flex, IconButton, Text, Box } from 'theme-ui'
import React, { useState } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import FormattedPrice from '../util/FormattedPrice'
import LineItem from '../LineItem'

export const CartLineItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const [loading, setLoading] = useState(false)
  const updateQuantity = async delta => {
    setLoading(true)
    try {
      await onUpdateQuantity(delta)
    } catch (e) {
      console.log('update quantity error')
    }
    setLoading(false)
  }

  return (
    <LineItem item={item}>
      <Flex
        py={2}
        sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'border',
            borderRadius: 'small',
          }}
        >
          <IconButton
            disabled={loading}
            type="button"
            onClick={() => updateQuantity(-1)}
            sx={{ cursor: 'pointer' }}
          >
            <Box
              as={IoIosRemove}
              size={16}
              sx={{ transform: 'translateY(1px)' }}
            />
          </IconButton>
          <Box mx={2}>
            <Text sx={{ fontSize: 1 }}>{item.quantity}</Text>
          </Box>
          <IconButton
            disabled={loading && item.variant.available}
            type="button"
            onClick={() => updateQuantity(1)}
            sx={{ cursor: 'pointer' }}
          >
            <IoIosAdd size={16} />
          </IconButton>
        </Flex>
        <Text sx={{ fontSize: 1, fontWeight: 'heading' }}>
          <FormattedPrice priceV2={item.originalTotalPrice} />
        </Text>
      </Flex>
    </LineItem>
  )
}

export default CartLineItem
