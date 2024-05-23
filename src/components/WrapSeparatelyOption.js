import { Flex, Box, Button, Checkbox, Label } from 'theme-ui'
import React, { useContext } from 'react'
import { useMutation } from 'urql'
import { IoIosCheckmark } from 'react-icons/io'
import { UpdateCheckoutLineItem } from '../mutations/cart'
import { StoreContext } from '../contexts/StoreContext'

const WrapSeparatelyOption = ({ item }) => {
  const { checkoutId } = useContext(StoreContext)
  const isSeparate = !!item.customAttributes.find(
    attr => attr.key === 'wrapping'
  )

  const [{ fetching }, updateLineItem] = useMutation(UpdateCheckoutLineItem)

  const toggleWrapping = () => {
    if (isSeparate) {
      updateLineItem({
        checkoutId,
        lineItems: [
          {
            id: item.id,
            customAttributes: item.customAttributes
              .map(attr => ({ key: attr.key, value: attr.value }))
              .filter(attribute => attribute.key !== 'wrapping'),
          },
        ],
      })
    } else {
      updateLineItem({
        checkoutId,
        lineItems: [
          {
            id: item.id,
            customAttributes: item.customAttributes
              .map(attr => ({ key: attr.key, value: attr.value }))
              .concat({
                key: 'wrapping',
                value: 'wrap separately',
              }),
          },
        ],
      })
    }
  }

  return (
    <Flex>
      <Label
        htmlFor={`${item.id}-wrapping`}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Checkbox
          id={`${item.id}-wrapping`}
          checked={isSeparate}
          onChange={toggleWrapping}
          disabled={fetching}
          sx={{ height: 20, width: 20 }}
        />
        is this a gift?
      </Label>
    </Flex>
  )
}

export default WrapSeparatelyOption
