import { Box, Flex, Text, Badge, Avatar } from 'theme-ui'
import React from 'react'
import FormattedDate from '../FormattedDate'

const ProductQuestion = ({ content, asker, createdAt }) => (
  <Box>
    <Flex>
      <Box>
        <Avatar src={asker.socialImage} />
      </Box>
      <Box>
        <Flex pb={2}>
          <Text mr={4}>{asker.displayName}</Text>
          <Badge>Verified Buyer</Badge>
          <Text ml="auto">
            <FormattedDate iso={createdAt} />
          </Text>
        </Flex>
        <Text>{content}</Text>
      </Box>
    </Flex>
  </Box>
)

export default ProductQuestion
