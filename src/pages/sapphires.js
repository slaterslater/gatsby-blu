import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Container, Flex, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import Banner from '../components/content/Banner'
import BrownButton from '../components/BrownButton'
import { Breadcrumbs } from '../components/Breadcrumbs'

const SapphiresPage = () => (
  <Layout
    title="sapphire engagement rings: the complete guide"
    description="at bluboho, we specialize at creating ethically-made unique engagement rings. this guide will show you why sapphires are the best alternative to diamond rings and how to choose the perfect one for you"
    isBeloved
  >
    <Container
      sx={{
        '.section': {
          textAlign: 'center',
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: [5, 0],
          paddingRight: [5, 0],
        },
        h2: {
          paddingBottom: 6,
        },
        p: {
          fontSize: 1,
          fontFamily: 'body',
          letterSpacing: 'wider',
          paddingBottom: 5,
          margin: 'auto',
          lineHeight: 2,
        },
      }}
      p={[0, 0, 0]}
    >
      <Banner height={385}>
        <StaticImage
          src="../images/sapphires/header.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/sapphires/header_m.webp"
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
          path: `/sapphires`,
          text: 'our sapphires',
        }}
      />
      <Box className="section">
        <Heading as="h1" variant="h2" mt={[6, 8]} mb={5}>
          we are best in the world at crafting unique engagement rings using
          ethically-sourced montana sapphires.
        </Heading>
        <Text as="p">
          revered throughout history for their beauty, sapphires have been a
          popular choice for engagement rings for generations.
        </Text>
        <Text as="p">
          our founder, maggie aurocco, set out to make our engagement rings
          soulful future heirlooms, handmade as ethically and sustainably as
          possible— and since then we've never looked back. the sapphires we use
          are predominantly sourced from montana, and we want to share some
          information about what makes a montana sapphire engagement ring so
          special.
        </Text>
        <Text as="p" sx={{ maxWidth: 720 }}>
          <strong>the ethical choice</strong>: we work closely with our stone
          cutters, vendors, and artisans to ensure that every point of the
          supply chain is aligned with our sustainable and ethical values
        </Text>
        <Text as="p" px={7}>
          <strong>
            montana sapphires naturally occur in a wide variety of shades and
            colours
          </strong>
        </Text>
        <StaticImage
          src="../images/sapphires/uniquely_yours.png"
          alt=""
          placeholder="blurred"
        />
      </Box>
      <Flex
        sx={{
          bg: 'prodBackground',
          flexDirection: ['column', 'row'],
          justifyContent: 'center',
          alignItems: 'center',
        }}
        p={[5, 7]}
        my={6}
      >
        <Box sx={{ maxWidth: 475, textAlign: 'center' }} mx={[4, 6, 7]} pb={5}>
          <Heading as="h2" variant="h2">
            the mohs scale of hardness
          </Heading>
          <Text as="p" px={4}>
            sapphires score a 9 out of 10 on the mohs scale, which makes them a
            durable and heirloom-quality alternative to a diamond ring
          </Text>
        </Box>
        <StaticImage
          src="../images/sapphires/mohs.png"
          alt=""
          placeholder="blurred"
          width={290}
          height={455}
        />
      </Flex>
      <Box className="section" py={3}>
        <Text as="p">
          we love montana sapphires for their traceability from mine to market,
          and the high ethical standards around sourcing them. we work closely
          with our small team in montana to ensure that the sapphires have been
          sourced under safe working conditions for the miners, while leaving as
          little an environmental impact as possible. many of the sapphires we
          use have been sifted gently from the rivers instead of dug from the
          earth.
        </Text>
      </Box>
      <Banner>
        <StaticImage
          src="../images/sapphires/banner_01.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/sapphires/banner_01_m.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Box className="section" py={[7, 7, 8]}>
        <Heading as="h2" variant="h2">
          the history of sapphire rings
        </Heading>
        <Text as="p">
          symbolic of romantic love, truth, and commitment, sapphires have long
          been an intuitive choice for an engagement ring. their popularity
          spread through various royal families in the 14th and 15th centuries,
          and in the 18th century, the appeal for a montana sapphire ring grew
          even more widespread.
        </Text>
        <Text as="p">
          our sapphires are ethically sourced from rock creek and el dorado in
          montana, where sapphires were first discovered around 1865 by gold
          rush prospectors seeking out gold in the missouri river.
        </Text>
      </Box>
      <Flex
        sx={{
          maxWidth: 1300,
          justifyContent: 'space-around',
          '.noMobile': { display: ['none', 'none', 'block'] },
        }}
        px={[0, 0, 8]}
        mx="auto"
        mb={5}
      >
        <StaticImage
          src="../images/sapphires/artwork_01.webp"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          className="noMobile"
          src="../images/sapphires/artwork_02.webp"
          alt=""
          placeholder="blurred"
        />
      </Flex>
      <BrownButton
        to="/book-a-consultation"
        text="book an engagement consultation"
      />
      <Box className="section" py={[6, 6, 7]}>
        <Heading as="h2" variant="h2">
          montana sapphire rings come in a full spectrum of colours
        </Heading>
        <Text as="p" px={[0, 4]}>
          montana sapphires are particularly special because of the broad
          variety of colours they come in: typically softer shades such as soft
          sea-glass greens and ethereal, smoky grey-blues, pastel lilacs and
          pinks, peachy yellows and oranges, and almost any other shade
          imaginable. no two stones are truly alike— guaranteeing you a
          one-of-a-kind piece.
        </Text>
      </Box>
      <Box
        sx={{ bg: 'white', textAlign: 'center', p: { maxWidth: 800 } }}
        p={5}
        pt={[5, 6, 7]}
      >
        <Text as="p" variant="caps">
          did you know we even have our own colour scale?
        </Text>
        <Text as="p">
          we love using <strong>ethically-sourced</strong> sapphires in our{' '}
          <strong>one-of-a-kind</strong> beloved pieces because of their variety
          of shades and colours, traceability from mine to market, and the high
          ethical standards around sourcing them.
        </Text>
        <Flex
          sx={{
            maxWidth: 900,
            flexDirection: ['column', 'row'],
            justifyContent: ['center', 'space-between', 'space-beween'],
          }}
          mx="auto"
        >
          <StaticImage
            src="../images/sapphires/colours1.png"
            alt=""
            placeholder="blurred"
            objectFit="contain"
          />
          <StaticImage
            src="../images/sapphires/colours2.png"
            alt=""
            placeholder="blurred"
            objectFit="contain"
          />
          <StaticImage
            src="../images/sapphires/colours3.png"
            alt=""
            placeholder="blurred"
            objectFit="contain"
          />
        </Flex>
      </Box>
      <Box className="section" py={[6, 6, 7]}>
        <Text as="p">
          most of our montana sapphires are natural stones that have been cut
          and polished to bring out their natural beauty. sometimes, sapphires
          are heat-treated to coax a more intensely saturated colour and
          increase the clarity of the stone.
        </Text>
        <Text as="p">
          heat treatment is an entirely safe process that does not weaken or
          threaten the integrity of the stone. if a stone is heat-treated, the
          treatment is permanent and will never change or wear off.
        </Text>
        <Text as="p">
          we love sapphires in all their shades, so we carry both heat-treated
          and untreated sapphires in order to offer a wide range of options.
        </Text>
      </Box>
      <Banner>
        <StaticImage
          src="../images/sapphires/banner_02.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../images/sapphires/banner_02_m.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Flex
        sx={{
          justifyContent: ['flex-start', 'flex-start', 'flex-end'],
          transform: 'translateY(-60px)',
        }}
        px={[7, 10, 9]}
      >
        <StaticImage
          src="../images/medallions/recycled-materials.webp"
          alt=""
          placeholder="blurred"
          width={135}
          height={115}
        />
      </Flex>
      <Box className="section" mt={-6}>
        <Heading as="h2" variant="h2">
          so, why montana sapphire rings?
        </Heading>
        <Text as="p" variant="caps">
          <strong>
            there are a plethora of reasons why to choose a montana sapphire
            engagement ring:
          </strong>
        </Text>
        <Text as="p">
          <strong>
            sapphires score a 9-9.5 out of 10 on the mohs hardness scale
          </strong>
          — a close runner-up only to diamonds, which score a 10. this makes the
          sapphire an excellent choice for an engagement ring: sturdy enough to
          withstand daily wear and last for generations as a future heirloom.
        </Text>
        <Text as="p">
          no two sapphires are alike. each is unique in colour and cut, as
          inimitable as your love story.
        </Text>
        <Text as="p">
          as the <strong>birthstone for september</strong>, sapphires make a
          perfect choice for honouring september-born beloveds!
        </Text>
        <Text as="p">
          montana sapphires are some of the most{' '}
          <strong>ethically sourced</strong> stones on the market.
        </Text>
        <Text as="p">
          sapphires offer <strong>a lot of value</strong>, as they offer
          colours, cuts, shapes and sizes that aren't readily available in other
          stones, including diamonds.
        </Text>
      </Box>
      <BrownButton
        text="buy a sapphire engagement ring"
        to="/collections/one-of-a-kind-beloved-engagement-rings"
      />
    </Container>
  </Layout>
)

export default SapphiresPage
