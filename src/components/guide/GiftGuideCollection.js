import React from 'react'
import { Flex, Text, Heading, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import GiftBox from './GiftBox'

const GiftGuideCollection = ({ collection, index }) => {
  const { title, surtitle, handle, description, giftBoxes } = collection
  return (
    <Flex
      sx={{
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: ['column', index % 2 ? 'row-reverse' : 'row'],
      }}
    >
      {giftBoxes.map((box, i) => (
        <GiftBox key={`gift-box-${i}`} box={box} index={i} />
      ))}
      <Flex
        py={[6, 0]}
        sx={{
          order: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: ['100%', '60%'],
        }}
      >
        <Heading
          variant="h1"
          as="h2"
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
            textAlign: 'center',
            width: 305,
          }}
        >
          {description}
        </Text>
        <Button
          variant="sketchBlack"
          sx={{ color: 'black' }}
          as={GatsbyLink}
          to={`/collections/${handle}`}
        >
          shop {title}
        </Button>
      </Flex>
    </Flex>
  )
}

export default GiftGuideCollection

GiftGuideCollection.propTypes = {
  collection: PropTypes.any,
  index: PropTypes.number,
}
