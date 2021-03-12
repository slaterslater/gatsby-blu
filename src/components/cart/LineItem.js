import { Flex, IconButton, Text, Box, Grid } from 'theme-ui'
import React from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import RemoteShopifyImage from '../RemoteShopifyImage'
import { useProductTitle } from '../ProductTitle'

const LineItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const sizeOption = item.variant.selectedOptions.find(
    option => option.name === 'Size'
  )
  const optionsDescription = item.variant.selectedOptions
    .filter(option => !['Size', 'Title'].includes(option.name))
    .map(option => option.value)
    .join(', ')

  const title = useProductTitle(item.title)

  return (
    <Grid sx={{ gridTemplateColumns: '80px 1fr', gap: 3 }} py={3} px={4}>
      <RemoteShopifyImage
        height={80}
        width={80}
        originalSrc={item.variant.image.src}
      />
      <Box>
        <Box>
          <Text sx={{ fontSize: 1 }}>{title}</Text>
        </Box>
        {sizeOption && (
          <Box>
            <Text sx={{ fontSize: 1 }}>Size: {sizeOption.value}</Text>
          </Box>
        )}
        {optionsDescription && <Box>{optionsDescription}</Box>}
        <Flex sx={{ alignItems: 'center' }}>
          <IconButton
            type="button"
            onClick={() => onUpdateQuantity(-1)}
            sx={{ cursor: 'pointer' }}
          >
            <IoIosRemove size={16} />
          </IconButton>
          <Box mx={2}>
            <Text sx={{ fontSize: 1 }}>{item.quantity}</Text>
          </Box>
          <IconButton
            type="button"
            onClick={() => onUpdateQuantity(1)}
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
