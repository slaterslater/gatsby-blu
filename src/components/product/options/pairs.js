import React, { useEffect, useContext } from 'react'
import { Flex } from 'theme-ui'
import { ProductContext } from '../ProductContext'
import VariantOption from './option'

const getFirstOptionNameAndValue = options => [
  options[0].name,
  options[0].values[0],
]

// this component assumes there is only one variant
// we use the first variant
const PairsOptions = props => {
  const {
    product: { options, variants },
    selectOption,
    quantity,
  } = useContext(ProductContext)

  const [variant] = variants
  const [name, value] = getFirstOptionNameAndValue(options)
  const { quantityAvailable } = variant

  // when we get variant quantity available, select pair if available
  useEffect(() => {
    if (quantityAvailable || 0 >= 2) {
      selectOption(name, value, 2)
    }
  }, [quantityAvailable])

  return (
    <Flex
      sx={{
        flexWrap: 'wrap',
      }}
      m={-1}
    >
      <VariantOption
        isSelected={quantity === 1}
        onClick={() => selectOption(name, value, 1)}
        m={1}
      >
        single
      </VariantOption>
      <VariantOption
        isSelected={quantity === 2}
        onClick={() => selectOption(name, value, 2)}
        disabled={variant.quantityAvailable < 2}
        m={1}
      >
        pair
      </VariantOption>
    </Flex>
  )
}

export default PairsOptions
