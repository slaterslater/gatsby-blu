import React from 'react'
import { Box, Button, Flex, Grid, Heading, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Banner from '../components/content/Banner'

const Copy = ({ children, ...props }) => (
  <Grid
    sx={{
      columnGap: 9,
      gridTemplateColumns: ['1fr', '1fr 1fr', '400px 400px'],
    }}
    mx="auto"
    pt={4}
    pb={6}
    pl={6}
    pr={4}
    {...props}
  >
    {children}
  </Grid>
)

const SubHeading = ({ children }) => (
  <Heading as="h2" variant="h2" sx={{ textAlign: 'center' }} mt={5} py={7}>
    {children}
  </Heading>
)

const Paragraph = ({ children }) => (
  <Text as="p" variant="copy" py={4}>
    {children}
  </Text>
)

const BigButton = ({ to, text }) => (
  <Flex
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      height: 160,
      bg: 'bbBackground',
      to,
    }}
  >
    <Button variant="outline" as={GatsbyLink} to={to}>
      {text}
    </Button>
  </Flex>
)

const ImageGrid = ({ children }) => (
  <Grid
    sx={{
      columnGap: [4, 6, 8],
      gridTemplateColumns: ['1fr', '1fr 1fr', 'minmax(1fr, 565px)'],
      '.noMobile': { display: ['none', 'block'] },
    }}
    mx="auto"
    px={5}
  >
    {children}
  </Grid>
)

