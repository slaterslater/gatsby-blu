import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Container, Grid, Heading, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import BrownButton from '../../components/BrownButton'
import Banner from '../../components/content/Banner'
import Layout from '../../components/layout'
import { Breadcrumbs } from '../../components/Breadcrumbs'

const WearAndCarePage = () => (
  <Layout
    title="Making it last- how to care for your engagement ring?"
    description="How to keep your wedding and engagement jewelry in the best shape for many years to come? This guide will teach you how to care for your diamond and sapphire gold engagement rings. beloved by bluboho. Book a complimentary engagement ring appointment today"
    isBeloved
  >
    <Container
      sx={{
        minWidth: 380,
        textAlign: 'center',
        h2: {
          fontFamily: 'body',
          textTransform: 'uppercase',
          fontSize: 4,
          fontWeight: 'body',
          margin: 3,
          textAlign: 'center',
          fontWeight: 'bold',
          letterSpacing: 'wider',
        },
        h3: {
          fontFamily: 'body',
          fontSize: 3,
          paddingLeft: 6,
          paddingRight: 6,
        },
        p: {
          maxWidth: 880,
          margin: 'auto',
          padding: 6,
          paddingBottom: 3,
          paddingTop: 4,
          textAlign: 'center',
          lineHeight: 2,
        },
        a: { color: 'primary' },
        ul: {
          padding: 0,
          margin: 'auto',
          marginTop: 4,
          paddingLeft: 8,
          paddingRight: 6,
        },
        li: {
          bg: '#eeece1',
          fontSize: 1,
          letterSpacing: 'wider',
          lineHeight: 1.8,
          textAlign: 'left',
          paddingBottom: 5,
        },
        'ul.center': {
          listStyleType: 'none',
          paddingLeft: 6,
          li: { textAlign: 'center' },
          'li:before': {
            content: '"•\\00a0\\00a0\\00a0"',
            fontSize: 0,
          },
        },
        'li::marker': { fontSize: '8px' },
        'div.mobile': { display: ['inline-block', 'none'] },
        'div.desktop': { display: ['none', 'inline-block'] },
        '.last': { marginBottom: 7 },
      }}
      p={[0, 0, 0]}
    >
      <Banner height={[500, 750]}>
        <StaticImage
          src="../../images/wear-and-care/banner-00-lg.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../../images/wear-and-care/banner-00-sm.webp"
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
          path: `/beloved/wear-and-care`,
          text: 'wear & care',
        }}
      />
      <Box
        sx={{
          h1: { position: 'absolute', left: '-999em' },
          textAlign: 'center',
          transform: ['translateY(-380px)', 'translateY(-580px)'],
          height: 0,
        }}
      >
        <Heading as="h1" aria-hidden="true">
          wear &amp; care
        </Heading>
        <StaticImage
          className="mobile"
          src="../../images/wear-and-care/text-wear-and-care-sm.webp"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          className="desktop"
          src="../../images/wear-and-care/text-wear-and-care-lg.webp"
          alt=""
          placeholder="blurred"
        />
      </Box>
      <Heading as="h2" pt={7}>
        how to take care of your engagement ring
      </Heading>
      <Text as="p" variant="copy">
        we handcraft our beloved by bluboho rings with the intention for them to
        be worn, cherished, and kept forever— so it’s important to take care of
        them. while we carefully select our materials for maximum durability,
        they still need regular maintenance to ensure their longevity. follow
        our jewelry care instructions below to keep them shining their
        brightest.
      </Text>
      <Heading as="h2" pt={5}>
        our top engagement ring care tips
      </Heading>
      <Text as="p" variant="copy">
        make sure to visit or contact us for an annual checkup and deep clean.
        we suggest this for all of our pieces, but especially for engagement
        rings: this is the best way to ensure that the prongs will continue to
        keep your stone secure.
      </Text>
      <Text as="p" variant="copy">
        in order to preserve the original beauty and integrity of your heirloom
        piece, there are a few things you can do for optimal jewelry care.
        remove your rings during the following activities to prevent damage:
      </Text>
      <Heading as="h3" py={5}>
        remove your rings during the following activities to prevent damage:
      </Heading>
      <Box as="ul" sx={{ maxWidth: 'fit-content' }}>
        <li>sports/working out</li>
        <li>cleaning</li>
        <li>gardening</li>
        <li>swimming, especially in chlorinated pools and hot tubs</li>
        <li>applying cosmetics such as perfumes, sprays, creams, and oils</li>
      </Box>
      <Grid
        sx={{
          width: 'fit-content',
          gridTemplateColumns: ['1fr 1fr', 'repeat(3, 200px)'],
          gridTemplateRows: 220,
          img: { objectFit: 'contain !important' },
          'div:last-of-type': { gridColumn: ['span 2', 'auto'] },
        }}
        mx="auto"
        my={[5, 7]}
      >
        <StaticImage
          src="../../images/wear-and-care/no-gardening-sm.webp"
          alt=""
          placeholder="blurred"
          width={200}
          height={200}
        />
        <StaticImage
          src="../../images/wear-and-care/no-cleaning-sm.webp"
          alt=""
          placeholder="blurred"
          width={200}
          height={200}
        />
        <StaticImage
          id="span2"
          src="../../images/wear-and-care/no-gym-sm.webp"
          alt=""
          placeholder="blurred"
          width={200}
          height={220}
        />
      </Grid>
      <Grid
        sx={{
          maxWidth: 1300,
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gap: [0, 6, 8],
          '.noMobile': { display: ['none', 'block'] },
        }}
        // pt={3}
        py={5}
        mx="auto"
      >
        <StaticImage
          src="../../images/wear-and-care/artwork-01-lg.webp"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          className="noMobile"
          src="../../images/wear-and-care/artwork-02-lg.webp"
          alt=""
          placeholder="blurred"
        />
      </Grid>
      <StaticImage
        className="desktop"
        src="../../images/wear-and-care/text-how-should-i-store-lg.webp"
        alt=""
        placeholder="blurred"
        width={600}
      />
      <StaticImage
        className="mobile"
        src="../../images/wear-and-care/text-how-should-i-store-sm.webp"
        alt=""
        placeholder="blurred"
      />

      <Heading as="h2" pb={5}>
        storing your beloved rings
      </Heading>
      <Box as="ul" sx={{ maxWidth: 730 }}>
        <li>
          we recommend storing each of your rings separately to avoid scratches.
          place your pieces in a pouch, ring box, or airtight plastic bag
          whenever you are not wearing them
        </li>
        <li>
          place your pieces in a pouch to minimize contact with dust and excess
          moisture in the air
        </li>
        <li>be sure to keep your jewelry away from extreme heat or moisture</li>
        <li>
          bring a travel pouch with you if you plan to remove your jewelry away
          from home
        </li>
      </Box>
      <Banner mt={6}>
        <StaticImage
          src="../../images/wear-and-care/banner-01-lg.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../../images/wear-and-care/banner-01-sm.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Heading as="h2" pt={7}>
        how to clean your engagement ring + wedding ring
      </Heading>
      <Text as="p" variant="copy">
        engagement ring cleaning is simple and easy— especially with our{' '}
        <GatsbyLink to="/products/cleaning-kit">
          sustainable, non-toxic cleaning kit
        </GatsbyLink>
        . take a look below to see our recommended practices for how to clean
        fine jewelry. you can also bring your rings into any of our locations
        for a complimentary professional ring cleaning!
      </Text>
      <StaticImage
        className="desktop"
        src="../../images/wear-and-care/text-at-home-cleaning-lg.webp"
        alt=""
        placeholder="blurred"
        width={800}
      />
      <StaticImage
        className="mobile"
        src="../../images/wear-and-care/text-at-home-cleaning-sm.webp"
        alt=""
        placeholder="blurred"
        width={300}
      />
      <Text as="p" variant="copy">
        in a bowl, combine a few drops of mild dishwashing soap with warm water.
        let your pieces soak in this mixture for about 15 minutes. if you want
        to get into fine areas of your piece, gently take a soft bristle
        toothbrush and lightly scrub. rinse off with warm water and pat dry. if
        you want to give your piece an extra shine, it can be done with a
        polishing cloth.
      </Text>
      <StaticImage
        src="../../images/wear-and-care/cleaning-kit-sm.webp"
        alt=""
        placeholder="blurred"
        style={{ margin: '25px 0' }}
      />
      <BrownButton
        to="/book-a-consultation"
        text="book an engagement consultation"
      />
      <Banner height={500} pt={5}>
        <StaticImage
          src="../../images/wear-and-care/banner-02-lg.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../../images/wear-and-care/banner-02-sm.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Heading as="h2" pt={7}>
        request a repair
      </Heading>
      <Text as="p" variant="copy">
        we are delighted to offer engagement ring care services to keep your
        pieces shining their brightest.
      </Text>
      <Heading as="h3" pt={6} pb={4}>
        our services include:
      </Heading>
      <ul className="center">
        <li>ring size measurement and jewelry sizing</li>
        <li>professional ring cleaning and polishing</li>
        <li>annual maintenance checkup</li>
        <li>repairs</li>
      </ul>
      <Text as="p" variant="copy">
        we accept products for servicing and in-store cleaning at all of{' '}
        <GatsbyLink to="/locations">our locations</GatsbyLink>. appointments can
        be made by contacting your nearest store.
      </Text>
      <Heading as="h3" pt={6} pb={4}>
        <GatsbyLink to="/locations">find your nearest store</GatsbyLink>
      </Heading>
      <Text as="p" variant="copy">
        to submit a repair request by email, contact us at{' '}
        <a href="mailto:guestexperience@bluboho.com">
          guestexperience@bluboho.com
        </a>{' '}
        with the following information:
      </Text>
      <ul className="center last">
        <li>the original order number or date the piece was purchased</li>
        <li>How often you wear the piece</li>
        <li>Where the was necklace purchased (store location or online)</li>
        <li>whether the piece has come across any tugs, pulls or strains</li>
      </ul>
    </Container>
  </Layout>
)

export default WearAndCarePage
