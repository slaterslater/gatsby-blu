import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { Grid, Box, Text, Heading, Link } from 'theme-ui'
import RemoteShopifyImage from '../RemoteShopifyImage'
import { truncateString } from '../../lib/truncate'
import FluidShopifyImage from '../FluidShopifyImage'

const ArticleListItem = ({ article: { handle, title, content, image } }) => {
  const to = `/blog/${handle}`
  return (
    <Box as="article">
      {image && (
        <Link as={GatsbyLink} to={to} sx={{ textDecoration: 'none' }}>
          <FluidShopifyImage
            ratio={10 / 6}
            originalSrc={image.src}
            altText={image.altText}
          />
        </Link>
      )}
      <Grid sx={{ gridAutoFlow: 'row', gap: 4 }} px={3} pt={4}>
        <Heading as="h6" variant="caps" sx={{ fontSize: 3 }}>
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
