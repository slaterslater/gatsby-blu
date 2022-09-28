import { Heading, Text, Box, Grid } from 'theme-ui'
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useProductTitle } from './ProductTitle'
import { useShopifyImage } from '../hooks/shopifyImage'

const getItemOptionDescription = item => {
  const title = item.variant?.title?.toLowerCase().replace(/\s\//, ', ')
  if (!title || title === 'default title') return ''
  const fractionalSize = item.customAttributes
    .find(({ key }) => key === 'size')
    ?.value.split('')
    .pop()
  return title.replace(/,|$/, fractionalSize || '')
}

const LineItem = ({ item, imgSize, children }) => {
  const optionsDescription = getItemOptionDescription(item)

  const title = useProductTitle(item.title)

  const imageData = useShopifyImage({ image: item.variant?.image, width: 80 })

  return (
    <Grid sx={{ gridTemplateColumns: `${imgSize}px 1fr`, gap: 3 }}>
      <Box>
        {item.variant?.image ? (
          <GatsbyImage
            image={imageData}
            style={{ objectFit: 'contain' }}
            alt={item.variant.image.altText || ''}
          />
        ) : (
          <Box height={80} width={80} sx={{ bg: 'border' }} />
        )}
      </Box>
      <Box>
        <Heading variant="h1" pb={1} sx={{ flex: 1, fontSize: 1 }}>
          {title}
        </Heading>
        {optionsDescription && (
          <Box>
            <Text variant="small" sx={{ color: 'darkGray' }}>
              {optionsDescription}
            </Text>
          </Box>
        )}
        {item.customAttributes
          .filter(attribute => !['wrapping', 'size'].includes(attribute.key))
          .map(attribute => (
            <Box key={`${item.id}-${attribute.name}-${attribute.value}`}>
              <Text variant="small" sx={{ color: 'darkGray' }}>
                {attribute.key}: {attribute.value}
              </Text>
            </Box>
          ))}
        <Box pt={2}>{children}</Box>
      </Box>
    </Grid>
  )
}

LineItem.defaultProps = {
  imgSize: 80,
}
export default LineItem
