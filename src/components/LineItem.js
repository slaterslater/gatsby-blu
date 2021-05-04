import { Heading, IconButton, Text, Box, Grid } from 'theme-ui'
import React from 'react'
import RemoteShopifyImage from './RemoteShopifyImage'
import { useProductTitle } from './ProductTitle'

const LineItem = ({ item, imgSize, children }) => {
  const optionsDescription = item.variant?.title.replace(' /', ',')

  const title = useProductTitle(item.title)

  return (
    <Grid sx={{ gridTemplateColumns: `${imgSize}px 1fr`, gap: 3 }}>
      {item.variant ? (
        <RemoteShopifyImage
          sizes={[80]}
          originalSrc={
            item.variant?.image.src || item.variant?.image.originalSrc
          }
        />
      ) : (
        <Box height={80} width={80} sx={{ bg: 'border' }} />
      )}
      <Box>
        <Heading sx={{ flex: 1, fontSize: 2 }}>{title}</Heading>
        {optionsDescription && (
          <Box>
            <Text sx={{ color: 'darkGray' }}>{optionsDescription}</Text>
          </Box>
        )}
        {item.customAttributes.map(attribute => (
          <Box key={`${item.id}-${attribute.name}-${attribute.value}`}>
            <Text sx={{ color: 'darkGray' }}>
              {attribute.key}: {attribute.value}
            </Text>
          </Box>
        ))}
        <Box pt={1}>{children}</Box>
      </Box>
    </Grid>
  )
}

LineItem.defaultProps = {
  imgSize: 80,
}
export default LineItem
