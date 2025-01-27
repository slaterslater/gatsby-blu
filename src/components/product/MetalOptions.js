import React, { useContext, useMemo, useState } from 'react'
import { Flex } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import MetalOptionSwatch from '../MetalOptionSwatch'
import { ProductContext } from './ProductContext'
import { metals } from '../../data/metals'
import { useProductMetalColor } from '../../hooks/product'

const MetalOption = ({ title, handle, metal, text, isCurrent, ...props }) => {
  if (!metal) return false

  if (isCurrent)
    return <MetalOptionSwatch isCurrent={isCurrent} metal={metal} text={text} {...props} />

  return (
    <ThemeLink aria-label={title} to={`../${handle}`} sx={{textDecoration: 'none'}} {...props}>
      {/* <ThemeLink aria-label={title} to={`/products/${handle}`} {...props}> */}
      <MetalOptionSwatch metal={metal} text={text} />
    </ThemeLink>
  )
}

const MetalOptions = () => {
  const { product, alternates } = useContext(ProductContext)
  const productMetalColor = useProductMetalColor(product.options)
  const [title, setTitle] = useState(productMetalColor)

  const colors = useMemo(() => {
    if (!productMetalColor) return []
    const alternateMetalColors =
      alternates?.nodes
        .filter(alternate => {
          const prodId = product.id.replace('Shopify__Product__', '')
          return alternate !== null && alternate.id !== prodId
        })
        .map(alternate => ({
          metal: useProductMetalColor(alternate.options),
          isCurrent: false,
          handle: alternate.handle,
        }))
        .filter(alternate => alternate.metal) || []

    return [
      { metal: productMetalColor, isCurrent: true },
      ...alternateMetalColors,
    ].sort((a, b) => metals.indexOf(a.metal) - metals.indexOf(b.metal))
  }, [product, alternates, productMetalColor])

  return (
    <Flex>
      {colors?.map(({ isCurrent, metal, handle }) => (
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
