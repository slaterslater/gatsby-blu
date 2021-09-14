import React, { useContext } from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import { ProductContext } from '../ProductContext'
import VariantOption from './option'
import PairsOptions from './pairs'

const ProductOptions = () => {
  const {
    product: { options, offersPairs },
    selectOption,
    selectedOptions,
  } = useContext(ProductContext)

  // if we only have one variant, don't show options
  if (options[0].length < 2 && options[0].values.length < 2) return false

  if (offersPairs && offersPairs.value === 'true') return <PairsOptions />

  return options.map(({ name, values }) => {
    // if there's only one option value, don't show the option row
    if (values.length < 2) return false

    return (
      <Box key={`option-row-${name}`}>
        <Heading
          as="h5"
          sx={{ fontSize: 3, textTransform: 'lowercase' }}
          pb={4}
        >
          select {name}
        </Heading>
        <Flex
          sx={{
            flexWrap: 'wrap',
          }}
          m={-1}
        >
          {values.map(value => (
            <VariantOption
              key={`variant-option-${name}-${value}`}
              isSelected={selectedOptions[name] === value}
              onClick={() => selectOption(name, value)}
              m={1}
            >
              {value}
            </VariantOption>
          ))}
        </Flex>
      </Box>
    )
  })
}

export default ProductOptions
