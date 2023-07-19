import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Container, Flex, Grid, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import Banner from '../components/content/Banner'
import BrownButton from '../components/BrownButton'

import gold14k from '../images/metals-page/gold14k.png'
import gold18k from '../images/metals-page/gold18k.png'
import gold22k from '../images/metals-page/gold22k.png'
import { Breadcrumbs } from '../components/Breadcrumbs'

const Paragraph = ({ maxWidth = '100%', children }) => (
  <Text as="p" variant="copy" sx={{ maxWidth }} mx="auto" px={5} pb={6}>
    {children}
  </Text>
)

const BackgroundImage = ({ src, minHeight = 0, className = '' }) => (
  <Box
    className={className}
    sx={{
      bg: '#eeece1',
      minHeight,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundBlendMode: 'multiply',
      '.mobile': { display: ['block', 'none'] },
      '.desktop': { display: ['none', 'block'] },
    }}
  />
)

const MetalsPage = () => (
  <Layout
    title="beyond yellow gold- best metal options for engagement rings"
    description="What is the difference between 14 karat and 18 karat gold?  What is white gold? This guide will help you choose the perfect precious metal to create the engagement ring and a wedding band of your dreams"
    isBeloved
  >
    <Container
      sx={{
        textAlign: 'center',
        h3: {
          textTransform: 'uppercase',
          fontFamily: 'body',
          fontSize: 1,
          letterSpacing: 'widest',
          paddingTop: 3,
          paddingBottom: 5,
        },
      }}
      p={[0, 0, 0]}
    >
      <Banner height={380}>
        <StaticImage
          src="../images/metals-page/banner-1-desktop.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/metals-page/banner-1-mobile.webp"
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
          path: `/metals`,
          text: 'our metals',
        }}
      />
      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          alignItems: 'center',
          justifyContent: 'center',
          'h1 span': { position: 'absolute', left: '-999em' },
          img: { width: [200, 200, 315] },
        }}
        pt={[7, 3]}
        pb={3}
      >
        <Heading as="h1" variant="h2">
          our <span>metals</span>
        </Heading>

        <StaticImage
          id="headerImg"
          src="../images/metals-page/metals.png"
          alt=""
          placeholder="blurred"
        />
      </Flex>
      <Paragraph maxWidth={[null, 800, 950]}>
        our beloved by bluboho engagement rings are handcrafted in 14k recycled
        yellow gold, but we can create timeless, heirloom-quality white gold,
        platinum, or rose gold engagement rings upon request. read on to learn
        about the nuances of our metals.
      </Paragraph>
      <Banner height={380}>
        <StaticImage
          src="../images/metals-page/banner-2-desktop.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/metals-page/banner-2-mobile.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Heading as="h2" variant="h2" py={7}>
        gold 101
      </Heading>
      <Paragraph maxWidth={[null, 525]}>
        all gold used in jewelry is an alloy: this means that pure gold is
        blended with other metals for improved durability— and therefore
        wearability.
      </Paragraph>
      <Paragraph maxWidth={[null, 950]}>
        the percentage of gold to other metals varies with the type of gold:
      </Paragraph>
      <Box
        as="ul"
        sx={{
          padding: 0,
          listStyleType: 'none',
          li: { textTransform: 'uppercase', bg: '#eeece1', paddingBottom: 2 },
          span: { display: 'block', paddingTop: 3 },
        }}
        mb={6}
      >
        <Box as="li">
          <Text>14k is 58.5% pure gold</Text>
          <BackgroundImage src={gold14k} minHeight={100} />
        </Box>
        <Box as="li">
          <Text>18k is 75% pure gold</Text>
          <BackgroundImage src={gold18k} minHeight={100} />
        </Box>
        <Box as="li">
          <Text>22k is 91.75% pure gold</Text>
          <BackgroundImage src={gold22k} minHeight={100} />
        </Box>
      </Box>
      <Paragraph maxWidth={[null, 525, 800]}>
        safe for most with allergies and sensitivities, our rose gold and yellow
        gold are nickel-free and hypoallergenic.
      </Paragraph>
      <Banner>
        <StaticImage
          src="../images/metals-page/banner-3-desktop.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/metals-page/banner-3-mobile.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Heading
        as="h2"
        variant="h2"
        sx={{ maxWidth: [240, 240, null] }}
        py={7}
        mx="auto"
      >
        14k is our gold standard for everyday wear
      </Heading>
      <Paragraph maxWidth={[null, 800]}>
        we want your engagement ring to be heirloom quality so it will last a
        lifetime— just like your love story. we create the majority of our
        engagement rings in 14k recycled yellow gold for optimal durability and
        quality.
      </Paragraph>
      <Paragraph maxWidth={[null, 800]}>
        our iconic sapphire engagement rings mostly feature delicate, fine
        bands. in order to ensure their longevity, we opt for 14k gold that will
        withstand everyday wear without compromising on design.
      </Paragraph>
      <Heading as="h2" variant="h2" pt={3} pb={7}>
        our gold
      </Heading>
      <Paragraph maxWidth={[null, 500, 800]}>
        if you dream of a white gold, 18k yellow gold, or rose gold engagement
        ring, get in touch— we can make that happen!
      </Paragraph>
      <Heading as="h3">yellow gold</Heading>
      <Paragraph maxWidth={[null, 500, 800]}>
        our pieces are made in a soft, buttery yellow gold that is universally
        flattering on all skin tones, mixing beautifully with other metals.{' '}
      </Paragraph>
      <Heading as="h3">rose gold</Heading>
      <Paragraph maxWidth={[null, 550, 600]}>
        beautiful and popular across centuries and eras, rose gold is a gold and
        copper alloy that lends a romantic rosy glow to jewelry. our rose gold
        is nickel-free and largely hypoallergenic.
      </Paragraph>
      <Heading as="h3">white gold</Heading>
      <Paragraph maxWidth={[null, 550, 600]}>
        created by plating yellow gold in rhodium, white gold lends its jewelry
        a silver hue with a heightened durability. please note that white gold
        pieces may need to be replated every few years.
      </Paragraph>
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
          className="noMobile"
          src="../images/metals-page/banner-4-desktop.webp"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/metals-page/banner-5-desktop.webp"
          alt=""
          placeholder="blurred"
        />
      </Grid>
      <Flex
        sx={{
          maxWidth: 1300,
          justifyContent: 'flex-end',
          transform: 'translateY(-60px)',
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
      <Heading as="h2" variant="h2" pb={7}>
        14k, 18k… what does it mean?
      </Heading>
      <Paragraph>
        gold is beloved for its beauty, and it comes in various colours and
        karats, most frequently 10k, 14k, and 18k for jewelry— the higher the
        karat, the more saturated the colour of the gold and the softer the
        metal. the majority of our pieces are made in 14k recycled gold, which
        is preferred for the durability and longevity of your pieces, making
        them heirloom-quality. our 14k gold is a soft, buttery hue that
        compliments all complexions, contrasting beautifully with our array of
        ethically sourced sapphires and diamonds.
      </Paragraph>
      <Heading as="h2" variant="h2" my={3} pt={3} pb={7}>
        recycled gold 101
      </Heading>
      <Paragraph>
        we want you to have an engagement ring you can feel good about wearing
        forever.
      </Paragraph>
      <Paragraph>
        using recycled metals helps us to live out our values by decreasing
        negative environmental impact; by using recycled gold for our engagement
        rings, we are not contributing to mining for new resources, therefore
        lowering the carbon footprint of our pieces and helping to reduce waste.
      </Paragraph>
      <Heading as="h3" my={3}>
        where does recycled gold come from?
      </Heading>
      <Paragraph maxWidth={[null, 550, 600]}>
        post-consumer recycled gold can come from a wide variety of sources,
        such as other jewelry, electronics, and many others. our recycled gold
        is always refined to its purest form and undergoes testing to ensure our
        pieces are always heirloom-quality.
      </Paragraph>
    </Container>
  </Layout>
)

export default MetalsPage
