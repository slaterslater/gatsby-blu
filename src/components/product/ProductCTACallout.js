import React, { useContext } from 'react'
import { Flex, Box, Text } from 'theme-ui'
import { AiFillInfoCircle } from 'react-icons/ai'
import { ProductContext } from './ProductContext'

export const CalloutBox = ({
  icon: Icon,
  title,
  description,
  bg,
  color,
  ...props
}) => (
  <Box {...props}>
    <Flex p={4} sx={{ bg, color, alignItems: 'flex-start' }}>
      {Icon && (
        <Box as={Icon} size={28} color={color} mr={2} sx={{ flexShrink: 0 }} />
      )}
      <Box ml={2}>
        {title && (
          <Text as="h4" pb={1} variant="caps">
            {title}
          </Text>
        )}
        {description && (
          <Text
            as="p"
            pr={4}
            sx={{ color: 'darkerGray', fontSize: 0, whiteSpace: 'pre-line' }}
          >
            {description}
          </Text>
        )}
      </Box>
    </Flex>
  </Box>
)

const ProductCTACallout = props => {
  const {
    product: { tags },
    selectedVariant,
  } = useContext(ProductContext)

  const mto = tags.includes('made-to-order')
  const usd = tags.some(tag => tag.toLowerCase() === 'usd')
  // const isSize10 = selectedVariant?.selectedOptions?.some(
  //   ({ name, value }) => name.toLowerCase() === 'size' && value === '10'
  // )
  const isSize10 = false

  if (!mto && !usd && !isSize10) return null

  const description = []
  if (mto || isSize10)
    description.push(
      `this piece is a final sale\nplease allow 6 - 8 weeks for production and delivery`
    )
  if (usd) description.push('item will be charged in USD')
  return (
    <CalloutBox
      icon={AiFillInfoCircle}
      title="This Piece is a Special Order"
      description={description.join(`\n\n`)}
      bg="cream"
      {...props}
    />
  )
}

export default ProductCTACallout
