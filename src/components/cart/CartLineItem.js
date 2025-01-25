import { Flex, IconButton, Text, Box } from 'theme-ui'
import React, { useContext } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import { FiTrash } from 'react-icons/fi'
import { useMutation, useQuery } from 'urql'
import LineItem from '../LineItem'
import LineItemPrice from '../LineItemPrice'
import {
  AddCheckoutLineItem,
  RemoveCartLine,
  RemoveCheckoutLineItem,
  UpdateCartLine,
  UpdateCheckoutLineItem,
} from '../../mutations/cart'
import { StoreContext } from '../../contexts/StoreContext'
import WrapSeparatelyOption from '../WrapSeparatelyOption'
import { useSendAnalytics } from '../../lib/useAnalytics'
import LineItemUpgrade from './LineItemUpgrade'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { UPGRADE_QUERY } from '../../queries/checkout'

const CartLineItem = ({ onRemoveItem, item, imgSize }) => {
  const { cartId } = useContext(StoreContext)
  const { countryCode } = useContext(CurrencyContext)
  const sendAnalytics = useSendAnalytics('removeFromCart')

  const [, addCheckoutLineItem] = useMutation(AddCheckoutLineItem)
  const [, removeLineItem] = useMutation(RemoveCartLine)
  const [updateLineItemResult, updateLineItem] = useMutation(
    UpdateCartLine
  )

  const { id, quantity, merchandise, discountAllocations } = item
  const merchandiseId = merchandise.upgrade?.id

  const [{ data }] = useQuery({
    query: UPGRADE_QUERY,
    variables: { id: merchandiseId, countryCode },
  })

  const { upgrade } = data || {}

  const updateQuantity = async delta => {
    try {
      await updateLineItem({
        cartId,
        lines: [{ id, quantity: quantity + delta }],
      })
    } catch (e) {
      console.log('update quantity error')
    }
  }

  const repalaceItemWithUpgrade = async () => {
    const lineItems = [{ quantity, variantId }]
    await addCheckoutLineItem({
      checkoutId,
      lineItems,
    })
    await removeLineItem({ checkoutId, lineItemIds: [id] })
    onRemoveItem()
    // do something with analytics?
  }

  return (
    <>
      <LineItem item={item} imgSize={imgSize}>
        <Box sx={{ order: 1 }}>
          <Text>
            <LineItemPrice
              quantity={quantity}
              originalPrice={item.merchandise.price}
              discounts={discountAllocations}
            />
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
              <Text sx={{ fontSize: 1 }}>{quantity}</Text>
            </Box>
            <IconButton
              disabled={
                !merchandise ||
                updateLineItemResult.fetching ||
                !merchandise.availableForSale
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
              sendAnalytics(item)
              removeLineItem({ cartId, lineIds: [item.id] })
              // updateQuantity(-1 * quantity)
            }}
            sx={{ cursor: 'pointer' }}
          >
            <FiTrash />
          </IconButton>
        </Flex>
        <WrapSeparatelyOption item={item} />
      </LineItem>
      {upgrade?.availableForSale && (
        <LineItemUpgrade
          currentAmount={item.variant.priceV2.amount}
          upgrade={upgrade}
          repalaceItemWithUpgrade={repalaceItemWithUpgrade}
        />
      )}
    </>
  )
}

export default CartLineItem
