import btoa from 'btoa'

const formatIdStr = str => (typeof window !== 'undefined' ? str : btoa(str))

const getShopifyId = tag => {
  const productId = tag.replace('__metal-alternate-of:', '')
  const shopifyGid = `gid://shopify/Product/${productId}`
  // return formatIdStr(shopifyGid)
  return shopifyGid
}

export const formatMetalAlternatesFromTags = (tags = []) =>
  tags.filter(tag => tag.includes('__metal-alternate-of')).map(getShopifyId)

export const formatMetalAlternatesFromMetafields = (metafields = []) => {
  const metalOptions = metafields.find(({key}) => key === 'metal_options')
  if (metalOptions) return JSON.parse(metalOptions.value)
  return metafields
    .filter(field => field.key.startsWith('metal_option_'))
    .map(field => field.value)
}