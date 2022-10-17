import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Grid, Heading, Link, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { DateTime } from 'luxon'
import ContactOptions from './ContactOptions'
import StoreHours from './StoreHours'

const PermanentStore = ({ location }) => {
  const {
    name,
    slug,
    daysOpen,
    storeImage,
    isTempClosed,
    openingDate,
    closeMessage,
  } = location
  const storeWillOpen = DateTime.fromISO(openingDate).toFormat('LLLL yyyy')

  return (
    <>
      <Link
        as={GatsbyLink}
        to={`/locations/${slug.current}`}
        sx={{ width: '100%', textAlign: 'center', display: 'block' }}
      >
        <Heading as="h2" variant="h2" my={6}>{`${name} jewelry store`}</Heading>
      </Link>
      {isTempClosed && (
        <Box
          sx={{ textAlign: 'center', h4: { fontSize: 1, fontWeight: 'bold' } }}
          mb={4}
        >
          <Heading as="h3" variant="caps" pb={2}>
            {closeMessage}
          </Heading>
          <Text as="p" variant="caps">
            will open {storeWillOpen}
          </Text>
        </Box>
      )}
      <Grid
        sx={{
          width: '100%',
          maxWidth: 900,
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr'],
          gap: 1,
          textAlign: 'center',
        }}
        mb={[4, 4, 6]}
      >
        <Box
          sx={{
            width: '100%',
            minWidth: ['100%', '100%', '25%'],
            maxWidth: [410, 350],
          }}
          pb={[6, 6, 0]}
          my="auto"
        >
          <GatsbyImage image={storeImage.asset.gatsbyImageData} alt={name} />
        </Box>
        <ContactOptions location={location} />
        <StoreHours daysOpen={daysOpen} isTempClosed={isTempClosed} />
      </Grid>
    </>
  )
}

export default PermanentStore
