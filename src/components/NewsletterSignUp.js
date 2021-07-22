import React from 'react'
import { Heading, Box, Flex, Text } from 'theme-ui'
import NewsletterForm from './NewsletterForm'

const NewsletterSignUp = props => (
  <Box p={4} sx={{ bg: 'cream' }}>
    <Flex sx={{ flexDirection: ['column', 'row'] }}>
      <Box>
        <Heading>subscribe</Heading>
        <Text>
          sign up today for the latest news, updates, and collection launches.
        </Text>
      </Box>
      <NewsletterForm />
    </Flex>
  </Box>
)

export default NewsletterSignUp
