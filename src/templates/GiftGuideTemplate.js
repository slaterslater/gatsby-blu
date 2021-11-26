// src/templates/GiftGuideTemplate.js

import { graphql } from 'gatsby'
import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Heading, Grid, Box, Text, Container, Flex } from 'theme-ui'
import Layout from '../components/layout'
import SEO from '../components/seo'
import GiftGuideHeader from '../components/guide/GiftGuideHeader'
import GiftGuideCollection from '../components/guide/GiftGuideCollection'

const GiftGuidePage = ({ data }) => {
  const {
    title,
    description,
    headerImage,
    giftCollections,
  } = data.sanityGiftGuide
  console.log({ data })
  const collections = data.allShopifyCollection.nodes
  // useMemo to create new array combiniing giftcollections and collections

  return (
    <Layout>
      <SEO title={title} description={description} />
      <GiftGuideHeader
        title={title}
        description={description}
        image={headerImage.image.asset.gatsbyImageData}
      />
      <Container>
        {giftCollections.map((collection, i) => (
          <GiftGuideCollection
            key={`gift-collection-${i}`}
            collection={collection}
            direction={i % 2 ? 'row' : 'row-reverse'}
          />
        ))}
      </Container>
    </Layout>
  )
}

export default GiftGuidePage

GiftGuidePage.propTypes = {
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
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
    allShopifyCollection(filter: { handle: { in: $collections } }) {
      nodes {
        title
        description
      }
    }
  }
`

// export const query = graphql`
//   query {
//     allShopifyCollection(
//       filter: {
//         handle: {
//           in: [
//             "star-gazer"
//             "dreamer"
//             "bright-star"
//             "cosmic-love"
//             "top-holiday-gifts"
//           ]
//         }
//       }
//     ) {
//       nodes {
//         title
//         handle
//         description
//       }
//     }
//   }
// `
