import React, { useMemo } from 'react'
import path from 'path-browserify'
import PropTypes from 'prop-types'
import { AspectImage, Image } from 'theme-ui'

const defaultSizes = [400, 500, 600, 800]

const getSrcWithSize = (src, size) => {
  const extName = path.extname(src)
  return src.replace(extName, `_${size}${extName}`)
}

const useShopifyImageCDNSizes = (originalSrc, sizes = defaultSizes) =>
  useMemo(() => {
    const baseSrc = getSrcWithSize(originalSrc, `${sizes[0]}x`)

    const formattedSrcSet = sizes.map(
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
