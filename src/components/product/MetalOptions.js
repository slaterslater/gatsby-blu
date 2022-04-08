import React, { useContext, useMemo, useState } from 'react'
import { Flex } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import MetalOptionSwatch from '../MetalOptionSwatch'
import { ProductContext } from './ProductContext'

const getMetalColor = (options = []) =>
  options
    .find(({ name }) => name?.toLowerCase() === 'metal')
    ?.values[0].toLowerCase()

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

const MetalOptions = ({ alternates }) => {
  const { product } = useContext(ProductContext)
  const productMetalColor = getMetalColor(product.options)
  const [title, setTitle] = useState(productMetalColor)

  const colors = useMemo(() => {
    if (!productMetalColor) return []
    const metal = ['yellow gold', 'rose gold', 'white gold', 'sterling silver']
    const alternateMetalColors =
      alternates?.nodes
        .filter(alternate => {
          const prodId = product.id.replace('Shopify__Product__', '')
          return alternate !== null && alternate.id !== prodId
        })
        .map(alternate => ({
          metal: getMetalColor(alternate.options),
          isCurrent: false,
          handle: alternate.handle,
        }))
        .filter(alternate => alternate.metal) || []

    return [
      { metal: productMetalColor, isCurrent: true },
      ...alternateMetalColors,
    ].sort((a, b) => metal.indexOf(a.metal) - metal.indexOf(b.metal))
  }, [product, alternates, productMetalColor])

  if (!productMetalColor || !colors?.length) return false

  return (
    <Flex>
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
  )
}

export default MetalOptions
