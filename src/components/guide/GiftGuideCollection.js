import React from 'react'
import { Link, Flex, Box, Text, Heading, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

const GiftGuideCollection = ({ collection, direction }) => {
  const { handle, surtitle } = collection
  console.log({ collection })
  return (
    <Flex
      sx={{
        width: '100%',
        // display: ['flex', 'inline-grid'],
        // flexDirection: 'column',
        // gridTemplateColumns: '60% 30%',
        // gridAutoFlow: flow,
        // gap: 2,
        // display: 'flex',
        flexWrap: 'wrap',
        flexDirection: ['column', direction],
        // flexDirection: 'column',
      }}
    >
      {[1, 2, 3].map((num, i) => (
        <Box key={`gift-box-${i}`} sx={{ width: '50%' }}>
          {num}
        </Box>
      ))}
      <Flex
        sx={{ width: '50%', flexDirection: 'column', alignItems: 'center' }}
      >
        <Heading
          variant="h1"
          as="h2"
          mt={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 4,
          }}
        >
          <Text
            as="span"
            mb={4}
            variant="copy"
            sx={{ fontSize: 0, lineHeight: 'body', letterSpacing: 'wider' }}
          >
            {surtitle}
          </Text>
          {handle}
        </Heading>
        <Text
          as="p"
          variant="looseSans"
          mt={3}
          pb={5}
          sx={{
            fontSize: 1,
            lineHeight: 'body',
            letterSpacing: 'wider',
            lineHeight: '1.5em',
          }}
        >
          description
        </Text>
        <Button
          variant="sketchBlack"
          sx={{ color: 'black' }}
          as={GatsbyLink}
          to={`/collections/${handle}`}
        >
          shop {handle}
        </Button>
      </Flex>
    </Flex>
  )
}

export default GiftGuideCollection

GiftGuideCollection.propTypes = {
  direction: PropTypes.string,
}
