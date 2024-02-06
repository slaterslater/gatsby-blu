import { React, useContext } from 'react'
import { useQuery } from 'urql'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Box, Link } from 'theme-ui'
import { useLocation } from '@reach/router'
import { ProductContext } from './ProductContext'
import { PRODUCT_PICKER_QUERY } from '../../queries/product'
import { MobileSlider } from '../content/CollectionRow'
import { useShopifyImage } from '../../hooks/shopifyImage'

const SIZE = 50

const ProductPickerRows = () => {
  const { pickers } = useContext(ProductContext)
  if (!pickers.length) return null
  return pickers.map((picker, i) => (
    <PickerRow key={`picker-${i}`} ids={picker.ids} />
  ))
}

export default ProductPickerRows

const PickerRow = ({ ids }) => {
  const { pathname } = useLocation()

  const [{ data }] = useQuery({
    query: PRODUCT_PICKER_QUERY,
    variables: { ids },
  })
  if (!data) return null

  const { nodes } = data
  const start = nodes.findIndex(
    ({ handle }) => pathname === `/products/${handle}`
  )
  return (
    <MobileSlider
      minCardWidth={SIZE}
      nodes={data.nodes.map((product, i) => (
        <PickerProduct
          key={product.handle}
          product={product}
          isActive={i === start}
        />
      ))}
      gap={1}
      start={start}
    />
  )
}

const PickerProduct = ({ product, isActive }) => {
  const { images, handle, title, availableForSale } = product
  const [image] = images.nodes
  const imageData = useShopifyImage({ image, width: SIZE, height: SIZE })
  return (
    <Link
      as={GatsbyLink}
      to={`/products/${handle}`}
      title={title}
      sx={{
        display: 'block',
        border: '1px solid',
        borderColor: isActive ? 'primary' : 'cream',
        height: SIZE,
        width: SIZE,
        overflowY: 'hidden',
        bg: 'primary',
      }}
    >
      <Box sx={{ opacity: availableForSale ? 1 : 0.5 }}>
        <GatsbyImage image={imageData} alt={title} />
      </Box>
    </Link>
  )
}

PickerRow.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
}

PickerProduct.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.object,
    handle: PropTypes.string,
    title: PropTypes.string,
    availableForSale: PropTypes.bool,
  }),
  isActive: PropTypes.bool,
}
