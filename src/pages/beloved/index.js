import { graphql, navigate, Link as GatsbyLink } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Grid,
  Flex,
  Heading,
} from 'theme-ui'
import ThemeLink from '../../components/app/ThemeLink'
import { MobileSlider } from '../../components/content/CollectionRow'
import HomeLocations from '../../components/home/Locations'
import Layout from '../../components/layout'
import Banner from '../../components/content/Banner'
import BelovedNewsletterSignUpModal from '../../components/BelovedNewsletterSignUpModal'

const lastWordUpperCase = text => {
  const words = text.split(' ')
  if (words.length === 1) return text
  const last = words.pop()
  return `${words.join(' ')} ${last.toUpperCase()}`
}

const buttons = [
  { text: 'book an appointment', path: '/book-a-consultation' },
  { text: 'find a location', path: '/locations' },
]

const BannerButton = ({ children, text, to, height = 495 }) => (
  <Box as={GatsbyLink} to={to} sx={{ textDecoration: 'none' }}>
    <Banner height={height}>{children}</Banner>
    <Button
      variant="belovedBlue"
      onClick={() => navigate(to)}
      sx={{
        width: ['95%', '100%'],
        maxWidth: 615,
        display: 'block',
        transform: 'translateY(-80px)',
        marginBottom: '-45px',
      }}
      mx="auto"
      py={4}
    >
      {lastWordUpperCase(text)}
    </Button>
  </Box>
)

const Spotlights = ({ spotlights }) => (
  <Grid
    sx={{
      gridTemplateColumns: ['1fr', '1fr 1fr'],
      gap: [3, 6, 7],
      maxWidth: 1250,
    }}
    mx="auto"
  >
    {spotlights.map(({ image, button }) => (
      <Box
        key={image.asset.id}
        sx={{
          backgroundImage: `url('/beloved-frame.webp')`,
          backgroundSize: '100% 100%',
          div: {
            aspectRatio: ['3/4', '4/3'],
            maxWidth: 550,
          },
        }}
        p={5}
      >
        <GatsbyImage image={image.asset.gatsbyImageData} alt="" />
        <Button
          variant="belovedBlue"
          onClick={() => navigate(button.path)}
          sx={{
            display: 'block',
            transform: 'translateY(-75px)',
            minWidth: 250,
            marginBottom: '-45px',
          }}
          py={3}
          mx="auto"
        >
          {lastWordUpperCase(button.text)}
        </Button>
      </Box>
    ))}
  </Grid>
)

