import React from 'react'
import { Container, Grid, Flex, Heading } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import ThemeLink from '../app/ThemeLink'

export const SpotlightCard = ({ title, button, children }) => (
  <Flex
    p={6}
    sx={{ textAlign: 'center', bg: 'cream', flexDirection: 'column' }}
  >
    {children}
    <Heading variant="h1" as="h2" py={5} mt="auto">
      {title}
    </Heading>
    <ThemeLink
      to={button.path}
      variant="caps"
      sx={{ fontSize: 1, textDecoration: 'underline' }}
    >
      {button.text}
    </ThemeLink>
  </Flex>
)

const Spotlight = ({ spotlights }) => (
  <Container variant="wide">
    <Grid
      sx={{
        gap: 6,
        gridAutoFlow: ['row', 'column'],
        justifyContent: 'center',
      }}
    >
      {spotlights.map(({ title, button, image }, i) => (
        <SpotlightCard title={title} button={button} key={`spotlight-${i}`}>
          <GatsbyImage image={image.asset.gatsbyImageData} alt={title} />
        </SpotlightCard>
      ))}
    </Grid>
  </Container>
)

export default Spotlight

Spotlight.propTypes = {
  spotlights: PropTypes.arrayOf(PropTypes.object),
}

SpotlightCard.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  children: PropTypes.object,
}
