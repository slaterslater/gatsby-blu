import React, { useContext } from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import { useQuery } from 'urql'
import PropTypes from 'prop-types'
import { ALTERNATES_QUERY } from '../../queries/product'
import { ProductContext } from './ProductContext'
import ThemeLink from '../app/ThemeLink'

const ColorSwatch = ({ swatch }) => {
  const { title, isCurrent, color, handle } = swatch
  return (
    <ThemeLink title={title} to={`/products/${handle}`}>
      <Box
        sx={{
          borderRadius: '50%',
          border: '1px solid',
          borderColor: isCurrent ? '#c4c4c4' : 'transparent',
          height: 22,
          width: 22,
        }}
      >
        <Box
          sx={{
            bg: color,
            height: 20,
            width: 20,
            border: '2px solid',
            borderColor: 'white',
            borderRadius: '50%',
          }}
        />
      </Box>
    </ThemeLink>
  )
}

ColorSwatch.propTypes = {
  swatch: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
  }).isRequired,
}

const ColorOptions = () => {
  const {
    product: { title, handle, metafields, productColor, colorAlternates },
  } = useContext(ProductContext)
  const currentProductColor = productColor?.value
  const ids = colorAlternates ? JSON.parse(colorAlternates.value) : []
  const [{ data }] = useQuery({
    query: ALTERNATES_QUERY,
    variables: { ids },
  })

  const initialProductColor = metafields.some(
    ({ key }) => key === 'product_color'
  )

  if (!initialProductColor) return <></>

  const swatches = data?.nodes
    .filter(node => !!node)
    .map(node => ({
      title: node.title,
      color: node.productColor?.value || 'error',
      isCurrent: false,
      handle: node.handle,
    }))
    .filter(({ color }) => color !== currentProductColor)
    .concat([
      {
        title,
        handle,
        color: currentProductColor,
        isCurrent: true,
      },
    ])
    .sort((a, b) => (a.color > b.color ? 1 : -1))

  return (
    <Box>
      <Flex sx={{ gap: 3, alignItems: 'baseline' }} pb={4}>
        <Heading as="div" variant="caps" sx={{ fontSize: 9 }}>
          select colour
        </Heading>
      </Flex>
      <Flex>
        {swatches?.map(swatch => (
          <ColorSwatch key={swatch.handle} swatch={swatch} />
        ))}
      </Flex>
    </Box>
  )
}

export default ColorOptions
