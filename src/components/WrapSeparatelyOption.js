import { Flex, Box, Button } from 'theme-ui'
import React, { useContext } from 'react'
import { useMutation } from 'urql'
import { IoIosCheckmark } from 'react-icons/io'
import { UpdateCheckoutLineItem } from '../mutations/cart'
import { StoreContext } from '../contexts/StoreContext'

const WrapSeparatelyOption = ({ item }) => {
  const { checkoutId } = useContext(StoreContext)
  const isSeparate = item.customAttributes.find(attr => attr.key === 'wrapping')
  const [{ fetching }, updateLineItem] = useMutation(UpdateCheckoutLineItem)
  // console.log(item)

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
      <Button
        type="button"
        p={0}
        sx={{
          fontSize: 0,
          bg: 'transparent',
          textTransform: 'lowercase',
          letterSpacing: 'normal',
          color: 'darkGray',
          cursor: 'pointer',
          transition: 'opacity .3s',
          fontFamily: 'body',
          '&:disabled': { opacity: 0.7 },
        }}
        onClick={toggleWrapping}
        disabled={fetching}
      >
        wrap separately
      </Button>
      <Box ml={1} sx={{ width: 18, height: 18 }}>
        {isSeparate && <IoIosCheckmark size={18} />}
      </Box>
    </Flex>
  )
}

export default WrapSeparatelyOption
