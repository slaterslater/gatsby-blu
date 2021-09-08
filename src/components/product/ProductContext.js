import React, { useEffect, createContext } from 'react'
import { useImmer } from 'use-immer'

export const ProductContext = createContext({})

const getInitialSelectedOptions = options =>
  options.reduce(
    (acc, el) => ({
      ...acc,
      [el.name]: el.values.length === 1 ? el.values[0] : null,
    }),
    {}
  )

const getSelectedVariant = (selectedOptions = {}, variants = []) =>
  variants.find(variant =>
    Object.keys(selectedOptions).reduce((acc, optionName) => {
      if (!acc) return false

      return variant.selectedOptions.find(
        variantOption => variantOption.value === selectedOptions[optionName]
      )
    }, true)
  )

const getInitialOptionValues = (options = [], variants = []) => {
  const selectedOptions = getInitialSelectedOptions(options)
  const selectedVariant = getSelectedVariant(selectedOptions, variants)

  return { selectedOptions, selectedVariant }
}

const ProductProvider = ({ product, ...props }) => {
  const [value, updateValue] = useImmer({
    product,
    selectOption: () => {},
    ...getInitialOptionValues(product.options, product.variants),
  })

  useEffect(() => {
    updateValue(draft => {
      draft.product = product
    })
  }, [product, updateValue])

  const selectOption = (name, value) => {
    // update selected options
    updateValue(draft => {
      draft.selectedOptions[name] = value
      // set variant if the options
      draft.selectedVariant = getSelectedVariant(
        draft.selectedOptions,
        product.variants
      )
    })
  }

  useEffect(() => {
    updateValue(draft => {
      draft.selectOption = selectOption
    })
  }, [])

  return <ProductContext.Provider value={value} {...props} />
}

export default ProductProvider
