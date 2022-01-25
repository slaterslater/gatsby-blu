import React, { useContext, useState } from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import { ProductContext } from '../ProductContext'
import VariantOption from './option'
import SizingHelp from '../SizingHelp'

const ProductSizes = ({ option }) => {
  const { name, values } = option
  const {
    selectOption,
    setCustomAttributes,
    product: { metafields },
  } = useContext(ProductContext)
  const [size, setSize] = useState([])
  const [mainSize, fractionSize] = size
  const shouldDisplayFractions =
    mainSize && metafields.some(({ key }) => key === 'fractional_sizes')

  return (
    <Box key="option-row-size">
      <Flex sx={{ gap: 3, alignItems: 'baseline' }} pb={4}>
        <Heading as="div" variant="caps" sx={{ fontSize: 9 }}>
          select size
        </Heading>
        <SizingHelp />
      </Flex>
      <Flex
        sx={{
          flexWrap: 'wrap',
        }}
        m={-1}
      >
        {values.map(value => (
          <VariantOption
            key={`variant-option-size-${value}`}
            isSelected={mainSize === value}
            onClick={() => {
              selectOption(name, value)
              setSize([value, null])
            }}
            m={1}
          >
            {value}
          </VariantOption>
        ))}
      </Flex>
      <Flex
        sx={{
          flexWrap: 'wrap',
        }}
        pt={1}
        m={-1}
      >
        {shouldDisplayFractions &&
          [0, 0.25, 0.5].map(value => (
            <VariantOption
              key={`variant-option-fraction-${value}`}
              isSelected={
                fractionSize === value || (!fractionSize && value === 0)
              }
              onClick={() => {
                setCustomAttributes({
                  key: 'fraction',
                  value: String(value),
                })
                setSize([mainSize, value])
              }}
              m={1}
            >
              {Number(mainSize) + value}
            </VariantOption>
          ))}
      </Flex>
    </Box>
  )
}

export default ProductSizes
