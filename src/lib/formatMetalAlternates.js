import path from 'path'

const encodeShopifyId = gid => {}

const getShopifyId = tag => {
  const productId = tag.replace('__metal-alternate-of:', '')
  const shopifyGid = `gid://shopify/Product/${productId}`
  const buff = Buffer.from(shopifyGid)
  const base64Gid = buff.toString('base64')
  return base64Gid
}

export const formatMetalAlternates = (tags = []) =>
  tags.filter(tag => tag.includes('__metal-alternate-of')).map(getShopifyId)
