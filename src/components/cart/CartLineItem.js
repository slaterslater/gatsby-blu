import { Flex, IconButton, Text, Box } from 'theme-ui'
import React, { useContext } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import { useMutation } from 'urql'
import FormattedPrice from '../util/FormattedPrice'
import LineItem from '../LineItem'
import LineItemPrice from '../LineItemPrice'
import { UPDATE_LINE_ITEM } from '../../mutations/cart'
import { StoreContext } from '../../contexts/StoreContext'

const CartLineItem = ({ onRemoveItem, item, imgSize }) => {
  const { checkoutId } = useContext(StoreContext)
  const [updateLineItemResult, updateLineItem] = useMutation(UPDATE_LINE_ITEM)

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
      <Text>
        <LineItemPrice
          originalTotalPrice={{
            ...item.variant.priceV2,
            amount: Number(item.variant.priceV2.amount) * item.quantity,
          }}
        />
      </Text>
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
              updateLineItemResult.fetching || !item.variant.availableForSale
            }
            type="button"
            onClick={() => updateQuantity(1)}
            sx={{ cursor: 'pointer' }}
          >
            <IoIosAdd size={16} />
          </IconButton>
        </Flex>
      </Flex>
    </LineItem>
  )
}

export default CartLineItem
