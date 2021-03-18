import { Heading, Flex, IconButton, Text, Box, Grid } from 'theme-ui'
import React, { useState } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import RemoteShopifyImage from '../RemoteShopifyImage'
import { useProductTitle } from '../ProductTitle'
import FormattedPrice from '../util/FormattedPrice'

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

  console.log(item.variant)

  return (
    <Grid sx={{ gridTemplateColumns: '80px 1fr', gap: 3 }} py={3} px={4}>
      <RemoteShopifyImage
        height={80}
        width={80}
        originalSrc={item.variant.image.src}
      />
      <Box>
        <Heading sx={{ flex: 1, fontSize: 2 }}>{title}</Heading>
        {sizeOption && (
          <Box>
            <Text sx={{ fontSize: 1, color: 'darkGray', fontWeight: '' }}>
              Size: {sizeOption.value}
            </Text>
          </Box>
        )}
        {optionsDescription && (
          <Box>
            <Text sx={{ fontSize: 1, color: 'darkGray' }}>
              {optionsDescription}
            </Text>
          </Box>
        )}
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
            <FormattedPrice
              amount={item.quantity * item.variant.priceV2.amount}
              currency={item.variant.priceV2.currencyCode}
            />
          </Text>
        </Flex>
      </Box>
    </Grid>
  )
}

export default LineItem
