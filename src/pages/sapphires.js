import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Button, Divider, Flex, Grid, Heading, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import Layout from '../components/layout'

const Banner = ({ height, children, noMobile = false }) => (
  <Box
    sx={{
      flexDirection: 'column',
      justifyContent: 'stretch',
      '.headerFull': {
        display: ['none', 'block'],
      },
      '.headerMobile': {
        display: ['block', 'none'],
      },
      width: '100%',
      height,
      display: noMobile ? ['none', 'flex'] : 'flex',
    }}
    my={6}
  >
    {children}
  </Box>
)

const ContentGrid = ({ children }) => (
  <Grid
    sx={{
      gridTemplateColumns: ['1fr', '1fr 1fr'],
      maxwidth: 1195,
      gap: [6, 7, 8],
    }}
    my={[6, 7, 8]}
    mx="auto"
  >
    {children}
  </Grid>
)

const ImageFlex = ({ children, noMobile = false }) => (
  <Box
    sx={{
      display: noMobile ? ['none', 'flex'] : 'flex',
      justifyContent: 'stretch',
      width: '100%',
      maxWidth: 565,
      height: 'auto',
      maxHeight: [400, 275, 400],
    }}
  >
    {children}
  </Box>
)

const ContentFlex = ({ heading, children }) => (
  <Flex
    sx={{
      maxWidth: 900,
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: ['center', 'space-between'],
      p: { maxWidth: [380, '47%', 380], marginTop: '24px', fontSize: 1 },
    }}
    mx="auto"
    px={5}
    mb={4}
  >
    {heading && (
      <Heading
        as="h2"
        variant="caps"
        sx={{ fontSize: 1, width: [370, '100%'] }}
        py={1}
      >
        {heading}
      </Heading>
    )}
    {children}
  </Flex>
)

