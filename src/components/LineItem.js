import { Heading, IconButton, Text, Box, Grid } from 'theme-ui'
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useProductTitle } from './ProductTitle'
import { getShopifyImage } from '../lib/get-shopify-image'

const LineItem = ({ item, imgSize, children }) => {
  const optionsDescription = item.variant?.title?.replace(' /', ',')

  const title = useProductTitle(item.title)

  const imageData = item.variant?.image
    ? getShopifyImage({ image: item.variant.image, width: 80 })
    : null

  return (
    <Grid sx={{ gridTemplateColumns: `${imgSize}px 1fr`, gap: 3 }}>
      <Box>
        {item.variant?.image ? (
          <GatsbyImage
            image={imageData}
            style={{ objectFit: 'contain' }}
            alt={item.variant.image.altText}
          />
        ) : (
          <Box height={80} width={80} sx={{ bg: 'border' }} />
        )}
      </Box>
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
