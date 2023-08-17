import React from 'react'
import { Flex, Container, Heading } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import { MobileSlider } from '../content/CollectionRow'
import ThemeLink from '../app/ThemeLink'

const LocationBox = ({ to, text, width, children, showButtons }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'center',
      height: '100%',
      alignSelf: 'stretch',
    }}
    // px={4}
  >
    <Flex sx={{ flex: 1, alignItems: 'flex-end', width }} mb={5}>
      {children}
    </Flex>
    {showButtons && (
      <ThemeLink
        variant="caps"
        to={to}
        mt="auto"
        py={3}
        sx={{
          bg: 'bbBeige',
          width: '100%',
          textDecoration: 'none',
          textAlign: 'center',
          fontSize: 0,
        }}
      >
        {text}
      </ThemeLink>
    )}
  </Flex>
)

const HomeLocations = ({ locations, showButtons = true }) => (
  <Container pt={8} pb={5}>
    <Heading as="h2" variant="h1" pb={5} sx={{ textAlign: 'center' }}>
      Store Locations
    </Heading>
    <MobileSlider
      minCardWidth={150}
      nodes={locations.map(({ id, name, slug, storeImage }) => {
        const { height, width } = storeImage.asset.gatsbyImageData
        return (
          <LocationBox
            key={id}
            to={`/locations/${slug.current}`}
            text={name}
            width={width < height ? '75%' : '100%'}
            showButtons={showButtons}
          >
            <GatsbyImage
              image={storeImage.asset.gatsbyImageData}
              alt={`outline of ${name} storefront`}
            />
          </LocationBox>
        )
      })}
    />
  </Container>
)

export default HomeLocations

HomeLocations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
}

LocationBox.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.object,
}
