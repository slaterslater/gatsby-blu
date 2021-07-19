import { Flex, IconButton, Text, Box, Label } from 'theme-ui'
import React, { useContext } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import { FiTrash } from 'react-icons/fi'
import { useMutation } from 'urql'
import LineItem from '../LineItem'
import LineItemPrice from '../LineItemPrice'
import {
  UpdateCheckoutLineItem,
  RemoveCheckoutLineItem,
} from '../../mutations/cart'
import { StoreContext } from '../../contexts/StoreContext'
import { useGtagRemoveFromCart } from '../../hooks/gtag'
import WrapSeparatelyOption from '../WrapSeparatelyOption'

const CartLineItem = ({ onRemoveItem, item, imgSize }) => {
  const { checkoutId } = useContext(StoreContext)
  const [updateLineItemResult, updateLineItem] = useMutation(
    UpdateCheckoutLineItem
  )
  const [removeResult, removeLineItem] = useMutation(RemoveCheckoutLineItem)

  const gtagRemoveFromCart = useGtagRemoveFromCart(item)

  const updateQuantity = async delta => {
    try {
      await updateLineItem({
        checkoutId,
        lineItems: [{ id: item.id, quantity: item.quantity + delta }],
      })
    } catch (e) {
      console.log('update quantity error')
    }
  }

  return (
    <LineItem item={item} imgSize={imgSize}>
      <Box sx={{ order: 1 }}>
        <Text as="p">
          <LineItemPrice item={item} />
        </Text>
      </Box>
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
            type="button"
            onClick={() => updateQuantity(-1)}
            sx={{ cursor: 'pointer', '&:disabled': { color: 'red' } }}
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
            disabled={
              !item.variant ||
              updateLineItemResult.fetching ||
              !item.variant.availableForSale
            }
            type="button"
            onClick={() => updateQuantity(1)}
            sx={{ cursor: 'pointer' }}
          >
            <IoIosAdd size={16} />
          </IconButton>
        </Flex>
        <IconButton
          type="button"
          onClick={() => {
            gtagRemoveFromCart(item)
            removeLineItem({ checkoutId, lineItemIds: [item.id] })
          }}
        >
          <FiTrash />
        </IconButton>
      </Flex>
      <Box pb={5}>
        <WrapSeparatelyOption item={item} />
      </Box>
    </LineItem>
  )
}

export default CartLineItem
