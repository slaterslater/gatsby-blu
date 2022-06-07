import { AnimatePresence, motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from 'theme-ui'
import Layout from '../../components/layout'
import useInterval from '../../lib/useInterval'

const MotionBox = motion(Box)
const Dot = ({ full, ...props }) => (
  <MotionBox
    sx={{
      height: [10, 12, 15],
      width: [10, 12, 15],
      border: '1px solid',
      borderColor: full ? 'cream' : 'bbBackground',
      borderRadius: '50%',
      bg: full ? 'cream' : 'bbBackground',
      margin: '0 5px',
    }}
    {...props}
  />
)

const ImageSwiper = () => {
  const imagesLength = 5

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity
  const paginate = () => {}
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useInterval(
    () => {
      const newIndex = currentIndex === imagesLength - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
    },
    isPaused ? null : 5000
  )

  return (
    <Box
      sx={{ width: ['115%', '100%'], maxWidth: 850 }}
      px={[0, 4, 6]}
      // pt={[5, 0]}
      // mt={[5, 0]}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AspectRatio ratio={4 / 3}>
        <AnimatePresence initial={false}>
          <MotionBox
            key={`element-slider-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
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
            sx={{
              display: 'flex',
              justifyContent: 'stretch',
              height: '100%',
            }}
          >
            <Flex sx={{ justifyContent: 'stretch', width: '100%' }}>
              <Image
                src={
                  require(`./images-temp/slider/muskoka_blob-0${
                    currentIndex + 1
                  }_rs.png`).default
                }
                alt=""
                sx={{ objectFit: 'cover', flex: 1 }}
              />
            </Flex>
          </MotionBox>
        </AnimatePresence>
      </AspectRatio>
      {imagesLength > 1 && (
        <Flex
          sx={{
            justifyContent: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            width: 150,
          }}
          mt={[-6, -7, -8]}
          mx="auto"
        >
          {Array(imagesLength)
            .fill()
            .map((_, i) => (
              <Dot
                key={`dot-${i}`}
                full={i === currentIndex}
                onClick={() => {
                  setCurrentIndex(i)
                }}
              />
            ))}
        </Flex>
      )}
    </Box>
  )
}

const MuskokaPage = () => (
  <Layout
    title="bluboho muskoka location"
    description="dip your toe into the world of bluboho in port carling, muskoka"
  >
    <Flex
      sx={{
        bg: 'bbBeige',
        justifyContent: 'center',
      }}
    >
      <Heading
        as="h2"
        variant="h2"
        sx={{ fontSize: 4, textAlign: 'center' }}
        py={7}
      >
        bluboho muskoka location
      </Heading>
    </Flex>

    <Container
      as="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          width: '100%',
          maxWidth: 1000,
          justifyContent: 'space-around',
          alignItems: ['center', 'normal'],
          textAlign: ['center', 'left'],
          flexWrap: ['wrap', 'wrap', 'nowrap'],
        }}
        px={[3, 4, 6]}
        mb={6}
        pb={[6, 3]}
      >
        <Box
          sx={{
            width: '100%',
            minWidth: ['100%', '100%', '25%'],
            maxWidth: [410, 350],
            textAlign: 'center',
          }}
        >
          <StaticImage
            src="images-temp/store.jpeg"
            alt=""
            width={410}
            objectFit="cover"
          />
        </Box>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 260,
            maxHeight: 275,
            minHeight: [260, 0],
          }}
          mt={5}
          ml={[0, 4]}
        >
          <Box pb={6}>
            <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={2}>
              location
            </Heading>
            <Link
              href="#map"
              variant="small"
              sx={{ fontSize: 1, display: 'block' }}
            >
              <Text
                as="address"
                sx={{
                  fontStyle: 'normal',
                  textTransform: 'lowercase',
                  lineHeight: '1.8em',
                }}
              >
                2 James Bartleman Way
                <br />
                Port Carling, ON P0B 1J0
              </Text>
            </Link>
          </Box>
          <Box pb={6}>
            <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={2}>
              phone number
            </Heading>
            <Link
              variant="small"
              sx={{ fontSize: 1, display: 'block' }}
              href="tel:+1 416-302-5748"
            >
              +1 416-302-5748
            </Link>
          </Box>
          <Box>
            <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={2}>
              email id
            </Heading>
            <Link
              variant="small"
              sx={{ fontSize: 1, display: 'block' }}
              href="mailto:muskoka@bluboho.com"
              pb={3}
            >
              muskoka@bluboho.com
            </Link>
          </Box>
        </Flex>
        <Flex
          sx={{
            flexDirection: 'column',
            width: '100%',
            maxWidth: 250,
            maxHeight: 275,
          }}
          mt={[8, 5]}
          mr={[0, 5, 6]}
          // pb={[0, 3, 5]}
        >
          <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={[4, 2]}>
            store hours
          </Heading>
          <Flex
            as="ul"
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              listStyleType: 'none',
              minHeight: [275, 0],
              padding: 0,
              flex: 1,
              li: {
                paddingBottom: 2,
                display: 'flex',
                justifyContent: 'space-between',
              },
              span: {
                minWidth: 125,
                textAlign: 'center',
              },
            }}
          >
            <Text as="li">
              monday <span>closed</span>
            </Text>
            <Text as="li">
              tuesday <span>closed</span>
            </Text>
            <Text as="li">
              wednesday <span>closed</span>
            </Text>
            <Text as="li">
              thursday <span>closed</span>
            </Text>
            <Text as="li">
              friday <span>12:00pm - 5:00pm</span>
            </Text>
            <Text as="li">
              saturday <span>11:00am - 6:00pm</span>
            </Text>
            <Text as="li">
              sunday <span>12:00pm - 4:00pm</span>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <ImageSwiper />
      <Heading
        as="h3"
        pt={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 325,
          fontSize: 4,
          textAlign: 'center',
          fontStyle: 'italic',
          fontWeight: 'body',
          letterSpacing: '0.2em',
          textTransform: 'lowercase',
          whiteSpace: 'pre-line',
          div: {
            marginTop: 15,
            paddingLeft: 15,
            lineHeight: '60px',
          },
          span: {
            fontSize: '3em',
          },
          'span:last-child': {
            alignSelf: 'flex-end',
          },
        }}
      >
        <span>&ldquo;</span>
        <div>
          {`dip your toe into the world of\nbluboho\nin port carling, muskoka`}
        </div>
        <span>&bdquo;</span>
      </Heading>
      <Divider
        my={7}
        sx={{ borderColor: 'primary', borderWidth: 2, width: 80 }}
      />
      <Text
        as="p"
        variant="copy"
        sx={{
          width: '100%',
          maxWidth: 650,
          lineHeight: '3.5em',
          textAlign: 'center',
          fontSize: [2, 3],
        }}
        mx="auto"
        px={[5, 5]}
      >
        we designed our stores with the intention for them to be as beautiful,
        welcoming, and sustainable as possible. we keep our stores small enough
        to minimize our carbon footprint, and feel inviting; we source vintage,
        pre-loved, or made-to-order furniture for our stores— and most of all,
        we love visitors.
      </Text>
      <Box
        id="map"
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 950,
        }}
        px={[0, 5, 8]}
        mx="auto"
      >
        <Box
          as="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.287409223114!2d-79.57994858452652!3d45.12051136433155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d2af58172e2a9c9%3A0x549b641d68da3cb4!2s2%20James%20Bartleman%20Way%2C%20Port%20Carling%2C%20ON%20P0B%201J0!5e0!3m2!1sen!2sca!4v1653681178340!5m2!1sen!2sca"
          sx={{
            width: '100%',
            height: [300, 450, 600],
            border: 'none',
          }}
          allowFullScreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          py={6}
        />
      </Box>
    </Container>
  </Layout>
)

export default MuskokaPage
