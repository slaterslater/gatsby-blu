import { Box, Grid, Heading } from 'theme-ui'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { HeroOuter } from '../content/Hero'

const Video = ({ video, ...props }) => {
  const videoRef = useRef()

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.playbackRate = 0.5
    videoRef.current.play()
  }, [videoRef])

  return (
    <Box
      as="video"
      ref={videoRef}
      sx={{
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        objectFit: 'cover',
        ...(props.sx || {}),
      }}
      loop
      muted
      playsInline
      autoPlay={false}
      controls={false}
      preload="auto"
    >
      <Box as="source" src={video.asset.url} type="video/mp4" />
    </Box>
  )
}

const HomePageHeader = ({ data, video }) => {
  const { heading, subheading, button, image1, imageMobile } = data

  const [image1Data, mobileImageData] = [image1, imageMobile].map(
    img => img?.asset.gatsbyImageData
  )

  const { mobileVideo, desktopVideo } = video || {}

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
      {mobileVideo && (
        <Video
          video={mobileVideo}
          sx={{ display: ['block', 'none'], height: 450 }}
        />
      )}
      {desktopVideo && (
        <Video
          video={desktopVideo}
          sx={{ display: ['none', 'block'], height: 600 }}
        />
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
  video: PropTypes.object,
}
Video.propTypes = {
  video: PropTypes.object,
}
