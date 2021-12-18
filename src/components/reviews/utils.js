import { decode } from 'shopify-gid'
import camelCaseRecursive from 'camelcase-keys-recursive'
import axios from 'axios'

export const useAdminProductId = hashedId => {
  const { id } = decode(hashedId.replace('Shopify__Product__', ''))
  return id
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
