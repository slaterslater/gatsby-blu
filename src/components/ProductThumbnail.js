import React from 'react'
import path from 'path-browserify'
import { Image } from 'theme-ui'

const getSrcWithSize = (src, size) => {
  const extName = path.extname(src)
  return src.replace(extName, `_${size}${extName}`)
}

const ProductThumbnail = ({ url, alt }) => {
  const srcs = [200, 400, 600].map(
    width => `${getSrcWithSize(url, `${width}x`)} ${width}w`
  )

  return <Image src={srcs[0]} srcSet={srcs.join(', ')} alt={alt} />
}

export default ProductThumbnail
