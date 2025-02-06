import { Flex, Checkbox, Label } from 'theme-ui'
import React, { useContext } from 'react'
import { useMutation } from 'urql'
import { UpdateCartLine } from '../mutations/cart'
import { StoreContext } from '../contexts/StoreContext'

const WrapSeparatelyOption = ({ item }) => {
  const { cartId } = useContext(StoreContext)
  const [{ fetching }, updateLineItem] = useMutation(UpdateCartLine)

  const isGift = !!item.attributes.find(
    attr => attr.key === 'wrapping'
  )

  const toggleWrapping = () => {
    let {attributes} = item
    
    if (isGift) {
      attributes = attributes.filter(attr => attr.key !== 'wrapping')
    } else {
      attributes.push({
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
          checked={isGift}
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
