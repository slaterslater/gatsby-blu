import { Grid, Button, Heading, Flex } from 'theme-ui'
import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import FluidShopifyImage from '../FluidShopifyImage'
import RemoteShopifyImage from '../RemoteShopifyImage'

const TopStory = ({ article: { title, image, handle }, ...props }) => (
  <Grid sx={{ minHeight: [240, 360], maxHeight: [330, 450] }} {...props}>
    <RemoteShopifyImage
      originalSrc={image.src}
      sizes={[400, 600, 800, 1000, 1200, 1600]}
      sx={{
        height: '100%',
        objectFit: 'cover',
        maxHeight: [330, 350],
        minHeight: [240, 360],
        width: '100%',
        gridArea: '1 / 1 / -1 / -1',
      }}
    />
    <Flex
      sx={{
        gridArea: '1 / 1 / -1 / -1',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      p={[4, 6]}
    >
      <Heading
        as="h1"
        variant="caps"
        pb={4}
        sx={{ color: 'white', fontSize: [3, 4] }}
      >
        {title}
      </Heading>
      <Button variant="inverted" as={GatsbyLink}>
        Read More
      </Button>
    </Flex>
  </Grid>
)

export default TopStory
