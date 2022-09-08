import React, { useState } from 'react'
import { Flex, Link, Box, IconButton } from 'theme-ui'
import { FaPinterest, FaFacebook } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { wrap } from '@popmotion/popcorn'

// background images are in the static folder
// image size should be 500 x 175
const socials = [
  {
    title: 'instagram',
    icon: RiInstagramFill,
    href: 'https://www.instagram.com/bluboho',
  },
  {
    title: 'facebook',
    icon: FaFacebook,
    href: 'https://www.facebook.com/blubohojewelry',
  },
  {
    title: 'pinterest',
    icon: FaPinterest,
    href: 'https://www.pinterest.ca/bluboho',
  },
]
const swipeConfidenceThreshold = 10000
const swipePower = (offset, velocity) => Math.abs(offset) * velocity
const MotionBox = motion(Box)

const SocialBlocks = () => {
  const [[current, direction], setCurrent] = useState([0, 0])

  const socialIndex = wrap(0, socials.length, current)
  const { title, icon, href } = socials[socialIndex]

  const paginate = newDirection => {
    setCurrent([current + newDirection, newDirection])
  }

  return (
    <>
      <Box sx={{ display: ['flex', 'none'], color: 'white' }}>
        <IconButton
          type="button"
          onClick={() => paginate(-1)}
          p={1}
          ml={6}
          sx={{
            outline: 'none',
            zIndex: 2,
            position: 'absolute',
            height: 75,
          }}
        >
          <HiChevronLeft size={20} />
        </IconButton>
        <AnimatePresence initial={false}>
          <MotionBox
            key={`element-slider-${socialIndex}`}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
          >
            <Flex
              sx={{
                width: '100%',
                height: 75,
                position: 'absolute',
                backgroundColor: 'bbBeige',
                backgroundImage: `url('/socials/bg${socialIndex + 1}.webp')`,
                backgroundSize: '100% auto',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link title={title} href={href}>
                <Box as={icon} size={37} />
              </Link>
            </Flex>
          </MotionBox>
        </AnimatePresence>
        <IconButton
          type="button"
          onClick={() => paginate(1)}
          p={1}
          sx={{ outline: 'none', zIndex: 2, height: 75 }}
          ml="auto"
          mr={6}
        >
          <HiChevronRight size={20} />
        </IconButton>
      </Box>
      <Box sx={{ display: ['none', 'flex'], height: 165, width: '100%' }}>
        {socials.map(({ text, href, icon }, i) => (
          <Flex
            as={Link}
            key={`social-block-${i}`}
            sx={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'bbBeige',
              backgroundImage: `url('/socials/bg${i + 1}.png')`,
              backgroundSize: 'cover',
              color: 'white',
            }}
            href={href}
          >
            <Box as={icon} size={42} />
          </Flex>
        ))}
      </Box>
    </>
  )
}

export default SocialBlocks
