import React, { useState } from 'react'
import { Heading, Flex, Box, Divider } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import MetalOptionSwatch from '../MetalOptionSwatch'

const getVariantMetalColor = (variant = {}) =>
  variant.selectedOptions?.find(opt => opt.name?.toLowerCase() === 'metal')
    ?.value

const MetalOption = ({ title, handle, metal, isCurrent, ...props }) => {
  if (!metal) return false

  if (isCurrent)
    return <MetalOptionSwatch isCurrent={isCurrent} metal={metal} {...props} />

  return (
    <ThemeLink aria-label={title} to={`/products/${handle}`} {...props}>
      <MetalOptionSwatch metal={metal} />
    </ThemeLink>
  )
}

const MetalOptions = ({ product, alternates }) => {
  const productMetalColor = getVariantMetalColor(product.variants?.[0])
  const [title, setTitle] = useState(productMetalColor)
  if (!productMetalColor) return false

  const alternateMetalColors = alternates.nodes.map(product => ({
    metal: getVariantMetalColor(product.variants[0]),
    isCurrent: false,
    handle: product.handle,
  }))

  const colors = [
    { metal: productMetalColor, isCurrent: true },
    ...alternateMetalColors,
  ].sort((a, b) => (a.metal?.toLowerCase() < b.metal?.toLowerCase() ? 1 : -1))

  return (
    <Box pt={3}>
      <Divider />
      <Box py={2}>
        <Heading as="h5" sx={{ fontSize: 3 }}>
          {title}
        </Heading>
        <Flex pt={2}>
          {colors.map(({ isCurrent, metal, handle }) => (
            <MetalOption
              title={title}
              key={`metal-option-${metal}`}
              {...{ isCurrent, metal, handle }}
              onMouseOver={() => setTitle(metal)}
              onMouseLeave={() => setTitle(productMetalColor)}
            />
          ))}
        </Flex>
      </Box>
      <Divider />
    </Box>
  )
}

export default MetalOptions
