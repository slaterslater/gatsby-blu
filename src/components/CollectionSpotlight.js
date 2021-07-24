import React from 'react'
import { Grid, Flex, Heading, Text, Box } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'
import ThemeLink from './app/ThemeLink'

const CollectionSpotlightCard = ({ title, path, children }) => (
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

const CollectionSpotlight = props => (
  <Flex sx={{ justifyContent: 'center ', width: '100%' }} pb={[7, 8]}>
    <Grid
      sx={{
        gap: 6,
        gridAutoFlow: ['row', 'column'],
        justifyContent: 'center',
      }}
      mx={4}
    >
      <CollectionSpotlightCard
        title="ONE OF A KIND SAPPHIRE RINGS"
        path="/collections/one-of-a-kind-beloved-engagement-rings"
      >
        <StaticImage
          src="../images/homepage-jul-22/collection-spotlight-1.jpg"
          ratio={1}
          alt=""
        />
      </CollectionSpotlightCard>
      <CollectionSpotlightCard
        title="Most Loved"
        path="/collections/best-sellers-1"
      >
        <StaticImage
          src="../images/homepage-jul-22/collection-spotlight-2.jpg"
          ratio={1}
          alt=""
        />
      </CollectionSpotlightCard>
    </Grid>
  </Flex>
)

export default CollectionSpotlight
