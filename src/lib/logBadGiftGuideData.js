export const logBadGiftGuideData = (
  badHandles,
  guideHandle,
  giftCollections
) => {
  if (!badHandles.length) return
  const bad = badHandles.map(handle => {
    const info = {}
    const c = giftCollections.find(collection => {
      const box = collection.giftBoxes.find(({ products }) => {
        const prod = products.find(({ productHandles }) =>
          productHandles.includes(handle)
        )
        info.prodNum = products.indexOf(prod) + 1
        return prod
      })
      info.boxNum = collection.giftBoxes.indexOf(box) + 1
      return box
    })
    info.handle = handle
    info.collection = c.handle
    return info
  })

  const errors = bad
    .map(({ handle, collection, boxNum, prodNum }) => ({
      guideHandle,
      collection,
      box: boxNum,
      set: prodNum,
      handle,
    }))
  // const errors = bad
  //   .map(
  //     ({ handle, collection, boxNum, prodNum }) => `
  //     gift guide: ${guideHandle}
  //     collection: ${collection}
  //     box: ${boxNum}
  //     set: ${prodNum}
  //     handle: ${handle}\n`
  //   )
  //   .join('\n')

  // console.error(errors)
  return errors
}
