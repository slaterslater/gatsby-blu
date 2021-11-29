// src/templates/GiftGuideTemplate.js

import { graphql } from 'gatsby'
import React, { useMemo, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { Heading, Grid, Box, Text, Container, Flex } from 'theme-ui'
import Layout from '../components/layout'
import SEO from '../components/seo'
import GiftGuideHeader from '../components/guide/GiftGuideHeader'
import GiftGuideCollection from '../components/guide/GiftGuideCollection'
import GiftProvider from '../components/guide/GiftContext'

const GiftGuidePage = ({ data }) => {
  const {
    title,
    description,
    headerImage,
    giftCollections,
  } = data.sanityGiftGuide

  const collections = data.allShopifyCollection.nodes

  const giftCollectionsWithShopifyData = useMemo(
    () =>
      giftCollections.map(giftCollection => {
        const relatedCollection = collections.find(
          collection => collection.handle === giftCollection.handle
        )
        return {
          ...giftCollection,
          title: giftCollection.title || relatedCollection.title,
          description: relatedCollection.description,
        }
      }),
    [collections, giftCollections]
  )

  return (
    <Layout>
      <SEO title={title} description={description} />
      <GiftGuideHeader
        title={title}
        description={description}
        image={headerImage.image.asset.gatsbyImageData}
      />
      <Container sx={{ maxWidth: 985 }} py={[6, 7, 8]} px={[0, 3]}>
        {[
          ...giftCollectionsWithShopifyData,
          ...giftCollectionsWithShopifyData,
          ...giftCollectionsWithShopifyData,
        ].map((collection, i) => (
          <GiftProvider index={i} key={`gift-collection-${i}`}>
            <GiftGuideCollection collection={collection} index={i} />
          </GiftProvider>
        ))}
      </Container>
    </Layout>
  )
}

export default GiftGuidePage

GiftGuidePage.propTypes = {
  data: PropTypes.shape({
    sanityGiftGuide: PropTypes.object,
    allShopifyCollection: PropTypes.object,
  }),
}

export const query = graphql`
  query($guideHandle: String!, $collections: [String!]!) {
    sanityGiftGuide(handle: { current: { eq: $guideHandle } }) {
      title
      description
      headerImage {
        image {
          asset {
            gatsbyImageData
          }
        }
      }
      giftCollections {
        surtitle
        handle
        giftBoxes {
          products {
            productHandles
            productImage {
              image {
                asset {
                  gatsbyImageData(placeholder: BLURRED)
                }
              }
            }
          }
        }
      }
    }
    allShopifyCollection(filter: { handle: { in: $collections } }) {
      nodes {
        handle
        title
        description
      }
    }
  }
`
