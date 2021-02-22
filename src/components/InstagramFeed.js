import { graphql, useStaticQuery } from 'gatsby'
// import Image from 'gatsby-image';

import React from 'react'
import { Box, Grid, Text, Image } from 'theme-ui'

const InstagramFeed = () => {
  const data = useStaticQuery(graphql`
    query {
      allInstaNode(limit: 10, sort: { fields: timestamp, order: DESC }) {
        edges {
          node {
            thumbnails {
              src
            }
            dimensions {
              height
              width
            }
            mediaType
            id
          }
        }
      }
    }
  `)

  return (
    <Box variant="sectionWrap">
      <Text
        as="h3"
        variant="caps"
        sx={{ fontSize: 3, fontWeight: 'light' }}
        pb={5}
      >
        Follow Us On Instagram
      </Text>
      <Grid
        sx={{
          justifyContent: 'center',
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(5, 1fr)'],
          gridTemplateRows: ['repeat(5, 1fr)', 'repeat(2, 1fr)'],
          gap: 4,
        }}
      >
        {data.allInstaNode.edges.map(({ node }) => (
          <a
            key={node.id}
            href={`https://www.instagram.com/p/${node.id}`}
            target="_blank"
          >
            <Image
              srcSet={node.thumbnails.reduce((set, thumbnail) => {
                if (!set) return `${thumbnail.src} ${thumbnail.config_width}w`
                return `${set}, ${thumbnail.src} ${thumbnail.config_width}w`
              }, '')}
              src={node.thumbnails[2].src}
              key={node.id}
              alt="node.title"
            />
          </a>
        ))}
      </Grid>
    </Box>
  )
}

export default InstagramFeed
