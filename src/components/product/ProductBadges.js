import React, { useContext } from 'react'
import { Flex, Image } from 'theme-ui'
import { ProductContext } from './ProductContext'

const allBadges = [
  'hand-carved',
  'antique-diamond',
  'artist-cut',
  'one-of-a-kind',
]

const ProductBadges = () => {
  const {
    product: { tags },
  } = useContext(ProductContext)
  const badges = allBadges.filter(badge =>
    tags.some(tag => tag.toLowerCase().replace(/\s/g, '-') === badge)
  )
  if (!badges.length) return <></>
  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      {badges.map(badge => (
        <Image
          key={`${badge}-badge`}
          src={`/badges/${badge}.jpg`}
          sx={{ height: 55, width: 55 }}
          mx={[3, 1, 2]}
        />
      ))}
    </Flex>
  )
}

export default ProductBadges
