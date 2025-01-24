import { Flex, Box, Button, Checkbox, Label } from 'theme-ui'
import React, { useContext } from 'react'
import { useMutation } from 'urql'
import { IoIosCheckmark } from 'react-icons/io'
import { UpdateCartLine, UpdateCheckoutLineItem } from '../mutations/cart'
import { StoreContext } from '../contexts/StoreContext'

const WrapSeparatelyOption = ({ item }) => {
  const { cartId } = useContext(StoreContext)
  const isSeparate = !!item.attributes.find(
    attr => attr.key === 'wrapping'
  )

  const [{ fetching }, updateLineItem] = useMutation(UpdateCartLine)

  const toggleWrapping = () => {
    let attributes = item.attributes.map(attr => ({ key: attr.key, value: attr.value }))
    if (isSeparate) {
      attributes.filter(attribute => attribute.key !== 'wrapping')
    } else {
      attributes.concat({
        key: 'wrapping',
        value: 'wrap separately',
      })
    }
    
    const lines = [{
      id: item.id,
      attributes,
    }]
    updateLineItem({cartId, lines})
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
