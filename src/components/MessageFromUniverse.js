import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React, { useMemo, useRef } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'

const CardWheel = ({ cards, order }) =>
  order.map((n, i) => (
    <Box
      key={`card-wheel-${i}`}
      sx={{
        // width: [105, 155],
        width: ['26.5vw', '28vw', '14vw'],
        minWidth: 105,
        maxWidth: 155,
        position: 'absolute',
        transform: `rotate(${(360 / cards.length) * i}deg)`,
        transformOrigin: 'bottom center',
        img: { borderRadius: 15 },
      }}
    >
      <GatsbyImage image={cards[n].image.asset.gatsbyImageData} alt="" />
    </Box>
  ))

const MessageFromUniverse = ({ cards, onWheelSpin, children, ...props }) => {
  const wheelRef = useRef(null)

  const cardOrder = useMemo(() => {
    const array = [...Array(cards.length).keys()]
    let ci = array.length
    let ri // currentIndex , randomIndex

    while (ci !== 0) {
      ri = Math.floor(Math.random() * ci)
      ci -= 1
      ;[array[ci], array[ri]] = [array[ri], array[ci]]
    }

    return array
  }, [cards])

  const spinWheel = () => {
    let deg = 18
    const randomIndex = Math.floor(Math.random() * cards.length)

    const spin = setInterval(() => {
      wheelRef.current.style.transform = `rotate(${deg}deg)`
      deg += 18
    }, 25)

    setTimeout(() => {
      onWheelSpin(randomIndex)
      clearInterval(spin)
    }, 500)
  }

  return (
    <Box {...props}>
      <Grid
        sx={{
          width: '100%',
          maxWidth: 1200,
          gridTemplateColumns: ['1fr', '1fr', '50% 50%'],
          columnGap: 6,
          overflow: 'hidden',
        }}
        mt={6}
        mx="auto"
      >
        <Flex
          ref={wheelRef}
          sx={{
            width: '94%',
            height: ['94vw', '94vw', '47vw'],
            maxWidth: 540,
            maxHeight: 540,
            minWidth: 380,
            minHeight: 380,
            // border: '3px solid black',
            borderRadius: '50%',
            cursor: 'pointer',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
          mx="auto"
          onClick={() => spinWheel()}
        >
          <CardWheel cards={cards} order={cardOrder} />
          <Box />
          <Flex
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 2,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                bg: 'bbBeige',
                borderRadius: '50%',
              }}
              p={1}
            >
              <Box
                sx={{
                  border: '1px solid black',
                  borderRadius: '50%',
                  padding: '1px',
                }}
              >
                <Text
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textTransform: 'uppercase',
                    borderRadius: '50%',
                    border: '0.5px solid black',
                    fontSize: [0, 1],
                    letterSpacing: 'widest',
                    lineHeight: 1.8,
                    strong: {
                      fontFamily: 'heading',
                      fontSize: [4, 5],
                    },
                  }}
                  px={[4, 5]}
                  py={[5, 6]}
                >
                  pull a <strong>card</strong>
                </Text>
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Flex
          sx={{
            textAlign: ['center', 'left'],
            flexDirection: 'column',
            justifyContent: children ? 'flex-start' : 'center',
          }}
        >
          <Box
            sx={{
              width: [335, 500, 335, 500, 500],
              '.sm': { display: ['block', 'none', 'block', 'none', 'none'] },
              '.lg': { display: ['none', 'block', 'none', 'block', 'block'] },
            }}
            mx={['auto', 'auto', 0]}
          >
            <StaticImage
              className="sm"
              src="../images/pick-a-card/for-you-sm.png"
              alt=""
            />
            <StaticImage
              className="lg"
              src="../images/pick-a-card/for-you-lg.png"
              alt=""
            />
          </Box>
          <Box
            sx={{
              width: ['100%', 500, '100%'],
              maxWidth: [415, 500, null],
              p: {
                fontWeight: 'heading',
                marginTop: [4, 0],
                marginLeft: [0, 7, 6, 6, 2],
              },
            }}
            px={[5, 0]}
            mx="auto"
          >
            <Text as="p" variant="copy" sx={{ width: ['100%', 340] }} pb={5}>
              these contemplation cards invite you to look inward and reflect,
              leading you to the amulets that will guide you on your journey.
            </Text>
            <Text as="p" variant="copy" sx={{ width: ['100%', 300] }} pb={5}>
              close your eyes, ask a question, or set an intention— then pull a
              card to receive a message from the universe.
            </Text>
            {children}
          </Box>
        </Flex>
      </Grid>
    </Box>
  )
}

export default MessageFromUniverse
