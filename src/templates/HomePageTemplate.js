import React, { useMemo } from 'react'
import { graphql, navigate } from 'gatsby'
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
import MessageFromUniverse from '../components/MessageFromUniverse'
import UserGeneratedContent from '../components/yotpo/UserGeneratedContent'

const IndexPage = ({ data }) => {
  const { siteUrl } = data.site.siteMetadata

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
  const locations = data.allSanityLocation.nodes
  const products = data.allShopifyProduct.nodes
  const cards = data.allSanityCard.nodes
  const {
    headerHero,
    video,
    innerHero,
    collectionRow,
    spotlights,
    reviews,
    zodiac,
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
          content={process.env.GATSBY_GOOGLE_SITE_VERIFICATION}
        />
        <script type="application/ld+json">{websiteLdJSON}</script>
      </SEO>
      <HomePageHeader data={headerHero[0]} video={video[0]} />
      <CollectionRowSlider collections={collectionRowWithData} />
      <MessageFromUniverse
        cards={cards}
        onWheelSpin={n => {
          const handle = cards[n]?.collectionHandle
          navigate(`/collections/${handle}`)
        }}
        mb={[3, 8]}
      />
      <Spotlight spotlights={spotlights} />
      <HomepageReviews reviews={reviewsWithProductData} />
      <UserGeneratedContent />
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
        imageMobile {
          asset {
            gatsbyImageData(placeholder: BLURRED, width: 500)
          }
        }
      }
      video {
        mobileVideo {
          asset {
            url
          }
        }
        desktopVideo {
          asset {
            url
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
        imageMobile {
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
            gatsbyImageData(placeholder: BLURRED, width: 500)
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
          gatsbyImageData(placeholder: BLURRED, width: 300)
        }
      }
    }
    allSanityLocation(
      filter: { isPopup: { ne: true }, isTempClosed: { ne: true } }
    ) {
      nodes {
        id
        name
        slug {
          current
        }
        storeImage {
          asset {
            gatsbyImageData(placeholder: BLURRED, width: 200)
          }
        }
      }
    }
    allSanityCard {
      nodes {
        id
        collectionHandle
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, width: 155)
          }
        }
      }
    }
  }
`
