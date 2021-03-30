import { Heading, Flex, IconButton, Text, Box, Grid } from 'theme-ui'
import React, { useState } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import RemoteShopifyImage from './RemoteShopifyImage'
import { useProductTitle } from './ProductTitle'
import LineItemPrice from './LineItemPrice'

const LineItem = ({ item, children }) => {
  const sizeOption = item.variant?.selectedOptions.find(
    option => option.name === 'Size'
  )
  const optionsDescription = item.variant?.selectedOptions
    .filter(option => !['Size', 'Title'].includes(option.name))
    .map(option => option.value)
    .join(', ')

  const title = useProductTitle(item.title)

  return (
    <Grid sx={{ gridTemplateColumns: '80px 1fr', gap: 3 }}>
      {item.variant ? (
        <RemoteShopifyImage
          height={80}
          width={80}
          originalSrc={
            item.variant?.image.src || item.variant?.image.originalSrc
          }
        />
      ) : (
        <Box height={80} width={80} sx={{ bg: 'border' }} />
      )}
      <Box>
        <Heading sx={{ flex: 1, fontSize: 2 }}>{title}</Heading>
        {sizeOption && (
          <Box>
            <Text sx={{ color: 'darkGray', fontWeight: '' }}>
              Size: {sizeOption.value}
            </Text>
          </Box>
        )}
        {optionsDescription && (
          <Box>
            <Text sx={{ color: 'darkGray' }}>{optionsDescription}</Text>
          </Box>
        )}
        <Box>{children}</Box>
      </Box>
    </Grid>
  )
}
export default LineItem