const SapphiresPage = () => (
  <Layout
    title="sapphires"
    description="revered throughout history for their beauty, sapphires have been a popular choice for engagement rings for generations. we love using ethically-sourced sapphires in our one-of-a-kind beloved pieces because of their variety of shades and colours, traceability from mine to market, and the high ethical standards around sourcing them. 
    "
  >
    <Banner height={400}>
      <StaticImage
        className="headerFull"
        src="../images/sapphires/header1.jpg"
        alt=""
        placeholder="blurred"
        style={{ flex: 1 }}
      />
      <StaticImage
        className="headerMobile"
        src="../images/sapphires/header1-mobile.jpg"
        alt=""
        placeholder="blurred"
        style={{ flex: 1 }}
      />
    </Banner>
    <Heading as="h1" variant="h2" my={8} sx={{ textAlign: 'center' }}>
      why sapphires?
    </Heading>
    <ContentFlex heading="sapphires:">
      <Text as="p" variant="copy">
        revered throughout history for their beauty, sapphires have been a
        popular choice for engagement rings for generations. we love using
        ethically-sourced sapphires in our one-of-a-kind beloved pieces because
        of their variety of shades and colours, traceability from mine to
        market, and the high ethical standards around sourcing them.
      </Text>
      <Text as="p" variant="copy">
        our founder, maggie aurocco, set out to create forever-pieces that
        signify love as ethically and sustainably as possible— and we've never
        looked back. sapphires are extremely durable, making them perfect for
        everyday wear and heirloom pieces. the sapphires we use are
        predominantly sourced from montana, and we want to share some
        information about why we love them.
      </Text>
    </ContentFlex>
    <Banner height={385} noMobile>
      <StaticImage
        className="headerFull"
        src="../images/sapphires/header2.jpg"
        alt=""
        placeholder="blurred"
        style={{ flex: 1 }}
      />
    </Banner>
    <ContentGrid>
      <ImageFlex>
        <StaticImage
          src="../images/sapphires/couple-with-ring.png"
          alt=""
          placeholder="blurred"
          style={{ flex: 1 }}
        />
      </ImageFlex>
      <Box mx={['auto', 5]} px={[4, 0]} sx={{ maxWidth: 350 }}>
        <Heading as="h2" variant="h2" pt={[5, 0]} pb={6}>
          forever in love
        </Heading>
        <Text as="p" variant="copy" mb={5} sx={{ width: '100%' }}>
          "i knew that with jessica's personality, just any ring would not do… i
          knew this was the best place to find the perfect ring. as soon as i
          saw the collection and saw this beautiful blue sapphire shine in real
          life i instantly knew this was the one for jess"
        </Text>
        <Box as="ul" sx={{ padding: 0 }} ml={3}>
          <Text as="li" variant="caps" sx={{ fontSize: 1 }} pl={2}>
            jessica
          </Text>
        </Box>
        <Box
          as="ul"
          sx={{ padding: 0, listStyle: 'none', wordBreak: 'break-all' }}
          mt={3}
        >
          <Text
            as="li"
            sx={{
              fontWeight: 'bold',
              display: 'inline',
            }}
          >
            @jesstirimacco
          </Text>
        </Box>
      </Box>
    </ContentGrid>
    <Box
      sx={{
        display: ['flex', 'none'],
        justifyContent: 'stretch',
        width: '100%',
        maxHeight: 400,
      }}
      mx="auto"
    >
      <StaticImage
        src="../images/sapphires/2a.jpg"
        alt=""
        placeholder="blurred"
        style={{ flex: 1 }}
      />
    </Box>
    <Flex
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        bg: 'bbBackground',
        height: [175, 155],
      }}
      mb={[5, 6, 7]}
    >
      <Button
        as={GatsbyLink}
        variant="outline"
        sx={{ textAlign: 'center', fontSize: 1 }}
        to="/book-a-consultation"
      >
        book an engagement consultation
      </Button>
    </Flex>
    <ContentFlex heading="history of sapphire engagement rings:">
      <Text as="p" variant="copy">
        being symbolic of romantic love, truth, and commitment, sapphires have
        long been an intuitive choice for an engagement ring. their popularity
        spread through various royal families in the 14th and 15th centuries,
        and in the 18th century their association grew more widespread with the
        publication of a popular story called le sapphire merveillance, written
        by mme de genlis.
      </Text>
      <Text as="p" variant="copy">
        victorian-era engagement rings were typically made of yellow or rose
        gold, ranging from simple, minimalistic designs to ornate acrostic ring
        designs with hidden meanings, in which different stones would be used as
        a secret code to spell out messages. for example, lapis lazuli, opal,
        vermarine, and emerald would be used in a ring to spell out the word
        'love' - in this system, sapphires represented the letter 's'.
      </Text>
    </ContentFlex>
    <ContentGrid>
      <ImageFlex>
        <StaticImage
          src="../images/sapphires/1a.jpg"
          alt=""
          placeholder="blurred"
          style={{ flex: 1 }}
        />
      </ImageFlex>
      <ImageFlex noMobile>
        <StaticImage
          src="../images/sapphires/1b.jpg"
          alt=""
          placeholder="blurred"
          style={{ flex: 1 }}
        />
      </ImageFlex>
    </ContentGrid>
    <ContentFlex heading="montana sapphires:">
      <Text as="p" variant="copy">
        all our sapphires are typically sourced from rock creek and el dorado in
        montana. sapphires were first discovered in montana around 1865 by gold
        rush prospectors seeking out gold in the missouri river- but they were
        not recognized for their value until much later, when a sample was sent
        to tiffany's in new york in 1894.
      </Text>
      <Text as="p" variant="copy">
        one thing that makes montana sapphires particularly special is the broad
        variety of colours they come in: typically lighter pastel shades than
        their deeper, inkier counterparts found in other parts of the world.
        from soft sea glass greens and ethereal, smoky grey-blues to pastel
        lilacs and pinks, peachy yellows and oranges, and almost any other shade
        imaginable, no two stones are truly alike- guaranteeing you a
        one-of-a-kind piece.
      </Text>
    </ContentFlex>
    <ContentGrid>
      <ImageFlex>
        <StaticImage
          src="../images/sapphires/2a.jpg"
          alt=""
          placeholder="blurred"
          style={{ flex: 1 }}
        />
      </ImageFlex>
      <ImageFlex noMobile>
        <StaticImage
          src="../images/sapphires/2b.jpg"
          alt=""
          placeholder="blurred"
          style={{ flex: 1 }}
        />
      </ImageFlex>
      <Flex sx={{ width: '100%', maxWidth: 420 }} ml="auto" mr={['auto', 0]}>
        <Text as="p" variant="copy" sx={{ maxWidth: 380, fontSize: 1 }} px={5}>
          sometimes sapphires are heat-treated to coax a more
          intensely-saturated colour and increased clarity to the stone. as we
          love them in all their shades, we carry both heat-treated and
          untreated sapphires in order to offer a wide range of options to pick
          from. heat treatment is a completely safe process that does not weaken
          or threaten the integrity of the stone- in fact, over 90% of
          gem-quality sapphires are heat-treated to enhance their colour and
          clarity.
        </Text>
      </Flex>
      <ImageFlex>
        <StaticImage
          src="../images/sapphires/3a.png"
          alt=""
          placeholder="blurred"
          style={{ flex: 1 }}
        />
      </ImageFlex>
    </ContentGrid>
    <Banner height={385} noMobile>
      <StaticImage
        className="headerFull"
        src="../images/sapphires/header3.jpg"
        alt=""
        placeholder="blurred"
        style={{ flex: 1 }}
      />
    </Banner>
    <ContentFlex heading="so, why sapphires?">
      <Text as="p" variant="copy">
        sapphires score a 9 out of 10 on the mohs scale, which measures the
        hardness and durability of gemstones- a close runner-up only to
        diamonds, which score a 10. this makes sapphire an excellent choice for
        an engagement ring: sturdy enough to withstand daily wear and last for
        generations as a future heirloom
      </Text>
      <Text
        as="p"
        variant="copy"
        sx={{
          span: { display: 'block', marginBottom: '15px' },
          a: {
            color: 'primary',
            fontWeight: 'bold',
            textDecoration: 'none',
          },
          'a:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <span>
          no two sapphires are alike. each is unique in colour and cut, as
          inimitable as your love story
        </span>
        <span>
          as the birthstone for september, sapphires make a perfect choice for
          honouring september-born beloveds!
        </span>
        <span>
          curious about what makes our artist-cut sapphires so special?{' '}
          <GatsbyLink to="/blog/what-is-an-artist-cut-sapphire">
            find out more on our blog
          </GatsbyLink>
          .
        </span>
      </Text>
    </ContentFlex>
    <Divider sx={{ borderColor: 'white' }} py={7} />
  </Layout>
)

export default SapphiresPage
