import React, { useContext, useEffect, createContext } from 'react'
import { useQuery } from 'urql'
import { useImmer } from 'use-immer'
import { getProduct } from '../../hooks/product'
import { PRODUCT_QUERY } from '../../queries/product'
import { CurrencyContext } from '../../contexts/CurrencyContext'

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

const getInitialOptionValues = (product = { options: [] }) => {
  const selectedOptions = getInitialSelectedOptions(product.options)

  return { selectedOptions }
}

const ProductProvider = ({ initial, handle, ...props }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle, countryCode },
  })
  // const product = useLatestProduct({
  //   handle: data.shopifyProduct.handle,
  //   initial: data.shopifyProduct,
  // })

  const [value, updateValue] = useImmer({
    product: initial,
    selectOption: () => {},
    quantity: 1,
    selectedVariant: undefined,
    ...getInitialOptionValues(initial),
  })

  // update product from async request
  // get
  useEffect(() => {
    if (data) {
      const latestProduct = getProduct(data.product)
      updateValue(draft => {
        draft.product = latestProduct
        draft.selectedVariant = getSelectedVariant(
          draft.selectedOptions,
          latestProduct.variants
        )
      })
    }
  }, [data, updateValue])

  const selectOption = (name, value, quantity = 1) => {
    // update selected options
    updateValue(draft => {
      draft.selectedOptions[name] = value
      draft.quantity = quantity
      // set variant if the options
      draft.selectedVariant = getSelectedVariant(
        draft.selectedOptions,
        draft.product.variants
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
