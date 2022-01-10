// components/consultation/FAQ.js

import { Heading, Flex, Text } from 'theme-ui'
import React from 'react'
import PropTypes from 'prop-types'

const FAQ = ({ question, answer }) => (
  <Flex
    mx={[0, 7]}
    py={6}
    px={5}
    sx={{
      flexDirection: 'column',
      borderTop: '1px solid',
      borderColor: 'border',
    }}
  >
    <Heading
      as="h3"
      variant="caps"
      pb={[6, 4]}
      // py={6}
      // mx={['auto', 3]}
      sx={{ fontSize: 1, lineHeight: 'body' }}
    >
      {question}
    </Heading>
    <Text
      as="p"
      mx="auto"
      sx={{
        fontSize: 1,
        lineHeight: 'body',
        letterSpacing: 'wider',
        maxWidth: 650,
      }}
    >
      {answer}
    </Text>
  </Flex>
)

FAQ.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

export default FAQ
