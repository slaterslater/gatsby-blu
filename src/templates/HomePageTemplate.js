import React, { useContext } from 'react'
import { navigate } from 'gatsby'
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
import MessageFromUniverse from '../components/MessageFromUniverse'
import UserGeneratedContent from '../components/yotpo/UserGeneratedContent'
import { NewsletterContext } from '../contexts/NewsletterContext'
import PopUp from '../components/PopUp'
import ProductRowSlider from '../components/home/ProductRowSlider'
import useSite from '../lib/useSite'
import ProductRowTitle from '../components/home/ProductRowTitle'

const IndexPage = ({ pageContext }) => {
  useAnalytics('viewHome')
  const { siteUrl } = useSite()

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
  const { dismissPrompt, shouldPrompt } = useContext(NewsletterContext)
  const {
    productRowTitle,
    productRow,
    collectionRow,
    reviews,
    headerHero,
    secondHero,
    video,
    popup,
    innerHero,
    spotlights,
    zodiac,
    locations,
    cards,
  } = pageContext

  return (
    <Layout>
      <SEO title="shop online jewelry">
        <meta
          name="google-site-verification"
          content={process.env.GATSBY_GOOGLE_SITE_VERIFICATION}
        />
        <script type="application/ld+json">{websiteLdJSON}</script>
      </SEO>
      <HomePageHeader data={headerHero} video={video} />
      <ProductRowTitle title={productRowTitle} />
      <ProductRowSlider products={productRow} />
      <HomePageHeader data={secondHero} />
      <CollectionRowSlider collections={collectionRow} />
      <BrandStatement />
      <MessageFromUniverse
        cards={cards}
        onWheelSpin={n =>
          navigate(`/contemplation-cards`, {
            state: { cardIndex: n },
          })
        }
        mb={[3, 8]}
      />
      <Spotlight spotlights={spotlights} />
      <HomepageReviews reviews={reviews} />
      <UserGeneratedContent />
      <OnePercentCallout />
      <HeroToggle heros={innerHero} />
      <Zodiac sign={zodiac} />
      <HomeLocations locations={locations} />
      <Medallions />
      <Socials />
      <PopUp
        popup={popup}
        dismissPrompt={dismissPrompt}
        shouldPrompt={shouldPrompt}
      />
    </Layout>
  )
}

export default IndexPage
