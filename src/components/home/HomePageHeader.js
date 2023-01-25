import { Box, Grid, Heading } from 'theme-ui'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { HeroOuter } from '../content/Hero'

const HomePageHeader = ({ data }) => {
  const { heading, subheading, button, image1, imageMobile } = data

  const [image1Data, mobileImageData] = [image1, imageMobile].map(
    img => img?.asset.gatsbyImageData
  )

  const artDirectedImages = useMemo(() => {
    if (!mobileImageData) return image1Data
    return withArtDirection(image1Data, [
      {
        media: '(max-width: 40em)',
        image: mobileImageData,
      },
    ])
  }, [image1Data, mobileImageData])

  return (
    <HeroOuter data={{ heading, subheading, button }}>
      <Heading
        as="h1"
        sx={{
          position: 'absolute',
          zIndex: -100,
          color: 'white',
        }}
      >
        Bluboho Refined Jewelry
      </Heading>
      <Grid
        sx={{
          gridTemplateColumns: '1fr',
          gap: 0,
          overflow: 'hidden',
        }}
      >
        <GatsbyImage image={artDirectedImages} alt="" />
      </Grid>
    </HeroOuter>
  )
}

export default HomePageHeader

HomePageHeader.propTypes = {
  data: PropTypes.object,
}
