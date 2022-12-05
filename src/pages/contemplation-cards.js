import { graphql, Link } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React, { useMemo, useRef, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Text,
} from 'theme-ui'
import { gql, useQuery } from 'urql'
import Layout from '../components/layout'
import ContemplationCard from '../components/product/ContemplationCard'
import ProductListItem from '../components/product/ListItem'
import ProductModal from '../components/product/ProductModal'

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

const ContemplationCardPage = ({ data }) => {
  const cards = data.allSanityCard.nodes
  const wheelRef = useRef(null)
  const pickedCardRef = useRef(null)
  const [pickedCardIndex, setPickedCardIndex] = useState(null)
  const pickedCard = cards[pickedCardIndex]

  // random shuffle
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

  const scrollToCard = i => {
    const y = pickedCardRef.current.offsetTop + 40
    window.scrollTo({ top: y, behavior: 'smooth' })
    setPickedCardIndex(i)
  }

  const pickRandom = () => {
    let deg = 18
    let randomIndex

    do {
      randomIndex = Math.floor(Math.random() * cards.length)
    } while (randomIndex === pickedCardIndex) // don't pick same card 2x

    const spin = setInterval(() => {
      wheelRef.current.style.transform = `rotate(${deg}deg)`
      deg += 18
    }, 25)

    setTimeout(() => {
      scrollToCard(randomIndex)
      clearInterval(spin)
    }, 500)
  }

  const { collectionHandle } = pickedCard || {}
  const [{ data: collectionData }] = useQuery({
    query: gql`
      query ($collectionHandle: String!) {
        collection(handle: $collectionHandle) {
          products(first: 4) {
            nodes {
              id
              handle
              title
              availableForSale
              tags
              images(first: 2) {
                nodes {
                  url
                  width
                  height
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `,
    variables: { collectionHandle },
  })
  const products = collectionData?.collection?.products.nodes || null

  return (
    <Layout
      title="pick a card for a message from the universe"
      description="close your eyes and ask a question-our card reading will reveal a message from the universe and connect you to the amulets that will guide you on your journey."
    >
      <Grid
        sx={{
          width: '100%',
          maxWidth: 1200,
          gridTemplateColumns: ['1fr', '1fr', '50% 50%'],
          columnGap: 6,
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
            '-webkit-tap-highlight-color': 'transparent',
          }}
          mx="auto"
          onClick={() => pickRandom()}
        >
          <CardWheel cards={cards} order={cardOrder} />
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
        <Box
          sx={{
            textAlign: ['center', 'left'],
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
            <Box sx={{ minHeight: 40 }}>
              {pickedCard && (
                <Button
                  as={Link}
                  variant="inverted"
                  sx={{
                    textAlign: 'center',
                    fontSize: 1,
                    maxWidth: 250,
                    display: 'block',
                  }}
                  to={`/collections/${pickedCard.collectionHandle}`}
                  mx={['auto', 7, 6, 6, 2]}
                  mt={5}
                >
                  {`shop ${pickedCard.title}`}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      />
      <Divider
        sx={{
          border: 'none',
          height: [0, 0, 60],
          bg: pickedCardIndex ? 'bbBackground' : null,
          margin: 0,
          marginTop: [0, -5, -7, -9], // to overlap Cardwheel above
        }}
        ref={pickedCardRef}
      />
      <ContemplationCard card={cards[pickedCardIndex]} />
      <Container>
        {products && (
          <Grid
            sx={{
              maxWidth: 1200,
              gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr'],
              justifyItems: 'center',
              gap: 3,
            }}
            mx="auto"
          >
            {products.map(product => (
              <ProductModal key={product.id} handle={product.handle}>
                <ProductListItem
                  firstImage={product.images.nodes[0]}
                  secondImage={product.images.nodes[1]}
                  title={product.title.toLowerCase().split('-')[0]}
                  price={product.priceRange.minVariantPrice}
                  hasRange={
                    product.priceRange.maxVariantPrice.amount !==
                    product.priceRange.minVariantPrice.amount
                  }
                  availableForSale={product.availableForSale}
                  tags={product.tags}
                />
              </ProductModal>
            ))}
          </Grid>
        )}
        {pickedCard && (
          <Button
            as={Link}
            variant="inverted"
            sx={{
              textAlign: 'center',
              fontSize: 1,
              maxWidth: 1200,
              display: 'block',
            }}
            to={`/collections/${pickedCard.collectionHandle}`}
            mx="auto"
            mt={5}
          >
            shop more
          </Button>
        )}
        <Heading as="h1" variant="h2" sx={{ textAlign: 'center' }} my={7}>
          contemplation cards
        </Heading>
        <Grid
          sx={{
            maxWidth: 1200,
            gap: [2, 3, 4],
            gridTemplateColumns: ['1fr 1fr', '1fr 1fr 1fr', 'repeat(4, 1fr)'],
            img: { borderRadius: 15, cursor: 'pointer' },
          }}
          mx="auto"
        >
          {cardOrder.map(n => (
            <Box key={`card-grid-${n}`} onClick={() => scrollToCard(n)}>
              <GatsbyImage
                image={cards[n].image.asset.gatsbyImageData}
                alt=""
                title={cards[n].title}
              />
            </Box>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default ContemplationCardPage

export const query = graphql`
  {
    allSanityCard {
      nodes {
        id
        title
        subtitle
        text
        stones
        amplify
        amulets
        collectionHandle
        energy
        image {
          asset {
            gatsbyImageData(
              placeholder: BLURRED
              #width: 250
              #height: 425
              #layout: FIXED
            )
          }
        }
        icons {
          asset {
            gatsbyImageData(
              width: 285
              height: 75
              placeholder: BLURRED
              layout: FIXED
            )
          }
        }
      }
    }
  }
`
