import React from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import VariantOption from './VariantOption'

const OptionRow = ({ name, values, onSelect, selectedOption }) => {
  if (values.length < 2) return false

  return (
    <Box>
      <Heading as="h5" sx={{ fontSize: 3, textTransform: 'lowercase' }} pb={4}>
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
            isSelected={selectedOption === value}
            onClick={() => onSelect(name, value)}
            m={1}
          >
            {value}
          </VariantOption>
        ))}
      </Flex>
    </Box>
  )
}

const ProductOptions = ({ options, onSelect, selectedOptions }) => {
  if (options[0].length < 2 && options[0].values.length < 2) return false
  return options.map(option => (
    <OptionRow
      name={option.name}
      values={option.values}
      onSelect={onSelect}
      selectedOption={selectedOptions[option.name]}
      key={`option-row-${option.name}`}
    />
  ))
}

export default ProductOptions
