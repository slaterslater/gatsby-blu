import React from 'react'
import { Flex, Box, Text } from 'theme-ui'
import { AiFillInfoCircle } from 'react-icons/ai'

const CalloutBox = ({ icon: Icon, title, description, bg, color }) => (
  <Flex p={4} sx={{ bg, color }}>
    <Icon size={24} color={color} />
    <Box>
      <Text as="h4" variant="caps">
        {title}
      </Text>
      <Text as="p">{description}</Text>
    </Box>
  </Flex>
)

const ProductCTACallout = ({ tags }) => {
  if (tags.includes('made-to-order')) {
    return (
      <CalloutBox
        icon={AiFillInfoCircle}
        title="This Piece is a Special Order"
        description="shipping times are delayed"
      />
    )
  }
  return null
}

export default ProductCTACallout
