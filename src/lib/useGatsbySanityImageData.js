import { useMemo } from 'react'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import sanityConfig from './sanityConfig'

export function getGastbyImageDataWithOptions(image, options = {}) {
  const imageData = getGatsbyImageData(image, options, sanityConfig)

  if (options.q) {
    // can't split on , because there can be commas in the image URL
    // split on w, because each srcset entry ends in a width followed by a comma
    imageData.images.fallback.srcSet = imageData.images.fallback.srcSet
      .split('w,')
      .map(src => {
        const [url, size] = src.split(' ')
        return [`${url}&q=${options.q}`, size].join(' ')
      })
      .join('w,')
  }

  return imageData
}

export default function useGatsbySanityImageData(image, options = {}) {
  return useMemo(() => {
    if (!image) return undefined
    return getGastbyImageDataWithOptions(image, options)
  }, [JSON.stringify(image)])
}
