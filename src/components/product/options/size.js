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

  const updateProductSizeAttribute = async (value, fraction) => {
    await selectOption(name, value)
    await setCustomAttributes({
      key: 'fraction',
      value: fraction,
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
          <VariantOption
            key={`variant-option-size-${value}`}
            isSelected={mainSize === value && !fractionSize}
            onClick={() => {
              updateProductSizeAttribute(value, null)
              // selectOption(name, value)
              // setSize([value, null])
            }}
            m={1}
          >
            {value}
          </VariantOption>
        ))}
      </Flex>
      {shouldDisplayFractions &&
        ['¼', '½'].map(fraction => (
          <Flex
            sx={{
              flexWrap: 'wrap',
            }}
            m={-1}
          >
            {values.map(value => (
              <VariantOption
                key={`variant-option-${value}-${fraction}`}
                isSelected={mainSize === value && fractionSize === fraction}
                isHidden={mainSize !== value}
                onClick={() => {
                  if (mainSize !== value) return
                  setCustomAttributes({
                    key: 'fraction',
                    value: fraction,
                  })
                  setSize([value, fraction])
                }}
                m={1}
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
                      lineHeight: '0.5',
                    }}
                  >
                    {fraction}
                  </sup>
                </Flex>
              </VariantOption>
            ))}
          </Flex>
        ))}
    </Box>
  )
}

export default ProductSizes
