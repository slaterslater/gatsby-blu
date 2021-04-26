import React, { useMemo } from 'react'
import path from 'path-browserify'
import PropTypes from 'prop-types'
import { AspectImage, Image } from 'theme-ui'
import { original } from 'immer'

const defaultSizes = [400, 500, 600, 800]

export const getSrcWithSize = (src, size) => {
  const extName = path.extname(src)
  return src.replace(extName, `_${size}${extName}`)
}

export const useShopifyImageMeta = (image = {}) => {
  const { originalSrc, altText } = image
  const meta = []
  const fbThumb = getSrcWithSize(originalSrc, '1200x630_crop_center')
  meta.concat([
    { property: 'og:image', content: fbThumb },
    { property: 'og:image:height', content: 630 },
    { property: 'og:image:width', content: 1200 },
    { property: 'og:image:alt', content: altText },
  ])
  const twThumb = getSrcWithSize(originalSrc, '1200x1200_crop_center')
  meta.concat([
    { property: 'twitter:image', content: twThumb },
    { property: 'twitter:image:height', content: 1200 },
    { property: 'twitter:image:width', content: 1200 },
    { property: 'twitter:image:alt', content: altText },
  ])
  return meta
}

// export const useShopifyOgImage = src =>
//   getSrcWithSize(src,

const useShopifyImageCDNSizes = (originalSrc, sizes = defaultSizes) =>
  useMemo(() => {
    const sizesWithRetina = Array.from(
      new Set([
        ...sizes,
        ...sizes.map(size => size * 2),
        ...sizes.map(size => size * 3),
      ])
    )
    const baseSrc = getSrcWithSize(originalSrc, `${sizes[0]}x`)

    const formattedSrcSet = sizesWithRetina.map(
      width => `${getSrcWithSize(originalSrc, `${width}x`)} ${width}w`
    )

    return [baseSrc, formattedSrcSet]
  }, [sizes, originalSrc])

const RemoteShopifyImage = ({
  originalSrc,
  ratio,
  sizes,
  altText,
  ...props
}) => {
  const [src, srcSet] = useShopifyImageCDNSizes(originalSrc, sizes)

  if (ratio)
    return (
      <AspectImage
        ratio={ratio}
        src={src}
        srcSet={srcSet}
        alt={altText}
        {...props}
      />
    )

  return <Image src={src} srcSet={srcSet} alt={altText} {...props} />
}

RemoteShopifyImage.defaultProps = {
  sizes: defaultSizes,
  altText: '',
}

RemoteShopifyImage.propTypes = {
  originalSrc: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number),
  altText: PropTypes.string,
}

export default RemoteShopifyImage
