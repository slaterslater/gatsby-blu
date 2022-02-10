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
  const [baseSize, fractionSize] = size
  const shouldDisplayFractions =
    baseSize && metafields.some(({ key }) => key === 'fractional_sizes')

  const updateProductSizeAttribute = async (value, fraction) => {
    if (value !== baseSize) await selectOption(name, value)
    const custom = fraction ? `${value}${fraction}` : fraction
    await setCustomAttributes({
      key: 'size',
      value: custom,
    })
    setSize([value, fraction])
  }

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
          <Flex sx={{ flexDirection: 'column', flex: 1 }}>
            <VariantOption
              key={`variant-option-size-${value}`}
              isSelected={baseSize === value && !fractionSize}
              onClick={() => {
                updateProductSizeAttribute(value, null)
              }}
              m={1}
            >
              {value}
            </VariantOption>
            {shouldDisplayFractions &&
              ['¼', '½'].map(fraction => (
                <VariantOption
                  key={`variant-option-${value}-${fraction}`}
                  isSelected={baseSize === value && fractionSize === fraction}
                  isHidden={baseSize !== value}
                  onClick={() => {
                    if (baseSize !== value) return
                    updateProductSizeAttribute(value, fraction)
                  }}
                  m={1}
                  mt={-1}
                >
                  <Flex
                    sx={{
                      justifyContent: 'center',
                    }}
                  >
                    {value}
                    <sup
                      style={{
                        fontSize: '9px',
                        width: '6px',
                        lineHeight: '0.8',
                      }}
                    >
                      {fraction}
                    </sup>
                  </Flex>
                </VariantOption>
              ))}
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default ProductSizes
