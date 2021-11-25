// src/pages/holiday-gift-guide.js

import { graphql } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Grid, Box, Text, Container, Flex } from 'theme-ui'
import Layout from '../components/layout'
import SEO from '../components/seo'
import CollectionPageHeader from '../components/CollectionPageHeader'

const holidayCollections = [
  'star-gazer',
  'dreamer',
  'bright-star',
  'cosmic-love',
  'top-holiday-gifts',
]

const GiftCollection = ({ direction }) => (
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
    {[1, 2, 3, 4].map(num => (
      <Box sx={{ width: '50%' }}>{num}</Box>
    ))}
  </Flex>
)

const HolidayGiftGuidePage = ({ data }) => {
  const title = 'holiday gift guide'
  const description =
    'christmas isn’t the only thing that’s supposed to add sparkle and shine to your life.'
  const collections = data.allShopifyCollection.nodes
  console.log({ collections })
  return (
    <Layout>
      <SEO title={title} description={description} />
      <CollectionPageHeader
        title={title}
        description={description}
        image={null}
        color="white"
        bgColor="black"
      />
      <Container>
        {collections.map((collection, i) => (
          <GiftCollection
            collection={collection}
            direction={i % 2 ? 'row' : 'row-reverse'}
          />
        ))}
      </Container>
    </Layout>
  )
}

export default HolidayGiftGuidePage

HolidayGiftGuidePage.propTypes = {
  data: PropTypes.shape({
    allShopifyCollection: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          handle: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    }),
  }),
}

GiftCollection.propTypes = {
  direction: PropTypes.string,
}

export const query = graphql`
  query {
    allShopifyCollection(
      filter: {
        handle: {
          in: [
            "star-gazer"
            "dreamer"
            "bright-star"
            "cosmic-love"
            "top-holiday-gifts"
          ]
        }
      }
    ) {
      nodes {
        title
        handle
        description
      }
    }
  }
`
