import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import {
  Grid,
  Box,
  Text,
  Heading,
  Link,
  AspectRatio,
  Button,
  Flex,
} from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import { background } from 'styled-system'
import RemoteShopifyImage from '../RemoteShopifyImage'
import { truncateString } from '../../lib/truncate'
import FluidShopifyImage from '../FluidShopifyImage'
import { getShopifyImage } from '../../lib/get-shopify-image'

const ArticleListItem = ({
  index,
  article: { handle, title, content, image },
}) => {
  const to = `/blog/${handle}`
  const bgOddRows = `url('/blog-bg-${index % 2 ? 2 : 1}.webp')`
  const bgEvenRows = `url('/blog-bg-${index % 3 ? 2 : 1}.webp')`

  return (
    <Flex
      as="article"
      sx={{
        flexDirection: 'column',
      }}
      pb={6}
    >
      <Link
        as={GatsbyLink}
        to={to}
        sx={{
          textDecoration: 'none',
          backgroundImage: [bgOddRows, bgEvenRows, bgOddRows],
          backgroundSize: '100% 100%',
        }}
        p={4}
      >
        <AspectRatio
          ratio={3 / 2}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {image && (
            <GatsbyImage
              image={getShopifyImage({ image, width: 500 })}
              alt=""
            />
          )}
        </AspectRatio>
      </Link>
      <Heading
        as="h2"
        variant="caps"
        sx={{
          fontSize: 0,
          textAlign: 'center',
          lineHeight: 1.5,
          padding: '14px',
          letterSpacing: '0.1em',
        }}
      >
        {title}
      </Heading>
      <Button
        variant="inverted"
        as={GatsbyLink}
        to={to}
        sx={{ fontSize: 1, width: 'fit-content' }}
        mt="auto"
        mx="auto"
      >
        Read More
      </Button>
    </Flex>
  )
}

export default ArticleListItem
