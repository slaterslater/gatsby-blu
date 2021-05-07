import React from 'react'
import { Flex, Box, Text } from 'theme-ui'
import { AiFillInfoCircle } from 'react-icons/ai'

export const CalloutBox = ({
  icon: Icon,
  title,
  description,
  bg,
  color,
  ...props
}) => (
  <Box {...props}>
    <Flex p={4} sx={{ bg, color, alignItems: 'flex-start' }}>
      <Box as={Icon} size={28} color={color} mr={2} sx={{ flexShrink: 0 }} />
      <Box ml={2}>
        <Text as="h4" pb={1} variant="caps">
          {title}
        </Text>
        <Text as="p" pr={4} sx={{ color: 'darkerGray', fontSize: 0 }}>
          {description}
        </Text>
      </Box>
    </Flex>
  </Box>
)

const ProductCTACallout = ({ tags, ...props }) => {
  if (tags.includes('made-to-order')) {
    return (
      <CalloutBox
        icon={AiFillInfoCircle}
        title="This Piece is a Special Order"
        description="please allow 6 - 8 weeks for production and delivery"
        bg="cream"
        {...props}
      />
    )
  }
  return null
}

export default ProductCTACallout
