import React, { useMemo } from 'react'
import path from 'path-browserify'
import PropTypes from 'prop-types'
import { AspectImage, Image } from 'theme-ui'

const getSrcWithSize = (src, size) => {
  const extName = path.extname(src)
  return src.replace(extName, `_${size}${extName}`)
}

const RemoteShopifyImage = ({
  originalSrc,
  sizes,
  ratio,
  altText,
  ...props
}) => {
  const [src, srcSet] = useMemo(() => {
    const sizesArray = sizes.split(',')

    const baseSrc = getSrcWithSize(originalSrc, `${sizesArray[0]}x`)

    const formattedSrcSet = sizesArray.map(
      width => `${getSrcWithSize(originalSrc, `${width}x`)} ${width}w`
    )

    return [baseSrc, formattedSrcSet]
  }, [sizes, originalSrc])

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
  sizes: '400,500,600,800',
  altText: '',
}

RemoteShopifyImage.propTypes = {
  originalSrc: PropTypes.string.isRequired,
  sizes: PropTypes.string,
  altText: PropTypes.string,
}

export default RemoteShopifyImage