const OriginStoryPage = () => (
  <Layout
    title="about bluboho refined jewelry | sustainable fine jewelry and unique engagement rings"
    description="discover the origin story of bluboho, a Canadian sustainable fine jewelry brand committed to protecting the natural world. explore our ethically-made jewelry, and the sustainable practices and contemplation behind each piece"
  >
    <Banner height={[750, 500]}>
      <StaticImage
        className="desktop"
        src="../images/our-origin-story/banner-00-dsk.webp"
        alt=""
      />
      <StaticImage
        className="mobile"
        src="../images/our-origin-story/banner-00-mbl.webp"
        alt=""
      />
    </Banner>
    <Heading as="h1" variant="h2" sx={{ textAlign: 'center' }} py={7}>
      our origin story
    </Heading>
    <Copy>
      <Box>
        <Paragraph>
          bluboho's journey started in 2010 when a pair of determined women were
          inspired to make a difference in the world of fine jewelry. their
          vision was inspired by the desire to offer deeply-meaningful jewelry
          paired with a beautiful, nurturing experience.
        </Paragraph>
        <Paragraph>
          driven by their passion for sustainable jewelry rich in storytelling
          and a desire to encourage conscious consumerism, they dedicated
          themselves to crafting something extraordinary. the result is bluboho:
          raw, refined, sustainable fine jewelry that would mark the most
          significant milestones in our lives.
        </Paragraph>
      </Box>
      <Box>
        <Paragraph>
          part of this journey led us to create beloved by bluboho: engagement
          and wedding jewelry designed for every moment from popping the
          question to saying “i do”.
        </Paragraph>
        <Paragraph>
          we specialize in unique sapphire engagement rings and diamond wedding
          bands, all of which are thoughtfully designed and handmade.
        </Paragraph>
      </Box>
    </Copy>
    <BigButton text="learn more about beloved by bluboho" to="/beloved" />
    <Banner>
      <StaticImage
        className="desktop"
        src="../images/our-origin-story/banner-01-dsk.webp"
        alt=""
      />
      <StaticImage
        className="mobile"
        src="../images/our-origin-story/banner-01-mbl.webp"
        alt=""
      />
    </Banner>
    <SubHeading>our name</SubHeading>
    <Text
      variant="caps"
      sx={{
        fontWeight: 'bold',
        lineHeight: 2,
        textAlign: 'center',
        maxWidth: 680,
      }}
      px={5}
      mx="auto"
    >
      bluboho: blu as the sea and sky, imparting the notion of endless
      possibility,
      <br />
      boho to celebrate the free-spirited lifestyle our pieces embody.
    </Text>
    <Copy>
      <Paragraph>
        our name is an emblem of who we are and what we do—handmade fine jewelry
        steeped in storied meaning, grounded in the natural world, alive with
        spirit and personality.
      </Paragraph>
      <Paragraph>
        over the years, bluboho has evolved from a name into a love story. it is
        a brand, a collective, and an experience that finds meaning in
        connection— to the earth, to each other, and to ourselves— through the
        moments that define our lives.
      </Paragraph>
    </Copy>
    <ImageGrid>
      <StaticImage src="../images/our-origin-story/artwork-01.webp" alt="" />
      <StaticImage
        className="noMobile"
        src="../images/our-origin-story/artwork-02.webp"
        alt=""
      />
    </ImageGrid>
    <SubHeading>a note from our founder: the bluboho ethos</SubHeading>
    <Flex sx={{ justifyContent: 'center', maxWidth: 800 }} mx="auto">
      <StaticImage src="../images/our-origin-story/banner-02.webp" alt="" />
    </Flex>
    <Copy>
      <Box>
        <Paragraph>
          "we are cosmic beings on a human journey and our lives are created
          through a series of moments. we believe these moments are our legacy,
          and we exist to ensure they live on.
        </Paragraph>
        <Paragraph>
          bluboho was born from a desire to bookmark life's moments. we believe
          in the magic of connection
        </Paragraph>
      </Box>
      <Box>
        <Paragraph>
          and shared experience— that through our jewelry we can celebrate,
          mourn, share our stories, contemplate the world around us, and connect
          deeply… because ultimately, that is why we're here."
        </Paragraph>
        <Text sx={{ fontWeight: 'bold' }}> — maggie aurocco</Text>
      </Box>
    </Copy>
    <ImageGrid>
      <StaticImage src="../images/our-origin-story/artwork-03.webp" alt="" />
      <StaticImage
        className="noMobile"
        src="../images/our-origin-story/artwork-04.webp"
        alt=""
      />
    </ImageGrid>
    <SubHeading>environmentalism</SubHeading>
    <Text
      variant="caps"
      sx={{ fontWeight: 'bold', textAlign: 'center' }}
      mx="auto"
      px={5}
    >
      our process is led by a love for the earth: the source of our deepest
      inspiration and natural materials.
    </Text>
    <Copy>
      <Paragraph>
        we have a deep reverence for the natural world. we have always been
        inspired by the beauty and magic of nature. we set out to find ways to
        honour mother earth by telling her stories.
      </Paragraph>
      <Paragraph>
        our environmentalism is an ongoing practice and conversation, and we are
        always seeking new ways to innovate. we are always working hard to
        minimize our impact through all of our actions, big and small.
      </Paragraph>
    </Copy>
    <BigButton
      text="learn more about our sustainable practices"
      to="/sustainable-practices"
    />
    <Flex sx={{ justifyContent: 'center', maxWidth: 1000 }} mx="auto" mt={4}>
      <StaticImage src="../images/our-origin-story/banner-04.webp" alt="" />
    </Flex>
    <SubHeading>artistry + contemplation</SubHeading>
    <Copy mb={9} mt={-6}>
      <Box>
        <Paragraph>
          each bluboho piece is designed to embody a symbolic story that
          inspires a moment of contemplation.
        </Paragraph>
        <Paragraph>
          between the vendors who source our materials, our in-house designer,
          gemologist, creative team and production team, and the expert artisans
          who handcraft each piece, our jewelry is a labour of love born out of
          creative collaboration.
        </Paragraph>
      </Box>
      <Paragraph>
        we want our jewelry to become the accent notes that capture your
        precious memories and tell your life story, adding personal details and
        nuances to your self-expression.
      </Paragraph>
    </Copy>
  </Layout>
)
export default OriginStoryPage
