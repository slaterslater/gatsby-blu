import React from 'react'
import { Link, Flex, Box, Text, Heading } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'

const GiftGuideHeader = ({ title, description, image }) => (
  <Flex
    mx="auto"
    sx={{
      bg: 'black',
      color: 'white',
      width: '100%',
      flexDirection: ['column-reverse', 'row'],
      alignItems: 'stretch',
    }}
  >
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: ['100%', '50%'],
        minHeight: 275,
      }}
    >
      <Heading variant="h2" as="h1">
        {title}
      </Heading>
      {description && (
        <Text
          as="p"
          mt={3}
          px={[4, 0]}
          sx={{
            display: 'block',
            fontSize: 1,
            lineHeight: 'body',
            letterSpacing: 'wider',
            width: 375,
          }}
        >
          {description}
        </Text>
      )}
    </Flex>
    {image && (
      <Flex
        sx={{
          alignItems: 'stretch',
          flex: 1,
          maxHeight: 325,
        }}
      >
        <GatsbyImage image={image} alt="" style={{ width: '100%' }} />
      </Flex>
    )}
  </Flex>
)

export default GiftGuideHeader
