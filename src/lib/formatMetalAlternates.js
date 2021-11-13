const getShopifyId = tag => {
  const productId = tag.replace('__metal-alternate-of:', '')
  const shopifyGid = `gid://shopify/Product/${productId}`
  const buff = Buffer.from(shopifyGid)
  const base64Gid = buff.toString('base64')
  return base64Gid
}

export const formatMetalAlternatesFromTags = (tags = []) =>
  tags.filter(tag => tag.includes('__metal-alternate-of')).map(getShopifyId)

export const formatMetalAlternatesFromMetafields = (metafields = []) =>
  metafields
    .filter(field => field.key.startsWith('metal_option_'))
    .map(field => Buffer.from(field.value).toString('base64'))
