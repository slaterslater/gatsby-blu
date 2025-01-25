// src/templates/GiftGuideTemplate.js

import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'theme-ui'
import Layout from '../components/layout'
import GiftGuideHeader from '../components/guide/GiftGuideHeader'
import GiftGuideCollection from '../components/guide/GiftGuideCollection'
import GiftProvider from '../components/guide/GiftContext'

const GiftGuidePage = ({ data }) => {
  const { title, description, headerImage, giftCollections, isBeloved } =
    data.sanityGiftGuide
  const collections = data.allShopifyCollection.nodes
  const allShopifyProduct = data.allShopifyProduct.nodes

  const giftCollectionsWithShopifyData = useMemo(
    () =>
      giftCollections.map(giftCollection => {
        const relatedCollection = collections.find(
          collection => collection.handle === giftCollection.handle
        )
        return {
          ...giftCollection,
          title: giftCollection.title || relatedCollection?.title,
          description: relatedCollection?.description,
          giftBoxes: giftCollection.giftBoxes.map(({ products }) => ({
            products: products.map(product => {
              const filteredProductHandles = product.productHandles.filter(
                productHandle =>
                  allShopifyProduct.some(
                    ({ handle }) => productHandle === handle
                  )
              )
              return {
                ...product,
                productHandles: filteredProductHandles,
                relatedProducts: filteredProductHandles.map(handle =>
                  allShopifyProduct.find(
                    shopifyProduct => shopifyProduct.handle === handle
                  )
                ),
              }
            }),
          })),
        }
      }),
    [collections, giftCollections, allShopifyProduct]
  )

  return (
    <Layout isBeloved={isBeloved} title={title} description={description}>
      <GiftGuideHeader
        title={title}
        description={description}
        image={headerImage.image.asset.gatsbyImageData}
      />
      <Container
        sx={{ maxWidth: 985, minWidth: 365 }}
        py={[6, 7, 8]}
        px={[0, 3]}
      >
        {giftCollectionsWithShopifyData.map((collection, i) => (
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
    allShopifyProduct: PropTypes.object,
  }),
}

export const query = graphql`
  query (
    $guideHandle: String!
    $collections: [String!]!
    $products: [String!]!
    $alternates: [String]!
  ) {
    sanityGiftGuide(handle: { current: { eq: $guideHandle } }) {
      title
      description
      isBeloved
      headerImage {
        image {
          asset {
            gatsbyImageData
          }
        }
      }
      giftCollections {
        surtitle
        title
        handle
        isDescriptionVisible
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
            buttonColor {
              hex
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
    allShopifyProduct(filter: { handle: { in: $products } }) {
      nodes {
        id
        title
        handle
        descriptionHtml
        description
        productType
        vendor
        tags
        handle
        options {
          name
          values
        }
        #images {
        # gatsbyImageData(placeholder: BLURRED)
        #}
        media {
          ... on ShopifyMediaImage {
            image {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        metafields {
          key
          value
        }
        priceRangeV2 {
          minVariantPrice {
            currencyCode
            amount
          }
          maxVariantPrice {
            currencyCode
            amount
          }
        }
        variants {
          title
          id
          shopifyId
          price
          sku
          selectedOptions {
            name
            value
          }
        }
      }
    }
    alternates: allShopifyProduct(filter: { shopifyId: { in: $alternates } }) {
      nodes {
        id
        handle
        title
        variants {
          selectedOptions {
            name
            value
          }
          availableForSale
        }
      }
    }
  }
`
