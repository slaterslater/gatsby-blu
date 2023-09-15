import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Divider, Grid, Heading, Text } from 'theme-ui'
import { gql, useQuery } from 'urql'
import { AnimatePresence, useAnimation } from 'framer-motion'
import Layout from '../components/layout'
import MessageFromUniverse from '../components/MessageFromUniverse'
import ProductContemplationCard from '../components/product/ProductContemplationCard'
import ProductListItem, { DragBox } from '../components/product/ListItem'
import ProductModal from '../components/product/ProductModal'

const ContemplationCardPage = ({ data, location }) => {
  const cards = data.allSanityCard.nodes
  const pickedCardRef = useRef(null)
  const [pickedCardIndex, setPickedCardIndex] = useState(
    location.state?.cardIndex
  )
  const [cardOrder, setCardOrder] = useState([])
  const pickedCard = cards[pickedCardIndex]
  // const cardIndex = location.state?.cardIndex

  const scrollToCard = n => {
    const top = pickedCardRef.current.offsetTop
    // const top = pickedCardRef.current.offsetTop + 40
    window.scrollTo({ top, behavior: 'smooth' })
    setPickedCardIndex(n)
  }

  // random shuffle
  useEffect(() => {
    const array = [...Array(cards.length).keys()]
    let ci = array.length
    let ri // currentIndex , randomIndex

    while (ci !== 0) {
      ri = Math.floor(Math.random() * ci)
      ci -= 1
      ;[array[ci], array[ri]] = [array[ri], array[ci]]
    }

    // return array
    setCardOrder(array)
    // get cardindex from location state
    if (pickedCardIndex) scrollToCard(pickedCardIndex)
  }, [cards])

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
              priceRangeV2: priceRange {
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
      <MessageFromUniverse cards={cards} onWheelSpin={scrollToCard}>
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
      </MessageFromUniverse>
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
      <ProductContemplationCard card={cards[pickedCardIndex]} />
      <Container pt={0}>
        {products && (
          <Grid
            sx={{
              maxWidth: 1200,
              gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr'],
              justifyItems: 'center',
              gap: 3,
            }}
            pt={6}
            mx="auto"
          >
            {products.map(product => (
              <ProductModal key={product.id} handle={product.handle}>
                <ProductListItem
                  firstImage={product.images.nodes[0]}
                  secondImage={product.images.nodes[1]}
                  title={product.title.toLowerCase().split(' - ')[0]}
                  price={product.priceRangeV2.minVariantPrice}
                  hasRange={
                    product.priceRangeV2.maxVariantPrice.amount !==
                    product.priceRangeV2.minVariantPrice.amount
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
            mb={8}
          >
            shop more
          </Button>
        )}
        <Heading as="h1" variant="h2" sx={{ textAlign: 'center' }} pb={7}>
          card meaning
        </Heading>
        <Text
          as="p"
          variant="copy"
          sx={{
            width: ['100%', '100%', 435],
            textAlign: ['center', 'center', 'justify'],
          }}
          mx="auto"
          mb={7}
        >
          we made these cards to create moments of deep reflection. building on
          the symbolism and storytelling that imbues our jewelry with meaning,
          each of these cards will invite you to tune into the subtle nuances of
          your inner and outer worlds.
        </Text>
        <Grid
          sx={{
            maxWidth: 1200,
            gap: [2, 3, 4],
            gridTemplateColumns: ['1fr 1fr', '1fr 1fr 1fr', 'repeat(4, 1fr)'],
            img: { borderRadius: 15, cursor: 'pointer' },
          }}
          mx="auto"
        >
          {cards.map(({ title, image, backImage }, i) => (
            <DoubleSidedCard
              key={`card-grid-${i}`}
              title={title}
              onClick={() => scrollToCard(i)}
              order={cardOrder[i]}
              frontImage={image.asset.gatsbyImageData}
              backImage={backImage.asset.gatsbyImageData}
            />
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
              width: 250
              height: 425
              #layout: FIXED
            )
          }
        }
        backImage {
          asset {
            gatsbyImageData(
              #aspectRatio: 0.6
              placeholder: BLURRED
              width: 250
              height: 425
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

const DoubleSidedCard = ({ title, onClick, order, frontImage, backImage }) => {
  const priControls = useAnimation()
  const altControls = useAnimation()

  const imageControl = (a, b) => {
    a.start({ opacity: 0, zIndex: 0 })
    b.start({ zIndex: 2 })
    a.start({ opacity: 1 })
  }

  // check that images are uploaded and then remove
  // validation should ensure all cards have a back
  if (!backImage) {
    return (
      <Box onClick={onClick} sx={{ order: 900 }}>
        <GatsbyImage image={frontImage} alt="" title={title} />
      </Box>
    )
  }

  return (
    <Grid onClick={onClick} sx={{ order, overflow: 'hidden' }}>
      <AnimatePresence>
        <DragBox
          key="card-frontside"
          primary
          controls={priControls}
          shuffleImg={() => imageControl(priControls, altControls)}
        >
          <GatsbyImage image={frontImage} alt="" />
        </DragBox>
        <DragBox
          key="card-backside"
          controls={altControls}
          shuffleImg={() => imageControl(altControls, priControls)}
        >
          <GatsbyImage image={backImage} alt="" />
        </DragBox>
      </AnimatePresence>
    </Grid>
  )
}
