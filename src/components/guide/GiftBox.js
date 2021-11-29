import React, { useRef, useState } from 'react'
import { Link, Flex, Box, Text, Heading, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import {
  IoIosAddCircleOutline as Open,
  IoIosCloseCircleOutline as Close,
} from 'react-icons/io'
import GiftModal from './GiftModal'
import { useGiftContext } from './GiftContext'

const GiftFeature = ({ feature, boxIndex }) => {
  const { productImage, productHandles } = feature
  const featureBox = useRef(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const { collectionIndex } = useGiftContext()
  const justifyContent =
    collectionIndex % 2 === boxIndex % 3 ||
    (collectionIndex % 2 && boxIndex % 3)
      ? 'flex-start'
      : 'flex-end'

  return (
    <>
      <Flex ref={featureBox} sx={{ minWidth: '100%', height: 0, zIndex: 2 }}>
        <Box
          as={Open}
          mt={[3, 4]}
          mr={[3, 4]}
          ml="auto"
          sx={{ color: boxIndex === 1 ? 'black' : 'white', cursor: 'pointer' }}
          size={32}
          onClick={() => {
            const y = featureBox.current.offsetTop - 115
            window.scrollTo({ top: y, behavior: 'smooth' })
            setModalOpen(true)
          }}
        />
      </Flex>
      <GatsbyImage
        image={productImage.image.asset.gatsbyImageData}
        alt=""
        objectFit="cover"
        style={{ flex: 1 }}
      />
      <GiftModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        justifyContent={justifyContent}
        handles={productHandles}
      >
        {/* <Text as="p">{productHandles.join(', ')}</Text> */}
      </GiftModal>
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
        width: ['100%', index === 0 ? '60%' : '40%'],
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
