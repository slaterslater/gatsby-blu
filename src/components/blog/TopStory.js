import { Box, Grid, Button, Heading, Flex } from 'theme-ui'
import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import FluidShopifyImage from '../FluidShopifyImage'
import RemoteShopifyImage from '../RemoteShopifyImage'
import { getShopifyImage } from '../../lib/get-shopify-image'

const TopStoryWithImage = ({ article: { title, image, handle }, ...props }) => {
  const imageData = getShopifyImage({ image })

  return (
    <Grid
      sx={{
        minHeight: [240, 360],
        maxHeight: [330, 450],
        overflow: 'hidden',
        position: 'relative',
      }}
      {...props}
    >
      <Flex
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          '&::before': {
            content: `''`,
            display: 'block',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            backgroundImage:
              'linear-gradient(to top, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          },
        }}
      >
        <GatsbyImage image={imageData} alt={image.altText} />
      </Flex>
      <Flex
        sx={{
          gridArea: '1 / 1 / -1 / -1',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 1,
        }}
        p={[4, 6]}
      >
        <Heading
          as="h2"
          variant="caps"
          pb={4}
          sx={{ color: 'white', fontSize: [3, 4], fontWeight: 'normal' }}
        >
          {title}
        </Heading>
        <Button variant="inverted" as={GatsbyLink} to={`/blog/${handle}`}>
          Read More
        </Button>
      </Flex>
    </Grid>
  )
}

const TopStory = ({ article, ...props }) => {
  const { image, title, handle } = article

  if (image?.url) return <TopStoryWithImage article={article} {...props} />

  return (
    <Box pt={6} {...props}>
      <Heading as="h2" variant="caps" pb={4} sx={{ fontSize: [3, 4] }}>
        {title}
      </Heading>
      <Button variant="inverted" as={GatsbyLink} to={`/blog/${handle}`}>
        Read More
      </Button>
    </Box>
  )
}

export default TopStory
