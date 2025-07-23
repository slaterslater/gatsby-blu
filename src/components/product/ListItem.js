import React, { useState } from 'react'
import { AspectRatio, Grid, Flex, Box, Text, Badge } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import dayjs from 'dayjs'
import FormattedPrice from '../FormattedPrice'
import { useShopifyImage } from '../../hooks/shopifyImage'
import { usePageContext } from '../../contexts/PageContext'
import ProductQuickAdd from './ProductQuickAdd'
import { useProductLabel } from '../../hooks/product'
import { IoIosStar } from 'react-icons/io'

const MotionBox = motion.create(Box)

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

export const DragBox = ({
  children,
  primary = false,
  controls,
  shuffleImg,
  bg = 'white',
  isQuickAdding = false,
  setIsQuickAdding = () => {},
  // // isSold = false,
  // opacity = 1,
}) => {
  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity

  const [isHovered, setIsHovered] = useState(false)
  // const opacity = (primary && isQuickAdding) || isHovered ? 0 : 1

  const toggleOpacity = () => {
    if (!primary) return
    setIsQuickAdding(false)
    setIsHovered(!isHovered)
  }

  return (
    <MotionBox
      sx={{
        position: 'relative',
        gridArea: '1 / 1 / -1 / -1',
        zIndex: primary ? 1 : 0,
        bg,
        // opacity,
      }}
      whileHover={primary ? { opacity: 0 } : null}
      // onMouseOver={toggleOpacity}
      // onMouseOut={toggleOpacity}
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

export const ThumbnailImage = ({ image, fallbackAlt = '' }) => {
  let imageData = image?.gatsbyImageData
  if (!imageData) {
    imageData = useShopifyImage({ image, width: 360 })
  }
  if (!imageData) return null
  return <GatsbyImage image={imageData} alt={image.altText || fallbackAlt} />
}

export const CollectionThumbnail = ({
  title,
  primary,
  alternate,
  isQuickAdding,
  setIsQuickAdding,
  isSold,
}) => {
  const priControls = useAnimation()
  const altControls = useAnimation()

  const [full, setFull] = useState(false)

  const { isBeloved } = usePageContext()
  const bg = isBeloved ? '#eeece1' : 'white'

  const imageControl = (a, b) => {
    a.start({ opacity: 0, zIndex: 0 })
    b.start({ zIndex: 2 })
    a.start({ opacity: 1 })
    setFull(!full)
  }

  if (!primary && !alternate) {
    return <AspectRatio sx={{ bg: 'prodBackground' }} ratio={1 / 1} />
  }
  if (!alternate) {
    return (
      <ThumbnailImage fallbackAlt={`${title} lightbox photo`} image={primary} />
    )
  }
  return (
    <>
      <Grid sx={{ aspectRatio: '1', overflow: 'hidden' }}>
        <AnimatePresence>
          <DragBox
            key="dragbox-1"
            primary
            controls={priControls}
            shuffleImg={() => imageControl(priControls, altControls)}
            bg={bg}
            isQuickAdding={isQuickAdding}
            setIsQuickAdding={setIsQuickAdding}
          >
            <ThumbnailImage
              fallbackAlt={`${title} lightbox photo`}
              image={primary}
            />
            {isSold && (
              <Box
                sx={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  bg: 'bbBackground',
                  top: 0,
                  opacity: 0.6,
                }}
              />
            )}
          </DragBox>
          <DragBox
            key="dragbox-2"
            controls={altControls}
            shuffleImg={() => imageControl(altControls, priControls)}
            bg={bg}
          >
            <ThumbnailImage
              fallbackAlt={`${title} on body}`}
              image={isSold ? primary : alternate}
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

export const ProductItemLabel = ({ label, tags, metafields, soldOut }) => {
  // if (soldOut)
  //   return (
  //     <Badge
  //       sx={{ bg: 'cream', position: 'absolute', top: 1, left: 1, zIndex: 10 }}
  //     >
  //       Sold Out
  //     </Badge>
  //   )

  if (!label) return null

  const [bg, color] =
    label === 'sold' ? ['primary', 'cream'] : ['cream', 'primary']

  return (
    <Badge
      sx={{
        bg,
        color,
        position: 'absolute',
        top: 1,
        left: 1,
        zIndex: 10,
        borderRadius: '2px',
      }}
    >
      {label}
    </Badge>
  )
}

const ProductListItemInner = ({
  firstImage,
  secondImage,
  title,
  hasRange,
  price,
  compareAtPrice,
  tags,
  availableForSale,
  metafields = [],
  allowQuickAdd,
  badge,
  showLabel,
  options,
  variants,
  rating
}) => {
  const [isQuickAdding, setIsQuickAdding] = useState(false)
  const label = useProductLabel({ tags, metafields })

  return (
    <Box as="article" sx={{ position: 'relative', zIndex: 1 }} pb={[5, 6]}>
      <ProductItemLabel label={label} soldOut={!availableForSale} />
      <Flex
        sx={{
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            '#quickAdd': { display: 'none' },
            ':hover > #quickAdd': { display: ['none', 'none', 'flex'] },
          }}
        >
          <CollectionThumbnail
            title={title}
            primary={firstImage}
            alternate={secondImage}
            isQuickAdding={isQuickAdding}
            setIsQuickAdding={setIsQuickAdding}
            isSold={label === 'sold'}
          />
          {/* {allowQuickAdd && (
            <ProductQuickAdd
              variants={variants}
              metafields={metafields}
              isQuickAdding={isQuickAdding}
              setIsQuickAdding={setIsQuickAdding}
            />
          )} */}
        </Box>
        {/* {badge && (
        <Box
          sx={{
            maxWidth: '18%',
            maxHeight: '18%',
            marginLeft: 'auto',
            marginRight: 2,
            zIndex: 3,
            transform: 'translateY(calc(-100% - 10px))',
            // transform: 'translateY(-125%)',
            marginBottom: '-20%',
            // marginBottom: 'calc(-20% - 4px)',
            // marginBottom: 'calc(-100% - 10px)',
          }}
        >
          <GatsbyImage
            image={badge.image.asset.gatsbyImageData}
            alt={badge.name}
          />
        </Box>
      )} */}
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
          <Flex py={2} sx={{ justifyContent: 'center' }}>
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
                color: compareAtPrice ? 'error' : '#454545',
                textAlign: 'center',
                '#comparePrice': {
                  display: 'inline-block',
                  width: '100%',
                  textDecoration: 'line-through',
                  color: 'primary',
                },
              }}
            >
              {compareAtPrice && (
                <span id="comparePrice">
                  <FormattedPrice priceV2={compareAtPrice} />
                </span>
              )}
              <FormattedPrice priceV2={price} />
            </Text>
          </Flex>
          {rating && <Flex sx={{justifyContent: 'center', alignItems:'center', color: 'primary', fontSize: 1,}}>
            <IoIosStar />&nbsp;
            {`${rating.average_score} (${rating.total_reviews})`}
          </Flex>}
        </Flex>
      </Flex>
    </Box>
  )
}

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
