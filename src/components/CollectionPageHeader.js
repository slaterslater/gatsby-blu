import { Link, Flex, Box, Text, Heading } from 'theme-ui'
import React, { useMemo, useState } from 'react'
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

const RevealText = ({ children, chars = 250, ...props }) => {
  const [expanded, setExpanded] = useState(false)

  const truncatedText = useMemo(() => {
    const lastSpaceIndex = children.slice(0, chars).lastIndexOf(' ')
    return children.slice(0, lastSpaceIndex)
  }, [children, chars])

  if (children.length < chars) return <Text {...props}>{children}</Text>

  if (expanded) return <Text {...props}>{children}</Text>

  return (
    <Text {...props}>
      {truncatedText}...
      <Link
        pl={1}
        role="button"
        variant="caps"
        aria-pressed={false}
        onClick={() => setExpanded(true)}
        sx={{
          cursor: 'pointer',
          fontWeight: 'medium',
          textDecoration: 'underline',
          whiteSpace: 'nowrap',
        }}
      >
        read more
      </Link>
    </Text>
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
          <RevealText
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
          </RevealText>
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
