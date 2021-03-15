import { Flex, IconButton, Text, Box, Grid } from 'theme-ui'
import React, { useState } from 'react'
import { IoIosRemove, IoIosAdd, IoIosClose } from 'react-icons/io'
import RemoteShopifyImage from '../RemoteShopifyImage'
import { useProductTitle } from '../ProductTitle'

const LineItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const [loading, setLoading] = useState(false)
  const sizeOption = item.variant.selectedOptions.find(
    option => option.name === 'Size'
  )
  const optionsDescription = item.variant.selectedOptions
    .filter(option => !['Size', 'Title'].includes(option.name))
    .map(option => option.value)
    .join(', ')

  const title = useProductTitle(item.title)

  const updateQuantity = async delta => {
    setLoading(true)
    try {
      await onUpdateQuantity(delta)
    } catch (e) {}
    setLoading(false)
  }

  return (
    <Grid sx={{ gridTemplateColumns: '80px 1fr', gap: 3 }} py={3} px={4}>
      <RemoteShopifyImage
        height={80}
        width={80}
        originalSrc={item.variant.image.src}
      />
      <Box>
        <Flex sx={{ alignItems: 'center' }}>
          <Text sx={{ flex: 1, fontSize: 2 }}>{title}</Text>
          <IconButton
            type="button"
            onClick={onRemoveItem}
            sx={{ height: 24, width: 24, fontSize: 4 }}
          >
            <IoIosClose />
          </IconButton>
        </Flex>
        {sizeOption && (
          <Box>
            <Text sx={{ fontSize: 1 }}>Size: {sizeOption.value}</Text>
          </Box>
        )}
        {optionsDescription && <Box>{optionsDescription}</Box>}
        <Flex sx={{ alignItems: 'center' }}>
          <IconButton
            disabled={loading}
            type="button"
            onClick={() => updateQuantity(-1)}
            sx={{ cursor: 'pointer' }}
          >
            <IoIosRemove size={16} />
          </IconButton>
          <Box mx={2}>
            <Text sx={{ fontSize: 1 }}>{item.quantity}</Text>
          </Box>
          <IconButton
            disabled={loading}
            type="button"
            onClick={() => updateQuantity(1)}
            sx={{ cursor: 'pointer' }}
          >
            <IoIosAdd size={16} />
          </IconButton>
        </Flex>
        price remove from cart
      </Box>
    </Grid>
  )
}

export default LineItem
