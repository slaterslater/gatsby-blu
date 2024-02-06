import React, { useContext, useEffect, createContext, useState } from 'react'
import { useQuery } from 'urql'
import { useImmer } from 'use-immer'
import { getProduct } from '../../hooks/product'
import { PRODUCT_QUERY } from '../../queries/product'
import { CurrencyContext } from '../../contexts/CurrencyContext'

export const ProductContext = createContext({})

const getInitialSelectedOptions = options =>
  options?.reduce(
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

const ProductProvider = ({
  initial,
  handle,
  alternates,
  pickers,
  badges,
  stack,
  isBeloved,
  ...props
}) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle, countryCode },
  })

  const [value, updateValue] = useImmer({
    product: initial,
    selectOption: () => {},
    quantity: 1,
    selectedVariant: undefined,
    ...getInitialOptionValues(initial),
    customAttributes: [],
    setCustomAttributes: () => {},
    alternates,
    pickers,
    badges,
    stack,
    isBeloved,
  })

  // update product from async request
  useEffect(() => {
    if (!data) return
    const newData = getProduct(data.product)
    // latestProduct has fewer metafields than initial...
    const latestProduct = {
      ...initial,
      ...newData,
      metafields: initial.metafields,
    }
    updateValue(draft => {
      draft.product = latestProduct
      draft.selectedVariant = getSelectedVariant(
        draft.selectedOptions,
        latestProduct.variants
      )
    })
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

  // const setCustomAttributes = (name, content) => {
  const setCustomAttributes = newAttribute => {
    updateValue(draft => {
      const customAttribute = draft.customAttributes.find(
        ({ key }) => key === newAttribute.key
      )
      if (!customAttribute && !newAttribute.value) return
      if (customAttribute) {
        if (!newAttribute.value) {
          draft.customAttributes = draft.customAttributes.filter(
            attribute => attribute !== customAttribute
          )
        } else {
          customAttribute.value = newAttribute.value
        }
      } else {
        draft.customAttributes.push(newAttribute)
      }
    })
  }

  useEffect(() => {
    updateValue(draft => {
      draft.selectOption = selectOption
      draft.setCustomAttributes = setCustomAttributes
    })
  }, [])

  return <ProductContext.Provider value={value} {...props} />
}

export default ProductProvider
