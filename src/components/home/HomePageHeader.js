import { Box, Grid, Heading } from 'theme-ui'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { HeroOuter } from '../content/Hero'

const HomePageHeader = ({ data, videoSrc }) => {
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

  const video = useRef()

  useEffect(() => {
    if (!video.current) return
    video.current.play()
  }, [video])

  return (
    <HeroOuter data={{ heading, subheading, button }}>
      {videoSrc && (
        <Box
          as="video"
          ref={video}
          sx={{
            display: ['block', 'none'],
            position: 'absolute',
            zIndex: 10,
            height: 450,
            width: '100%',
            objectFit: 'cover',
          }}
          loop
          muted
        >
          <source src={videoSrc} type="video/mp4" />
        </Box>
      )}
      <Heading
        as="h1"
        sx={{
          position: 'absolute',
          zIndex: -100,
          color: 'cream',
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
  videoSrc: PropTypes.string,
}
