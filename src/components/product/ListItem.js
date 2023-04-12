import React, { useState } from 'react'
import { AspectRatio, Grid, Flex, Box, Text, Badge } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import FormattedPrice from '../FormattedPrice'
import { useShopifyImage } from '../../hooks/shopifyImage'

const MotionBox = motion(Box)

const Dot = ({ full }) => (
  <MotionBox
    sx={{
      height: 5,
      width: 5,
      border: '1px solid',
      borderColor: '#DDCAA6',
      borderRadius: '50%',
      bg: full ? '#DDCAA6' : 'transparent',
    }}
    ml={1}
  />
)

const DragBox = ({ children, primary = false, controls, shuffleImg }) => {
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity

  return (
    <MotionBox
      sx={{
        gridArea: '1 / 1 / -1 / -1',
        zIndex: primary ? 1 : 0,
        bg: 'transparent',
      }}
      whileHover={primary ? { opacity: 0 } : null}
      animate={controls}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileDrag={{ opacity: 0 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = Math.abs(swipePower(offset.x, velocity.x))
        if (swipe < swipeConfidenceThreshold) return
        shuffleImg()
      }}
    >
      {children}
    </MotionBox>
  )
}

const ThumbnailImage = ({ image, fallbackAlt }) => {
  const imageData =
    useShopifyImage({ image, width: 360, height: 360 }) || image.gatsbyImageData
  return <GatsbyImage image={imageData} alt={image.altText || fallbackAlt} />
}

export const CollectionThumbnail = ({ title, primary, alternate }) => {
  const priControls = useAnimation()
  const altControls = useAnimation()

  const [full, setFull] = useState(false)

  const imageControl = (a, b) => {
    a.start({ opacity: 0, zIndex: 0 })
    b.start({ zIndex: 2 })
    a.start({ opacity: 1 })
    setFull(!full)
  }

  if (!primary && !alternate) {
    return <AspectRatio sx={{ bg: 'prodBackground' }} ratio={1} />
  }
  if (!alternate) {
    return (
      <ThumbnailImage fallbackAlt={`${title} lightbox photo`} image={primary} />
    )
  }
  return (
    <>
      <Grid sx={{ aspectRatio: '1', margin: '-1px' }}>
        <AnimatePresence>
          <DragBox
            key={`thumbnail-${title}-1`}
            primary
            controls={priControls}
            shuffleImg={() => imageControl(priControls, altControls)}
          >
            <ThumbnailImage
              fallbackAlt={`${title} lightbox photo`}
              image={primary}
            />
          </DragBox>
          <DragBox
            key={`thumbnail-${title}-2`}
            controls={altControls}
            shuffleImg={() => imageControl(altControls, priControls)}
          >
            <ThumbnailImage
              fallbackAlt={`${title} on body}`}
              image={alternate}
            />
          </DragBox>
        </AnimatePresence>
      </Grid>
      <Box
        sx={{
          display: ['flex', 'flex', 'none'],
          transform: 'translateY(-20px)',
          zIndex: 2,
        }}
        ml={1}
      >
        <Dot full={full} />
        <Dot full={!full} />
      </Box>
    </>
  )
}

const ProductItemLabel = ({ tags, soldOut }) => {
  // if (soldOut)
  //   return (
  //     <Badge
  //       sx={{ bg: 'cream', position: 'absolute', top: 1, left: 1, zIndex: 10 }}
  //     >
  //       Sold Out
  //     </Badge>
  //   )

  const label = tags.find(tag => tag.includes('__label'))
  const labelText = label?.replace('__label:', '')
  if (!label) return null
  return (
    <Badge
      sx={{ bg: 'cream', position: 'absolute', top: 1, left: 1, zIndex: 10 }}
    >
      {labelText}
    </Badge>
  )
}

const ProductListItemInner = ({
  firstImage,
  secondImage,
  title,
  hasRange,
  price,
  tags,
  availableForSale,
}) => (
  <Box as="article" sx={{ position: 'relative', zIndex: 1 }} pb={[5, 6]}>
    <ProductItemLabel tags={tags} soldOut={!availableForSale} />
    <Flex
      sx={{ flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
    >
      <CollectionThumbnail
        title={title}
        primary={firstImage}
        alternate={secondImage}
      />
      <Flex
        pt={2}
        sx={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'space-between',
        }}
      >
        <Box mb="auto" sx={{ alignSelf: 'top', textAlign: 'center' }}>
          <Text
            variant="small"
            sx={{
              fontWeight: 'bold',
              color: 'darkerGray',
              letterSpacing: 'widest',
            }}
          >
            {title}
          </Text>
        </Box>
        <Flex pt={2} sx={{ justifyContent: 'center' }}>
          {hasRange && (
            <Text variant="caps" pr={1} sx={{ color: 'darkGray' }}>
              From
            </Text>
          )}
          <Text
            as="p"
            variant="caps"
            sx={{
              fontWeight: 500,
              color: '#454545',
            }}
          >
            <FormattedPrice priceV2={price} />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  </Box>
)

const ProductListItem = ({ to, linkState, ...props }) => {
  if (!to) return <ProductListItemInner {...props} />
  return (
    <GatsbyLink
      to={to}
      state={linkState}
      style={{
        textDecoration: 'none',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <ProductListItemInner {...props} />
    </GatsbyLink>
  )
}

export default ProductListItem
