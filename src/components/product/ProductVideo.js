// /src/components/product/ProductVideo.js

import React, { useEffect, useRef } from 'react'
import { Box } from 'theme-ui'
import PropTypes from 'prop-types'

const ProductVideo = ({ video, enableTogglePlayback = false }) => {
  const videoElement = useRef()

  useEffect(() => {
    videoElement.current.play()
    videoElement.current.classList.toggle('playing')
  }, [video])

  const toggleVideoPlayback = () => {
    if (!enableTogglePlayback) return
    const videoPlayer = videoElement.current
    if (videoPlayer.classList.contains('playing')) {
      videoPlayer.pause()
      videoPlayer.classList.toggle('playing')
    } else {
      videoPlayer.play()
      videoPlayer.classList.toggle('playing')
    }
  }

  return (
    <Box
      as="video"
      sx={{ width: '100%' }}
      loop
      muted
      ref={videoElement}
      onClick={toggleVideoPlayback}
    >
      {video.sources.map(({ url, format }, i) => (
        <source key={`source-${i}`} src={url} type={`video/${format}`} />
      ))}
    </Box>
  )
}

ProductVideo.propTypes = {
  video: PropTypes.shape({
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        format: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
  enableTogglePlayback: PropTypes.bool,
}

export default ProductVideo
