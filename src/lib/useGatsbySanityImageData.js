import { useMemo } from 'react'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import sanityConfig from './sanityConfig'

export function getGastbyImageDataWithOptions(image, options = {}) {
  const imageData = getGatsbyImageData(image, options, sanityConfig)

  if (options.q) {
    imageData.images.fallback.srcSet = imageData.images.fallback.srcSet
      .split(',')
      .map(src => {
        const [url, size] = src.split(' ')
        return [`${url}&q=${options.q}`, size].join(' ')
      })
      .join(',')
  }

  return imageData
}

export default function useGatsbySanityImageData(image, options = {}) {
  return useMemo(() => {
    if (!image) return undefined
    return getGastbyImageDataWithOptions(image, options)
  }, [JSON.stringify(image)])
}
