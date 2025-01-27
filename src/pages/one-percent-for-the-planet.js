import { Grid, Container, Flex, Box, Heading, Text } from 'theme-ui'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const SliderInner = props => (
  <Box
    sx={{
      flexShrink: 0,
      scrollSnapAlign: 'start',
      height: '100%',
      width: [270, 360, 470],
    }}
    {...props}
  />
)

const BeliefBox = ({ title, body, src, children, ...props }) => (
  <Box sx={{ flex: 1, textAlign: 'center' }} mx={4} mb={8} {...props}>
    {children}
    <Heading
      py={4}
      as="h3"
      sx={{
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        fontSize: 4,
        whitespace: 'nowrap',
      }}
    >
      {title}
    </Heading>
    <Box sx={{ maxWidth: 320 }} mx="auto">
      <Body>{body}</Body>
    </Box>
  </Box>
)

const Body = props => (
  <Text
    as="p"
    {...props}
    sx={{
      textAlign: 'center',
      lineHeight: 3,
      letterSpacing: 'wider',
      a : {color: 'primary'},
      ...(props.sx || {}),
    }}
  />
)
const CapsHeading = props => (
  <Heading
    variant="caps"
    {...props}
    sx={{ lineHeight: 2.5, fontWeight: 500, ...(props.sx || {}) }}
  />
)

