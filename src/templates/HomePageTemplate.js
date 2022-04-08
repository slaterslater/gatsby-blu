import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import OnePercentCallout from '../components/content/OnePercentCallout'
import SEO from '../components/seo'
import HomepageReviews from '../components/home/HomepageReviews'
import BrandStatement from '../components/home/BrandStatement'
import Medallions from '../components/home/Medallions'
import CollectionSpotlight from '../components/home/CollectionSpotlight'
import Zodiac from '../components/home/Zodiac'
import { useAnalytics } from '../lib/useAnalytics'
import HomeLocations from '../components/home/Locations'
import HomePageHeader from '../components/home/HomePageHeader'
import CollectionRowSlider from '../components/home/CollectionRowSlider'
import Socials from '../components/home/SocialBlocks'
import HeroToggle from '../components/home/HeroToggle'

const IndexPage = ({ data }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = data

  const websiteLdJSON = `
  {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "${siteUrl}",
      "about" : {
        "@type":"Thing",
        "name":"Jewelry Store"
      },
      "potentialAction": {
          "@type": "SearchAction",
          "target": "${siteUrl}/search?q={query}&type=product",
          "query-input": "required name=query"
      }
  }
`

  useAnalytics('viewHome')

  const collections = data.allShopifyCollection.nodes
  const collectionGroupPages = data.allSanityCollectionGroupPage.nodes
  const products = data.allShopifyProduct.nodes
  const {
    headerHero,
    innerHero,
    collectionRow,
    collectionSpotlight,
    reviews,
    zodiac,
    locations,
  } = data.allSanityHomePage.nodes[0]

  const [collectionRowWithData, collectionSpotlightWithData] = useMemo(
    () =>
      [collectionRow, collectionSpotlight].map(obj =>
        obj.map(subObj => {
          if (subObj.title) return subObj
          const collection = collections.find(
            ({ handle }) => handle === subObj.handle
          )
          const collectionGroupPage = collectionGroupPages.find(
            ({ slug }) => slug.current === subObj.handle
          )
          return {
            ...subObj,
            ...collection,
            ...collectionGroupPage,
          }
        })
      ),
    [collections, collectionGroupPages, collectionRow, collectionSpotlight]
  )

  const reviewsWithProductData = useMemo(
    () =>
      reviews
        .map(review => {
          const productData = products.find(
            ({ handle }) => handle === review.productHandle
          )
          return {
            ...review,
            product: {
              ...productData,
              title: review.productTitle || productData.title,
            },
          }
        })
        .filter(({ product }) => product.handle),
    [reviews, products]
  )

  return (
    <Layout>
      <SEO title="home">
        <script type="application/ld+json">{websiteLdJSON}</script>
      </SEO>
      <HomePageHeader data={headerHero[0]} />
      <CollectionRowSlider collections={collectionRowWithData} />
      <BrandStatement />
      <CollectionSpotlight collections={collectionSpotlightWithData} />
      <HomepageReviews reviews={reviewsWithProductData} />
      <OnePercentCallout />
      <HeroToggle heros={innerHero} />
      <Zodiac sign={zodiac[0]} />
      <HomeLocations locations={locations} />
      <Medallions />
      <Socials />
    </Layout>
  )
}

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.object,
}

export const query = graphql`
  query ($collections: [String!], $products: [String!]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allSanityHomePage {
      nodes {
        headerHero {
          heading
          subheading
          button {
            text
            path
          }
          image1 {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          image2 {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          imageMobile {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          icon {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        innerHero {
          heading
          subheading
          button {
            text
            path
          }
          image1 {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          image2 {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          imageMobile {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          icon {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        collectionRow {
          title
          handle
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        collectionSpotlight {
          title
          handle
          image {
            asset {
              gatsbyImageData(
                placeholder: BLURRED
                layout: CONSTRAINED
                width: 700
                aspectRatio: 1
              )
            }
          }
        }
        reviews {
          author
          content
          score
          productHandle
          productTitle
        }
        zodiac {
          name
          description
          backgroundColor {
            hex
          }
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        locations {
          name
          imageOrientation
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
    allShopifyCollection(filter: { handle: { in: $collections } }) {
      nodes {
        handle
        title
      }
    }
    allSanityCollectionGroupPage(
      filter: { slug: { current: { in: $collections } } }
    ) {
      nodes {
        title
        slug {
          current
        }
      }
    }
    allShopifyProduct(filter: { handle: { in: $products } }) {
      nodes {
        title
        handle
        images {
          url
          altText
          height
          width
          id
        }
      }
    }
  }
`
