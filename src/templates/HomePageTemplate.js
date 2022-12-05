import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { Box, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import OnePercentCallout from '../components/content/OnePercentCallout'
import SEO from '../components/seo'
import HomepageReviews from '../components/home/HomepageReviews'
import BrandStatement from '../components/home/BrandStatement'
import Medallions from '../components/home/Medallions'
import Spotlight from '../components/home/Spotlight'
import Zodiac from '../components/home/Zodiac'
import { useAnalytics } from '../lib/useAnalytics'
import HomeLocations from '../components/home/Locations'
import HomePageHeader from '../components/home/HomePageHeader'
import CollectionRowSlider from '../components/home/CollectionRowSlider'
import Socials from '../components/home/SocialBlocks'
import HeroToggle from '../components/home/HeroToggle'
import NewsletterSignUpModal from '../components/NewsletterSignUpModal'

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
    spotlights,
    reviews,
    zodiac,
    locations,
  } = data.sanityHomePage

  const collectionRowWithData = useMemo(
    () =>
      collectionRow.map(collection => {
        if (collection.title) return collection
        const collectionData = collections.find(
          ({ handle }) => handle === collection.handle
        )
        const collectionGroupPage = collectionGroupPages.find(
          ({ slug }) => slug.current === collection.handle
        )
        return {
          ...collection,
          ...collectionData,
          ...collectionGroupPage,
        }
      }),
    [collections, collectionGroupPages, collectionRow]
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
      <SEO title="shop online jewelry">
        <meta
          name="google-site-verification"
          content="vQiYyQAU-CvwpUnqiElf9CgPBy0VeML-opmKcJmEhjs"
        />
        <script type="application/ld+json">{websiteLdJSON}</script>
      </SEO>
      <HomePageHeader data={headerHero[0]} />
      <CollectionRowSlider collections={collectionRowWithData} />
      <Box
        sx={{
          bg: 'cream',
          textAlign: 'center',
          h2: { fontSize: 2, fontWeight: 'bold' },
          span: {
            display: 'block',
            padding: 2,
            maxWidth: 300,
            margin: 'auto',
            fontSize: 0,
          },
        }}
        py={7}
        mb={7}
      >
        <Heading as="h2" variant="caps" mb={3}>
          HOLIDAY SHIPPING DATES
        </Heading>
        <Text>
          <strong>INTERNATIONAL</strong>: friday, DEC 16th
        </Text>
        <Text>
          <strong>DOMESTIC</strong>: friday, DEC 16th
        </Text>
        <Text>
          <strong>CURBSIDE</strong> PICK UP: friday, DEC 23rd
        </Text>
        <Text>
          <strong>FREE EXPRESS SHIPPING</strong> (order over $500): saturday DEC
          17th - thursday DEC 22nd
        </Text>
      </Box>
      <Spotlight spotlights={spotlights} />
      <HomepageReviews reviews={reviewsWithProductData} />
      <OnePercentCallout />
      <BrandStatement />
      <HeroToggle heros={innerHero} />
      <Zodiac sign={zodiac[0]} />
      <HomeLocations locations={locations} />
      <Medallions />
      <Socials />
      <NewsletterSignUpModal />
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query ($collections: [String!], $products: [String!]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    sanityHomePage {
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
            gatsbyImageData(placeholder: BLURRED, width: 500)
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
            gatsbyImageData(placeholder: BLURRED, width: 300)
          }
        }
      }
      spotlights {
        button {
          text
          path
        }
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
        collectionHandle
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
