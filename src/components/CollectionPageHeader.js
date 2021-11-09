import { Flex, Box, Text, Heading } from 'theme-ui'
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useShopifyImage } from '../hooks/shopifyImage'

const HeaderImage = ({ image }) => {
  const imageData = useShopifyImage({ image })
  return (
    <GatsbyImage
      image={imageData}
      alt={image.altText || ''}
      objectFit="cover"
    />
  )
}

const CollectionPageHeader = ({ title, description, image }) => (
  <Flex
    mx="auto"
    sx={{
      bg: 'bbBeige',
      width: '100%',
      flexDirection: ['column-reverse', 'row'],
      alignItems: 'stretch',
    }}
  >
    <Flex sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Box
        py={7}
        sx={{
          textAlign: 'center',
          width: '100%',
          maxWidth: 375,
          mx: 'auto',
        }}
      >
        <Heading variant="h2" as="h1">
          {title}
        </Heading>
        {description && (
          <Text
            as="p"
            mx="auto"
            mt={5}
            px={[4, 0]}
            sx={{
              display: 'block',
              fontSize: 1,
              lineHeight: 'body',
              letterSpacing: 'wider',
              maxWidth: `${image ? 375 : '80%'}`,
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
        )}
      </Box>
    </Flex>
    {image && (
      <Flex sx={{ alignItems: 'stretch', flex: 1, maxHeight: 400 }}>
        <HeaderImage image={image} />
      </Flex>
    )}
  </Flex>
)

export default CollectionPageHeader
