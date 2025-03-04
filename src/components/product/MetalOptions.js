import React, { useContext, useMemo, useState } from 'react'
import { Flex, Grid } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'
import MetalOptionSwatch from '../MetalOptionSwatch'
import { ProductContext } from './ProductContext'
import { metals } from '../../data/metals'
import { useProductMetalColor } from '../../hooks/product'
import { useMetafieldValue } from '../../hooks/useMetafield'

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
  const productMetalText = useMetafieldValue('metal_option_text', product.metafields)

  const colors = useMemo(() => {
    if (!productMetalColor) return []
    const alternateMetalColors =
      alternates?.nodes
        .map(alternate => ({
          metal: useProductMetalColor(alternate.options),
          isCurrent: false,
          handle: alternate.handle,
          text: alternate.metafield?.value
        }))
        .filter(alternate => alternate.metal) || []

    return [
      { metal: productMetalColor, text: productMetalText, isCurrent: true },
      ...alternateMetalColors,
    ].sort((a, b) => {
      const metalComparison = metals.indexOf(a.metal) - metals.indexOf(b.metal);
      if (metalComparison !== 0) return metalComparison;
      return (a.text ?? "").localeCompare(b.text ?? "");
    });
  }, [product, alternates, productMetalColor])

  return (
    <Grid sx={{
      height: 26,
      gridTemplateColumns: 'repeat(auto-fit, 26px)',
      gap: '2px',
    }}>
      {colors?.map(({ isCurrent, metal, text, handle }) => (
        <MetalOption
          title={title}
          key={`metal-option-${metal}`}
          {...{ isCurrent, metal, text, handle }}
          onMouseOver={() => setTitle(metal)}
          onMouseLeave={() => setTitle(productMetalColor)}
        />
      ))}
    </Grid>
  )
}

export default MetalOptions
