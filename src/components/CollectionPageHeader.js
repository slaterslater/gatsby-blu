import { Link, Flex, Box, Text, Heading } from 'theme-ui'
import React, { useMemo, useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'

// const ShopifyHeaderImage = ({ image, altText }) => {
//   const imageData = useShopifyImage({ image })
//   return (
//     <GatsbyImage
//       image={imageData}
//       alt={image.altText || ''}
//       objectFit="cover"
//     />
//   )
// }

const DescriptionHtml = styled.div`
  padding: 0 8px;
  margin-top: 16px;
  color: var(--theme-ui-colors-black);
  font-size: 12px;
  font-weight: medium;
  line-height: 2.5;
  text-align: center;
  letter-spacing: 0.1em;

  h3,
  img,
  ul,
  li {
    display: none;
  }
  p,
  div,
  span {
    font-family: var(--theme-ui-font-body);
    line-height: 2.5;
    margin: 0 0 1em;
    letter-spacing: 0.1em;
  }
  a {
    color: var(--theme-ui-colors-black);
    color: #14191f;
    text-decoration: none;
    font-weight: 550;
  }
`

const HeaderImage = ({ image, altText }) => {
  // gatsby image data returns images, shopify images do not
  switch (true) {
    case !!image.images:
      return <GatsbyImage image={image} alt={altText || ''} objectFit="cover" />
    case !!image.gatsbyImageData:
      return (
        <GatsbyImage
          image={image.gatsbyImageData}
          alt={altText || ''}
          objectFit="cover"
        />
      )
    default:
      return null
  }
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

const CollectionPageHeader = ({
  title,
  description,
  descriptionHtml,
  image,
  children,
}) => (
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
          maxWidth: 450,
          // maxWidth: 375,
          mx: 'auto',
        }}
      >
        <Heading variant="h2" as="h1">
          {title}
        </Heading>
        {descriptionHtml && (
          <DescriptionHtml
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}
        {!descriptionHtml && description && (
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
    {children && (
      <Flex sx={{ alignItems: 'stretch', flex: 1, maxHeight: 400 }}>
        {children}
      </Flex>
    )}
  </Flex>
)

export default CollectionPageHeader
