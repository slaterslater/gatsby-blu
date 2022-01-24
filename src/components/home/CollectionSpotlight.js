import React from 'react'
import { Container, Grid, Flex, Heading } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import ThemeLink from '../app/ThemeLink'

export const CollectionSpotlightCard = ({ title, path, children }) => (
  <Flex
    p={6}
    sx={{ textAlign: 'center', bg: 'cream', flexDirection: 'column' }}
  >
    {children}
    <Heading variant="h1" as="h4" py={5} mt="auto">
      {title}
    </Heading>
    <ThemeLink
      to={path}
      variant="caps"
      sx={{ fontSize: 1, textDecoration: 'underline' }}
    >
      Shop now
    </ThemeLink>
  </Flex>
)

const CollectionSpotlight = ({ collections }) => (
  <Container variant="wide">
    <Grid
      sx={{
        gap: 6,
        gridAutoFlow: ['row', 'column'],
        justifyContent: 'center',
      }}
    >
      {collections.map(({ title, handle, image }) => (
        <CollectionSpotlightCard
          title={title}
          path={`/collections/${handle}`}
          key={`collection-spotlight-${handle}`}
        >
          <GatsbyImage image={image.asset.gatsbyImageData} alt={title} />
        </CollectionSpotlightCard>
      ))}
    </Grid>
  </Container>
)

export default CollectionSpotlight

CollectionSpotlight.propTypes = {
  collections: PropTypes.arrayOf(PropTypes.object),
}

CollectionSpotlightCard.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.object,
}
