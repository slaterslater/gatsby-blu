import { Heading, Flex, IconButton, Text, Box, Grid } from 'theme-ui'
import React, { useState } from 'react'
import { IoIosRemove, IoIosAdd } from 'react-icons/io'
import RemoteShopifyImage from './RemoteShopifyImage'
import { useProductTitle } from './ProductTitle'
import FormattedPrice from './util/FormattedPrice'

const LineItem = ({ item, children }) => {
  console.log(item)
  const sizeOption = item.variant?.selectedOptions.find(
    option => option.name === 'Size'
  )
  const optionsDescription = item.variant?.selectedOptions
    .filter(option => !['Size', 'Title'].includes(option.name))
    .map(option => option.value)
    .join(', ')

  const title = useProductTitle(item.title)

  console.info(item)

  return (
    <Grid sx={{ gridTemplateColumns: '80px 1fr', gap: 3 }} py={3} px={4}>
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
        {children}
      </Box>
    </Grid>
  )
}
export default LineItem