const BelovedHomePage = ({ data }) => {
  const { headerHero, collectionRow, spotlights, features } =
    data.sanityBelovedHomePage
  const locations = data.allSanityLocation.nodes

  const [f1, f2] = features
  const [s1, s2, s3, s4] = spotlights

  return (
    <Layout
      title="beloved by bluboho - unique sapphire engagement rings & ethical diamond wedding rings | handmade in canada"
      description="we believe that your engagement ring is more than simply a piece of jewelry: it is a future heirloom that will represent this moment in your life— so we want you to find exactly what you want, and to love it forever"
      isBeloved
    >
      <Container p={[0, 0, 0, 0]}>
        <Heading as="h1" sx={{ position: 'absolute', left: '-9999em' }}>
          beloved by bluboho
        </Heading>
        <Box
          sx={{
            maxWidth: 1350,
            height: [600, 700, 700],
            backgroundImage: 'url(/bg-beloved-ripped-paper.webp)',
            backgroundSize: [
              '150% 100%',
              '150% 100%',
              '150% 100%',
              '100% 100%',
            ],
            backgroundPosition: ['-100px', '-100px', '-100px', 0],
            backgroundRepeat: 'no-repeat',
          }}
          mx="auto"
        >
          <Flex
            as={GatsbyLink}
            to={headerHero[0].button.path}
            sx={{
              height: '100%',
              maxWidth: 1250,
              justifyContent: ['center', 'flex-end'],
              backgroundImage: [
                null,
                `url("${headerHero[0].image1.asset.url}")`,
              ],
              backgroundSize: 'auto 85%',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
            }}
            py={2}
            mx="auto"
          >
            <GatsbyImage
              image={headerHero[0].imageMobile.asset.gatsbyImageData}
              alt=""
            />
          </Flex>
          <Button
            variant="belovedBlue"
            onClick={() => navigate(headerHero[0].button.path)}
            sx={{
              width: ['calc(100% - 32px)', 530],
              // maxWidth: ['100%', 530],
              display: 'block',
              transform: ['translateY(-35px)', 'translateY(-180px)'],
              // marginBottom: '-35px',
            }}
            mx="auto"
            mb={4}
            px={4}
            py={5}
          >
            {headerHero[0].button.text}
          </Button>
        </Box>
        <Grid
          sx={{ gridTemplateColumns: ['1fr', '1fr 1fr'], maxWidth: 1250 }}
          py={7}
          px={4}
          mx="auto"
        >
          {buttons.map(button => (
            <Button
              variant="belovedBlue"
              key={button.path}
              onClick={() => navigate(button.path)}
              py={5}
            >
              {lastWordUpperCase(button.text)}
            </Button>
          ))}
        </Grid>
        <MobileSlider
          minCardWidth={185}
          sx={{ maxWidth: 1250 }}
          mx="auto"
          px={2}
          nodes={collectionRow.map(({ handle, image, title }) => (
            <Box sx={{ textAlign: 'center' }} key={`collection-${handle}`}>
              <ThemeLink
                variant="caps"
                sx={{ fontSize: 0 }}
                to={`/collections/${handle}`}
              >
                <AspectRatio
                  ratio={3 / 4}
                  sx={{ overflow: 'hidden', display: 'flex' }}
                >
                  <GatsbyImage
                    image={image.asset.gatsbyImageData}
                    alt=""
                    objectFit="cover"
                  />
                </AspectRatio>
                <Button
                  variant="belovedBlue"
                  sx={{
                    width: '80%',
                    transform: 'translateY(-55px)',
                    cursor: 'pointer',
                  }}
                  py={1}
                >
                  {lastWordUpperCase(title)}
                </Button>
              </ThemeLink>
            </Box>
          ))}
        />
      </Container>
      <BannerButton text={f1.button.text} to={features[0].button.path}>
        <GatsbyImage image={features[0].image1.asset.gatsbyImageData} alt="" />
      </BannerButton>
      <Container>
        <Spotlights spotlights={[s1, s2]} />
      </Container>
      <BannerButton text={f2.button.text} to={f2.button.path}>
        <GatsbyImage image={f2.image1.asset.gatsbyImageData} alt="" />
      </BannerButton>
      <Container pb={[0, 0, 0, 0]}>
        <Spotlights spotlights={[s3, s4]} />
      </Container>
      <HomeLocations locations={locations} showButtons={false} />
      <Button
        sx={{
          bg: 'transparent',
          color: 'primary',
          backgroundImage: 'url(/curly-button-bg.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          fontSize: 4,
          fontFamily: 'heading',
          textTransform: 'none',
          display: 'block',
          width: ['95%', '100%'],
          maxWidth: 450,
        }}
        onClick={() => navigate('/book-a-consultation')}
        mx="auto"
        py={5}
        px={5}
        mb={8}
      >
        {lastWordUpperCase(`book an appointment`)}
      </Button>
      <BelovedNewsletterSignUpModal />
    </Layout>
  )
}

export default BelovedHomePage

export const query = graphql`
  {
    sanityBelovedHomePage {
      headerHero {
        button {
          text
          path
        }
        image1 {
          asset {
            url
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        imageMobile {
          asset {
            gatsbyImageData(placeholder: BLURRED, width: 400)
          }
        }
      }
      collectionRow {
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        handle
        title
      }
      spotlights {
        image {
          asset {
            id
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        button {
          text
          path
        }
      }
      features {
        button {
          text
          path
        }
        image1 {
          asset {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        imageMobile {
          asset {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
    allSanityLocation(
      filter: { isPopup: { ne: true }, isTempClosed: { ne: true } }
    ) {
      nodes {
        id
        name
        slug {
          current
        }
        storeImage {
          asset {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`
