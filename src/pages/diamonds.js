import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Container, Flex, Grid, Heading, Text } from 'theme-ui'
import BrownButton from '../components/BrownButton'
import Banner from '../components/content/Banner'
import Layout from '../components/layout'
import { Breadcrumbs } from '../components/Breadcrumbs'

const DiamondsPage = () => (
  <Layout
    title=" Ethical Engagement Rings: Choosing Sustainable Diamonds"
    description="How to choose ethical diamonds for the engagement rings? Our guide to diamonds is here to help to navigate the world of shopping for conflict-free rings- 4C's, Kimberley Process and beyond."
    isBeloved
  >
    <Container
      sx={{
        // maxWidth: '100vw',
        // background: 'url("/background_beige.webp")',
        textAlign: 'center',
        h3: {
          // bg: '#f9f1e8',
          textTransform: 'uppercase',
          fontFamily: 'body',
          fontSize: 4,
          fontWeight: 'body',
          letterSpacing: 'widest',
          paddingTop: 7,
        },
        h4: {
          fontFamily: 'body',
          fontSize: 1,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          paddingTop: 4,
        },
        p: {
          // bg: '#f9f1e8',
          fontSize: 1,
          fontFamily: 'body',
          letterSpacing: 'wider',
          lineHeight: '2.5em',
          padding: 5,
          paddingBottom: 0,
          maxWidth: 1280,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        ul: { padding: 0, listStyleType: 'none' },
        li: {
          // bg: '#f9f1e8',
          width: 'fit-content',
          fontSize: 1,
          letterSpacing: 'wider',
          margin: 'auto',
          paddingBottom: 3,
          ':before': { content: '"•\\00a0\\00a0\\00a0"', fontSize: 0 },
        },
        span: { display: 'block' },
      }}
      p={[0, 0, 0]}
    >
      <Banner height={380}>
        <StaticImage
          src="../images/diamonds/banner-0-lg.png"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/diamonds/banner-0-sm.png"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Breadcrumbs
        sx={{ maxWidth: 1000, width: '100%', alignItems: 'center' }}
        pt={[3, 5]}
        pb={[0, 0]}
        mx="auto"
        px={4}
        currentPage={{
          path: `/diamonds`,
          text: 'our diamonds',
        }}
      />
      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          alignItems: 'center',
          justifyContent: 'center',
          'h1 span': { position: 'absolute', left: '-999em' },
          img: { width: [300, 300, 400] },
        }}
        pt={[7, 3]}
        pb={3}
      >
        <Heading as="h1" variant="h2" pt={4}>
          our <span>diamonds</span>
        </Heading>
        <StaticImage
          id="headerImg"
          src="../images/diamonds/text-diamonds.webp"
          alt=""
          placeholder="blurred"
        />
      </Flex>
      <Heading as="h2" variant="h2">
        conflict-free diamonds
      </Heading>
      <Text as="p">
        we are committed to using ethically sourced diamonds for all our pieces,
        and are proud to offer conflict-free diamonds in accordance with the
        kimberley process.
      </Text>
      <Text as="p">
        we work closely with all of our diamond suppliers to ensure that the
        diamonds we source come from places where workers are treated fairly— at
        all points of the process.
      </Text>
      <Heading as="h3">recycled &amp; antique diamonds</Heading>
      <Text as="p">
        in order to create ethically sourced engagement rings, we often work
        with recycled or antique diamonds. these responsible diamonds have been
        previously used in jewelry and are re-cut and polished to restore them
        to their best, ready for a new life as a bluboho diamond. due to the
        process involved in reclaiming these stones and ensuring their integrity
        is “like new”, these ethical diamonds, which are wearable historical
        artifacts, command a premium.
      </Text>
      <Flex
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1300,
          justifyContent: ['flex-start', 'flex-start', 'flex-end'],
          marginTop: 4,
          marginBottom: '-60px',
        }}
        px={[6, 7, 8]}
        mx="auto"
      >
        <StaticImage
          src="../images/medallions/recycled-materials.webp"
          alt=""
          placeholder="blurred"
          width={135}
          height={115}
        />
      </Flex>
      <Banner height={[400, 540]}>
        <StaticImage
          src="../images/diamonds/banner-1-lg.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/diamonds/banner-1-sm.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Heading as="h3">looking for something a little different?</Heading>
      <Text as="p">
        we also offer some pieces that go beyond the traditional white brilliant
        cut diamond, opting instead for the captivating look of rose cut white
        diamonds, black diamonds, or grey diamonds.
      </Text>
      <StaticImage
        src="../images/diamonds/text-fourCs.webp"
        placeholder="blurred"
        alt=""
      />
      <Text as="p">
        one of the first things you'll hear when you start researching how to
        buy an engagement ring, particularly with regard to diamonds, is to look
        for the four cs. we believe that if a ring is beautiful, durable, and
        feels right, things like this don't necessarily matter— but it's still
        good to know the basics.
      </Text>
      <Text mt={5}>THE FOUR CS STAND FOR:</Text>
      <ul>
        <li>cut</li>
        <li>clarity</li>
        <li>colour</li>
        <li>carat</li>
      </ul>
      <Banner>
        <StaticImage
          src="../images/diamonds/banner-2-lg.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/diamonds/banner-2-sm.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <StaticImage
        src="../images/diamonds/text-cut.webp"
        placeholder="blurred"
        alt=""
      />
      <Text as="p">
        “cut” refers to how the rough gem was shaped and faceted to increase its
        brilliance. different cut names denote different proportions and shapes.
      </Text>
      <Grid
        sx={{
          maxWidth: 1000,
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          p: { maxWidth: 480 },
        }}
        my={6}
        mx="auto"
      >
        <Box>
          <StaticImage
            src="../images/diamonds/cut-1.webp"
            placeholder="blurred"
            alt=""
          />
          <Text as="p">
            round brilliant cut: a brilliant cut is likely what comes to mind
            when you imagine a diamond. they are glittery and fiery in the sun,
            refracting the light for maximum sparkle.
          </Text>
        </Box>
        <Box>
          <StaticImage
            src="../images/diamonds/cut-2.webp"
            placeholder="blurred"
            alt=""
          />
          <Text as="p">
            rose-cut: rose cuts have a soft, romantic glimmer— like comparing
            the sparkle of a disco ball (like a brilliant cut) to the twinkle of
            candlelight.
          </Text>
        </Box>
        <Box>
          <StaticImage
            src="../images/diamonds/cut-3.webp"
            placeholder="blurred"
            alt=""
          />
          <Text as="p">
            marquise cuts: marquise cuts are leaf-shaped, elongating the stone
            for an elegant, flattering effect.
          </Text>
        </Box>
        <Box>
          <StaticImage
            src="../images/diamonds/cut-4.webp"
            placeholder="blurred"
            alt=""
          />
          <Text as="p">
            baguette cuts: baguette cuts are rectangular stones step-cut for a
            clean, prismatic shine.
          </Text>
        </Box>
      </Grid>
      <BrownButton
        to="/book-a-consultation"
        text="book an engagement consultation"
      />
      <Grid
        sx={{
          maxWidth: 1300,
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gap: [0, 6, 8],
          '.noMobile': { display: ['none', 'block'] },
        }}
        pt={3}
        mx="auto"
      >
        <StaticImage
          src="../images/diamonds/artwork-1.webp"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          className="noMobile"
          src="../images/diamonds/artwork-2.webp"
          alt=""
          placeholder="blurred"
        />
      </Grid>
      <StaticImage
        src="../images/diamonds/metals.png"
        placeholder="blurred"
        alt=""
      />
      <Text as="p">
        fewer than 1% of diamonds form without a blemish or some kind of
        inclusion, which means most stones have natural inclusions in them — we
        don't call them “imperfections” because we think those natural details
        add character and complexity, making these gems one-of-a-kind.
      </Text>
      <Text as="p">
        diamond clarity is rated from fl (which means flawless and is extremely
        rare) to i3 (large visible inclusions). most of the stones we carry fall
        around the middle of the spectrum, where inclusions might exist, but
        they can only be seen under a microscope. the benefit of these stones is
        that they do not disrupt the beauty or sparkle of the diamond while
        having a very reasonable price point.
      </Text>
      <Heading as="h3">diamond clarity scale:</Heading>
      <Box>
        <Heading as="h4"> i1, i2, i3: included diamonds</Heading>
        <ul>
          <li>
            i clarity diamonds have obvious inclusions that are likely to be
            visible.
          </li>
        </ul>
        <StaticImage
          src="../images/diamonds/clarity-i.webp"
          placeholder="blurred"
          alt=""
        />
        <Heading as="h4">si1, si2: slightly included (si) diamonds</Heading>
        <ul>
          <li>
            inclusions are visible at 10x magnification, but may not be visible
            to the naked eye (known as eye clean).
          </li>
          <li>if they are eye clean, si diamonds are often the best value.</li>
          <li>
            si2 inclusions may be detectable to a keen unaided eye, especially
            when viewed from the side.
          </li>
        </ul>
        <StaticImage
          src="../images/diamonds/clarity-si.webp"
          placeholder="blurred"
          alt=""
        />
        <Heading as="h4">
          vs1, vs2: very slightly included (vs) diamonds
        </Heading>
        <ul>
          <li>
            minor inclusions, ranging from difficult to see (vs1) to somewhat
            easy to see (vs2) at 10x magnification.
          </li>
        </ul>
        <StaticImage
          src="../images/diamonds/clarity-vsi.webp"
          placeholder="blurred"
          alt=""
        />
        <Heading as="h4">
          vvs1, vvs2: very, very slightly included (vvs) diamonds
        </Heading>
        <ul>
          <li>
            vvs diamonds have minuscule inclusions that are difficult to see,
            even for trained eyes, under 10x magnification.
          </li>
          <li>vvs clarity is rare, resulting in an eye clean appearance.</li>
        </ul>
        <StaticImage
          src="../images/diamonds/clarity-vvsi.webp"
          placeholder="blurred"
          alt=""
        />
      </Box>
      <StaticImage
        src="../images/diamonds/text-colour.webp"
        placeholder="blurred"
        alt=""
      />
      <Text as="p">
        white diamonds are always graded on a colour scale. the scale runs from
        pure white to yellow, d to z.
      </Text>
      <Text sx={{ display: ['none', 'block'] }}>
        please note: this scale is only applicable to white diamonds— black,
        grey, or champagne diamonds don't apply.
      </Text>
      <Grid
        sx={{
          gridTemplateColumns: [
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
          ],
          maxWidth: 700,
          span: { display: 'block', fontSize: 4, fontWeight: 'heading' },
        }}
        mt={6}
        mx="auto"
      >
        <Box>
          <StaticImage
            src="../images/diamonds/colour-1.webp"
            placeholder="blurred"
            alt=""
          />
          <Text>D</Text>
        </Box>
        <Box>
          <StaticImage
            src="../images/diamonds/colour-2.webp"
            placeholder="blurred"
            alt=""
          />
          <Text>H</Text>
        </Box>
        <Box>
          <StaticImage
            src="../images/diamonds/colour-3.webp"
            placeholder="blurred"
            alt=""
          />
          <Text>N</Text>
        </Box>
        <Box>
          <StaticImage
            src="../images/diamonds/colour-4.webp"
            placeholder="blurred"
            alt=""
          />
          <Text>Z</Text>
        </Box>
      </Grid>
      <Text as="p" sx={{ display: ['block', 'none'] }}>
        please note: this scale is only applicable to white diamonds— black,
        grey, or champagne diamonds don't apply.
      </Text>
      <StaticImage
        src="../images/diamonds/text-carat.webp"
        placeholder="blurred"
        alt=""
      />
      <Text as="p" mb={7}>
        carats are the measurement unit used to describe a stone's weight. carat
        weight doesn't always reflect on the diameter of a stone, since
        different cuts or settings can camouflage or accentuate a stone's
        profile. generally, it is a fairly good indication of size.
      </Text>
      <Banner height={[400, 750]}>
        <StaticImage
          src="../images/diamonds/banner-3-lg.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/diamonds/banner-3-sm.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
    </Container>
  </Layout>
)

export default DiamondsPage
