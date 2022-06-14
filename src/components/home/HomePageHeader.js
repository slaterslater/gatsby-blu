import { Box, Grid } from 'theme-ui'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { HeroOuter } from '../content/Hero'

const HomePageHeader = ({ data }) => {
  const { heading, subheading, button, image1, image2, imageMobile } = data

  const [image1Data, image2Data, mobileImageData] = [
    image1,
    image2,
    imageMobile,
  ].map(img => img?.asset.gatsbyImageData)

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
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', image2Data ? '1fr 1fr' : '1fr'],
          gap: 0,
          overflow: 'hidden',
        }}
      >
        <GatsbyImage image={artDirectedImages} alt="" />
        {image2Data && (
          <Box sx={{ display: ['none', 'flex'], alignItems: 'stretch' }}>
            <GatsbyImage image={image2Data} alt="" />
          </Box>
        )}
      </Grid>
    </HeroOuter>
  )
}

export default HomePageHeader

HomePageHeader.propTypes = {
  data: PropTypes.object,
}
