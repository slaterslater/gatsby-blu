import React, { useRef, useState } from 'react'
import { Flex, Box } from 'theme-ui'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IoIosAddCircleOutline as Open } from 'react-icons/io'
import GiftModal from './GiftModal'
import { useGiftContext } from './GiftContext'

const GiftFeature = ({ feature, boxIndex }) => {
  const featureBox = useRef(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const { collectionIndex } = useGiftContext()
  const { productImage, productHandles, buttonColor, relatedProducts } = feature
  const width = boxIndex % 3 ? '40%' : '60%'
  const justifyContent =
    collectionIndex % 2 === boxIndex % 3 ||
    (collectionIndex % 2 && boxIndex % 3)
      ? 'flex-start'
      : 'flex-end'

  return (
    <>
      <Flex ref={featureBox} sx={{ minWidth: '100%', height: 0, zIndex: 2 }}>
        {relatedProducts && (
          <Box
            as={Open}
            mt={[3, 4]}
            mr={[3, 4]}
            ml="auto"
            sx={{
              color: buttonColor || boxIndex === 1 ? 'black' : 'white',
              cursor: 'pointer',
            }}
            size={32}
            onClick={() => {
              const y = featureBox.current.offsetTop - 105
              window.scrollTo({ top: y, behavior: 'smooth' })
              setModalOpen(true)
            }}
          />
        )}
      </Flex>
      <GatsbyImage
        image={productImage.image.asset.gatsbyImageData}
        alt={`gift feature ${collectionIndex + 1}.${boxIndex + 1}`}
        objectFit={boxIndex === 1 ? 'contain' : 'cover'}
        style={{ flex: 1 }}
      />
      {relatedProducts && (
        <GiftModal
          isOpen={isModalOpen}
          setOpen={setModalOpen}
          justifyContent={justifyContent}
          modalWidth={width}
          products={relatedProducts}
        />
      )}
    </>
  )
}

const GiftBox = ({ box, index }) => {
  const [sm, md, lg] = [305, 370, 440]
  const height = [
    [sm, md, lg],
    [lg, md, lg],
    [md, sm, md],
  ]
  return (
    <Flex
      sx={{
        width: ['100%', index % 3 ? '40%' : '60%'],
        flexDirection: 'row',
        order: index,
      }}
    >
      {box.products.map((product, i) => (
        <Flex
          key={`gift-feature-box-${i}`}
          p={3}
          sx={{
            flexWrap: 'wrap',
            flexDirection: 'column',
            height: height[index],
            width: `calc(100% / ${box.products.length})`,
          }}
        >
          <GiftFeature feature={product} boxIndex={index} />
        </Flex>
      ))}
    </Flex>
  )
}

export default GiftBox

GiftBox.propTypes = {
  box: PropTypes.object,
  index: PropTypes.number,
}

GiftFeature.propTypes = {
  feature: PropTypes.object,
  boxIndex: PropTypes.number,
}
