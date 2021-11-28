import React from 'react'
import { Link, Flex, Box, Text, Heading, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

// <GatsbyImage image={image} alt="" />

const GiftBox = ({ box, index }) => {
  console.log({ box })
  // array of arrays
  // index determines which applies
  const [sm, md, lg] = [305, 370, 440]
  const height = [
    [sm, md, lg],
    [lg, md, lg],
    [md, sm, md],
  ]
  return (
    <Flex sx={{ width: ['100%', '50%'], flexDirection: 'row', order: index }}>
      {box.products.map(({ productImage }, i) => (
        <Flex
          p={3}
          // py={3}
          // pr={box.products[1] && !i && 3}
          // pl={i && 3}
          sx={{
            // alignItems: 'stretch',
            // flex: 1,
            height: height[index],
            // maxHeight: height[index],
            width: `calc(100% / ${box.products.length})`,
          }}
        >
          <GatsbyImage
            image={productImage.image.asset.gatsbyImageData}
            alt=""
            objectFit="cover"
          />
        </Flex>
      ))}
    </Flex>
  )
}

const GiftGuideCollection = ({ collection, direction }) => {
  const { title, surtitle, handle, description, giftBoxes } = collection
  console.log({ collection })
  return (
    <Flex
      sx={{
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: ['column', direction],
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
          width: ['100%', '50%'],
        }}
      >
        <Heading
          variant="h1"
          as="h2"
          // mt={6}
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
            // lineHeight: '1.5em',
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
  direction: PropTypes.string,
}
