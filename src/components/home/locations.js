import React from 'react'
import { Flex, Container, Heading } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'
import { MobileSlider } from '../content/CollectionRow'
// import oakvilleImage from '../../images/home/oakville_store.jpg'
// import yongeImage from '../../images/home/yonge_store.jpg'
// import queenImage from '../../images/home/queen_store.jpg'
import ThemeLink from '../app/ThemeLink'

// const storeLocations = [
//   {
//     to: '/pages/oakville',
//     text: 'Oakville',
//     image: oakvilleImage,
//   },
//   {
//     to: '/pages/yonge',
//     text: 'Yonge Street',
//     image: yongeImage,
//   },
//   {
//     to: '/pages/queen',
//     text: 'Queen Street',
//     image: queenImage,
//   },
// ]

const LocationBox = ({ to, text, children }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      alignSelf: 'stretch',
    }}
    px={4}
  >
    <Flex sx={{ flex: 1, alignItems: 'center' }} mb={5}>
      {children}
    </Flex>
    <ThemeLink variant="sketchButtonBlack" to={to} mt="auto">
      {text}
    </ThemeLink>
  </Flex>
)

const HomeLocations = props => (
  <Container py={8}>
    <Heading as="h3" variant="h1" pb={5} sx={{ textAlign: 'center' }}>
      Store Locations
    </Heading>
    <MobileSlider
      minCardWidth={320}
      nodes={[
        <LocationBox
          key="oakville-location-box"
          to="/pages/locations-and-hours"
          text="Oakville"
        >
          <StaticImage
            quality={100}
            src="../../images/home/oakville_store.jpg"
            alt="outline of Oakville storefront"
            height={306}
          />
        </LocationBox>,
        <LocationBox
          key="yonge-location-box"
          to="/pages/locations-and-hours"
          text="Yonge Street"
        >
          <StaticImage
            quality={100}
            src="../../images/home/yonge_store.jpg"
            alt="outline of Yonge Street storefront"
            height={230}
          />
        </LocationBox>,
        <LocationBox
          key="queen-location-box"
          to="/pages/locations-and-hours"
          text="Queen Street"
        >
          <StaticImage
            quality={100}
            src="../../images/home/queen_store.jpg"
            alt="outline of Queen Street storefront"
            height={286}
          />
        </LocationBox>,
      ]}
    />
  </Container>
)

export default HomeLocations
