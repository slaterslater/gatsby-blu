import React, { useRef, useState } from 'react'
import { Link, Flex, Box, Text, Heading, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import {
  IoIosAddCircleOutline as Open,
  IoIosCloseCircleOutline as Close,
} from 'react-icons/io'
import GiftModal from './GiftModal'
import { useCollectionIndex } from '../../templates/GiftGuideTemplate'

const GiftFeature = ({ feature, boxIndex }) => {
  const TEST = useCollectionIndex()
  console.log({ TEST })
  const { productImage, productHandles } = feature
  // console.log({ productHandles })
  const [isModalOpen, setModalOpen] = useState(false)
  const x = useRef(null)
  return (
    <>
      {/* {isModalOpen && (
        <Box>
          <Text as="p">{productHandles.join(', ')}</Text>
        </Box>
      )} */}
      <Flex ref={x} sx={{ minWidth: '100%', height: 0, zIndex: 2 }}>
        <Box
          as={Open}
          mt={[3, 4]}
          mr={[3, 4]}
          ml="auto"
          sx={{ color: boxIndex === 1 ? 'black' : 'white', cursor: 'pointer' }}
          size={32}
          onClick={() => {
            const y = x.current.offsetTop - 115
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
        // width={1100}
        justifyContent={boxIndex % 2 ? 'flex-start' : 'flex-end'}
      >
        <Text as="p">{productHandles.join(', ')}</Text>
      </GiftModal>
    </>
  )
}

const GiftBox = ({ box, index }) => {
  console.log({ box })
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
      {box.products.map(product => (
        <Flex
          p={3}
          sx={{
            flexWrap: 'wrap',
            flexDirection: 'column',
            height: height[index],
            width: `calc(100% / ${box.products.length})`,
          }}
        >
          <GiftFeature
            key={`gift-feature-${index}`}
            feature={product}
            // color={index === 1 ? 'black' : 'white'}
            boxIndex={index}
          />
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
  color: PropTypes.string,
}
