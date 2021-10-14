import { useState, useEffect } from 'react'
import camelCaseRecursive from 'camelcase-keys-recursive'
import axios from 'axios'

export const useAdminProductId = hashedId => {
  const [productId, setId] = useState('')

  useEffect(() => {
    const id = atob(hashedId.replace('Shopify__Product__', ''))
    const [adminNumber] = id.split('/').slice(-1)
    setId(adminNumber)
  }, [])

  return productId
}

export const yotpoFetcher = (path, resourceName = 'reviews') =>
  axios.get(path).then(res => {
    if (res.data?.response?.[resourceName]) {
      const camelizedResource = res.data.response[resourceName].map(resource =>
        camelCaseRecursive(resource)
      )
      return {
        ...res,
        data: {
          ...res.data,
          response: {
            ...res.data.response,
            [resourceName]: camelizedResource,
          },
        },
      }
    }
    return res
  })
