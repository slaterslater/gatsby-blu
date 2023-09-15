import React, { useMemo } from 'react'
import { Box } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import CollectionProduct from '../CollectionProduct'
import CollectionProductGroup from '../CollectionProductGroup'
// import BookAConsultationCallout from '../content/BookAConsultationCallout'
import { useShopifyImage } from '../../hooks/shopifyImage'
// import ContemplationCard from '../product/ProductContemplationCard'
import CollectionContemplationCard from './CollectionContemplationCard'

const CollectionImage = ({ image, tall = false }) => {
  const imageData = useShopifyImage({
    image,
    width: 715,
    height: tall ? 900 : 445,
  })
  return <GatsbyImage image={imageData} alt="" />
}

const ProductGrid = ({
  products,
  collectionTitle,
  collectionPath,
  title,
  description,
  collectionImages,
  allowQuickAdd,
  badges,
  card,
}) => {
  // determine max num of images to show based on sortedProducts length
  // calculate order to insert images into product grid
  const orderedImages = useMemo(() => {
    const prodLen = products.length
    const colImgLen = collectionImages?.length
    if (!colImgLen) return []

    const collectionImageOrder = i => {
      const n = i % 4
      const x = n ? n + 1 : 5
      return i * 5 + x
    }

    let imageNum = Math.floor(prodLen / 10) * 2
    if ([8, 9].some(n => n === prodLen % 10)) imageNum += 1
    imageNum = colImgLen > imageNum ? imageNum : colImgLen

    return Array.from({ length: imageNum }).map((_, i) => ({
      ...collectionImages[i],
      order: collectionImageOrder(i),
    }))
  }, [products, collectionImages])

  return (
    <CollectionProductGroup title={title} key={collectionTitle}>
      {products.map((product, i) => (
        <Box key={product.id} sx={{ order: i }}>
          <CollectionProduct
            product={product}
            images={product.images}
            collectionTitle={collectionTitle}
            collectionPath={collectionPath}
            allowQuickAdd={allowQuickAdd}
            badges={badges}
          />
        </Box>
      ))}
      {/* {collectionPath?.includes('bridal') && (
        <BookAConsultationCallout sx={{ order: 7, gridColumn: 'span 2' }} />
      )} */}
      {/* {card && <ContemplationCard card={card} isCollectionPage />} */}
      {/* {card && <CollectionContemplationCard card={card} />} */}
      {orderedImages.map((image, i) => (
        <Box
          key={`collection-image-${i}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            order: image.order,
            gridColumn: 'span 2',
            gridRow: i % 2 ? '' : 'span 2',
            flexGrow: 0,
          }}
        >
          <CollectionImage image={image} tall={!(i % 2)} />
        </Box>
      ))}
    </CollectionProductGroup>
  )
}

export default ProductGrid
