import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Grid, Heading, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import ContactOptions from './ContactOptions'
import StoreHours from './StoreHours'

const PermanentStore = ({ location }) => {
  const { name, slug, daysOpen, storeImage } = location
  return (
    <>
      <Link
        as={GatsbyLink}
        to={`/locations/${slug.current}`}
        sx={{ width: '100%', textAlign: 'center', display: 'block' }}
      >
        <Heading as="h3" variant="h2" my={6}>{`${name} jewlery store`}</Heading>
      </Link>
      <Grid
        sx={{
          width: '100%',
          maxWidth: 900,
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr'],
          gap: 1,
        }}
        mb={[4, 4, 6]}
      >
        <Box
          sx={{
            width: '100%',
            minWidth: ['100%', '100%', '25%'],
            maxWidth: [410, 350],
            textAlign: 'center',
          }}
          pb={[6, 6, 0]}
          my="auto"
        >
          <GatsbyImage image={storeImage.asset.gatsbyImageData} alt={name} />
        </Box>
        <ContactOptions location={location} />
        <StoreHours daysOpen={daysOpen} />
      </Grid>
    </>
  )
}

export default PermanentStore