const OnePercentForThePlanet = props => (
  <Layout
    title="1% for the Planet"
    description="we believe that businesses must play a role in protecting the environment for future generations. we strive to be stewards of the planet, making every decision with our impact in mind. sustainability begins with all of us realizing that our actions have an impact on the earth. together we can work toward minimizing our impact and building a more sustainable future."
  >
    <Box as="main">
      <Container pt={9} sx={{ textAlign: 'center', maxWidth: 680 }}>
        <Heading
          as="h1"
          sx={{ lineHeight: 1.5, letterSpacing: '.2em', fontSize: 4 }}
          pb={5}
        >
          ENVIRONMENTAL COMMITMENTS
        </Heading>
        <Body>
          we believe that businesses must play a role in protecting the
          environment for future generations. we strive to be stewards of the
          planet, making every decision with our impact in mind. sustainability
          begins with all of us realizing that our actions have an impact on the
          earth. together we can work toward minimizing our impact and building
          a more sustainable future.
        </Body>
      </Container>
      <Container>
        <Flex sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box m={4}>
            <StaticImage
              src="../images/one-percent-for-the-planet/4x/1.jpg"
              height={400}
              width={270}
              layout="fixed"
              quality={100}
            />
          </Box>
          <Box m={4}>
            <StaticImage
              src="../images/one-percent-for-the-planet/4x/2.jpg"
              height={400}
              width={270}
              layout="fixed"
              quality={100}
            />
          </Box>
        </Flex>
      </Container>
      <Container sx={{ textAlign: 'center', maxWidth: 680 }}>
        <CapsHeading as="h2" pb={5}>
          ALL THE WAYS WE ARE WORKING TO BE BETTER:
        </CapsHeading>
        <Body>
          <a href="https://www.onepercentfortheplanet.org/membership">we are members of 1% for the Planet</a>, a global network of 4000
          businesses in 90 countries that pledge a minimum of 1% of sales to
          organizations working to find solutions to the environmental crisis.
        </Body>
      </Container>
      <Flex
        sx={{
          maxHeight: [270, 360, 470],
          alignItems: 'stretch',
          overflowX: 'auto',
          overflowY: 'none',
          webkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          width: '100%',
          justifyContent: 'center',
          scrollbarWidth: 'none',
          '&::webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <SliderInner mr={2}>
          <StaticImage src="../images/one-percent-for-the-planet/4x/3.jpg" />
        </SliderInner>
        <SliderInner mr={2}>
          <StaticImage src="../images/one-percent-for-the-planet/4x/4.jpg" />
        </SliderInner>
        <SliderInner>
          <StaticImage src="../images/one-percent-for-the-planet/4x/5.jpg" />
        </SliderInner>
      </Flex>
      <Container px={[0, 0, 0, 0]} sx={{ maxWidth: '680px', width: '100%' }}>
        <Body px={[4, 0]} sx={{ lineHeight: 'body' }}>
          our packaging is designed from recycled, reusable and compostable
          materials. in store only: to minimize package consumption, we offer $5
          off your purchase if you bring your packaging back to be reused in
          good condition (1 package redeemable per transaction). or if you wear
          your piece out, and opt out of packaging all together.
        </Body>
      </Container>
      <Container sx={{ maxWidth: 990 }} sx={{ textAlign: 'center' }}>
        <Flex sx={{ justifyContent: 'center' }} pb={8}>
          <CapsHeading as="h2" sx={{ maxWidth: 360 }}>
            CREATING PRODUCTS THAT ARE BUILT TO LAST OUR GOAL IS THAT YOU BUY
            LESS, BUY BETTER
          </CapsHeading>
        </Flex>
        <Flex sx={{ flexDirection: ['column', 'row'] }}>
          <BeliefBox
            title="recycled"
            body="we use recycled metals as much as possible in the creation of our pieces."
          >
            <StaticImage
              height={130}
              width={180}
              src="../images/one-percent-for-the-planet/recycle.png"
            />
          </BeliefBox>
          <BeliefBox
            title="local"
            body="local production allows us to cut down on our shipping footprint. it also allows for more control, producing limited quantities to avoid left over inventory and waste."
          >
            <StaticImage
              height={130}
              width={180}
              src="../images/one-percent-for-the-planet/local.png"
            />
          </BeliefBox>
          <BeliefBox
            title="low impact"
            body="we use environmentally friendly products to maintain our workplace. this also includes using antique and thrifted as well as built furniture and display cases that are made to last."
          >
            <StaticImage
              height={130}
              width={180}
              src="../images/one-percent-for-the-planet/handcrafted.png"
            />
          </BeliefBox>
        </Flex>
      </Container>
      <Container>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Grid mr={[0, 6]} sx={{ gridAutoFlow: 'column', gap: 6 }}>
            <StaticImage
              height={400}
              width={270}
              src="../images/one-percent-for-the-planet/4x/6.jpg"
            />
            <StaticImage
              height={400}
              width={270}
              src="../images/one-percent-for-the-planet/4x/7.jpg"
            />
          </Grid>
          <Box
            py={8}
            sx={{ textAlign: 'center', maxWidth: 380, alignSelf: 'center' }}
          >
            <CapsHeading pb={6}>
              OFFERING REPAIR & RESIZING SERVICES
            </CapsHeading>
            <Body>
              we work to resize pieces that don't fit and mend any of the damage
              that can come from long-term wear. we are here to disrupt the fast
              fashion trend and encourage a buy less, buy better mentality. this
              means we are producing less waste and your pieces become heirloom
              jewelry for the next generation.
            </Body>
          </Box>
        </Flex>
      </Container>
      <Container>
        <Flex
          sx={{
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Box sx={{ maxWidth: 380, textAlign: 'center' }} mx={6} pb={8}>
            <CapsHeading py={6}>MINIMIZING OUR STORE FOOT PRINT</CapsHeading>
            <Body>
              working with tiny stores to cut down on energy consumption
            </Body>
          </Box>
          <StaticImage
            src="../images/one-percent-for-the-planet/4x/8.jpg"
            height={582}
            width={480}
            mx={6}
          />
        </Flex>
      </Container>
      <Grid sx={{ height: 360 }}>
        <Flex sx={{ gridArea: '1 / 1 / -1 / -1 ', overflow: 'hidden' }}>
          <StaticImage
            src="../images/one-percent-for-the-planet/4x/9.jpg"
            objectFit="cover"
            alt=""
          />
        </Flex>
        <Flex
          p={8}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            gridArea: '1 / 1 / -1 / -1 ',
            zIndex: '1',
          }}
        >
          <Body sx={{ color: 'white', maxWidth: 680 }}>
            we will continue to grow as a company and collective, with practices
            that go beyond industry standards. we aim to set the bar for how we
            interact with mother earth and hope to inspire others to do the
            same.
          </Body>
        </Flex>
      </Grid>
    </Box>
  </Layout>
)

export default OnePercentForThePlanet
