import React from 'react'
import ThemeLink from '../app/ThemeLink'
import MetalOptionSwatch from '../MetalOptionSwatch'

const useVariantMetalColour = (variant = {}) =>
  variant.selectedOptions?.find(opt => opt.name?.toLowerCase() === 'metal')

const MetalAlternate = ({ product }) => {
  const metalOption = useVariantMetalColour(product.variants?.[0] || {})

  if (metalOption) {
    return <MetalOptionSwatch metal={metalOption.value} />
  }

  return null

  // get alternate colour
}

const MetalAlternateLinks = ({ alternates }) => {
  if (!alternates.nodes.length) return false
  return alternates.nodes.map(alternate => (
    <ThemeLink
      to={`/products/${alternate.handle}`}
      key={`alternate-${alternate.id}`}
    >
      <MetalAlternate product={alternate} key={alternate.id} />
    </ThemeLink>
  ))
}

export default MetalAlternateLinks
