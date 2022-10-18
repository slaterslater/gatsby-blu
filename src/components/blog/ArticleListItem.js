import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Box, Text, Heading, Link, AspectRatio } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import RemoteShopifyImage from '../RemoteShopifyImage'
import { truncateString } from '../../lib/truncate'
import FluidShopifyImage from '../FluidShopifyImage'
import { getShopifyImage } from '../../lib/get-shopify-image'

const ArticleListItem = ({ article: { handle, title, content, image } }) => {
  const to = `/blog/${handle}`

  const imageData = image ? getShopifyImage({ image, width: 500 }) : null
  return (
    <Box as="article">
      {image && (
        <Link as={GatsbyLink} to={to} sx={{ textDecoration: 'none' }}>
          <AspectRatio ratio={10 / 6} sx={{ display: 'flex' }}>
            <GatsbyImage image={imageData} altText={image.altText} />
          </AspectRatio>
        </Link>
      )}
      <Grid sx={{ gridAutoFlow: 'row', gap: 4 }} px={3} pt={4}>
        <Heading as="h2" variant="caps" sx={{ fontSize: 3 }}>
          {title}
        </Heading>
        <Text as="p" sx={{ fontSize: 2, lineHeight: 1.7 }}>
          {truncateString(content)}
        </Text>
        <Link as={GatsbyLink} to={to} sx={{ fontSize: 1 }}>
          Read More
        </Link>
      </Grid>
    </Box>
  )
}

export default ArticleListItem
