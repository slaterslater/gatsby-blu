import { StaticImage } from 'gatsby-plugin-image'
import React, { useContext } from 'react'
import { Text, Flex, Image } from 'theme-ui'
import { ProductContext } from './ProductContext'
// import {x} from '../../images/badges/'

const allBadges = [
  'ethically-sourced',
  'hand-carved', // is this crafted amy likes carved better
  'made-in-canada',
  'recycled-materials',
]

const ProductBadges = () => {
  const {
    product: { tags },
  } = useContext(ProductContext)
  const badges = allBadges.filter(badge =>
    tags.some(tag => tag.toLowerCase().replace(/\s/g, '-') === badge)
  )
  console.log({ badges })
  if (!badges.length) return <></>
  // map the badges
  // grid or flex?
  return (
    <Flex>
      {badges.map(badge => (
        <StaticImage
          key={`image=${badge}`}
          src="../../images/badges/hand-carved.jpg"
          alt={`${badge} badge`}
          height={55}
          width={55}
        />
      ))}
    </Flex>
  )
}
// /Users/slaterslater/blu/bluboho-storefront/src/images/badges/hand-carved.jpg
export default ProductBadges
