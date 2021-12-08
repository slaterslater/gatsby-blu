import { Box, Grid } from 'theme-ui'
import { GatsbyImage, withArtDirection } from 'gatsby-plugin-image'
import React from 'react'
import PropTypes from 'prop-types'
import { RiNurseFill } from 'react-icons/ri'
import { HeroOuter } from '../content/Hero'

const HomePageHeader = ({ data }) => {
  const { heading, subheading, button, image1, image2, imageMobile } = data

  const [image1Data, image2Data, mobileImageData] = [
    image1,
    image2,
    imageMobile,
  ].map(img => img?.asset.gatsbyImageData)

  const artDirectedImages = mobileImageData
    ? withArtDirection(image1Data, [
        {
          media: '(max-width: 40em)',
          image: mobileImageData,
        },
      ])
    : image1Data
  return (
    // <HeroOuter
    //   heading={heading}
    //   subheading={subheading}
    //   button={{ text: button.text, path: button.path }}
    //   align="right"
    // >
    <HeroOuter
      data={{ heading, subheading, button }}
      // heading={heading}
      // subheading={subheading}
      // button={{ text: button.text, path: button.path }}
      // align="right"
    >
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
  heading: PropTypes.string,
  subheading: PropTypes.string,
  button: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.object),
}
