import { graphql, navigate } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { alignSelf } from 'styled-system'
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Grid,
  Text,
  Flex,
  Heading,
} from 'theme-ui'
import ThemeLink from '../../components/app/ThemeLink'
import { MobileSlider } from '../../components/content/CollectionRow'
import HomeLocations from '../../components/home/Locations'
import Layout from '../../components/layout'
import Banner from '../../components/content/Banner'

const lastWordUpperCase = text => {
  const words = text.split(' ')
  console.log({ text, words })
  if (words.length === 1) return text
  const last = words.pop()
  return `${words.join(' ')} ${last.toUpperCase()}`
}

const buttons = [
  { text: 'book an appointment', path: '/book-a-consultation' },
  { text: 'find a location', path: '/locations' },
]

const BannerButton = ({ children, text, to, height = 495 }) => (
  <>
    <Banner height={height}>{children}</Banner>
    <Button
      variant="belovedBlue"
      onClick={() => navigate(to)}
      sx={{
        width: '100%',
        maxWidth: 615,
        display: 'block',
        transform: 'translateY(-80px)',
      }}
      mx="auto"
      py={4}
    >
      {lastWordUpperCase(text)}
    </Button>
  </>
)

const BelovedHomePage = ({ data }) => {
  const { headerHero, collectionRow, spotlights, feature1, feature2 } =
    data.sanityBelovedHomePage
  const locations = data.allSanityLocation.nodes

  return (
    <Layout isBeloved>
      <Container p={[0, 0, 0, 0]}>
        <Box
          sx={{
            maxWidth: 1350,
            height: [600, 700, 700],
            backgroundImage: 'url(/beloved-header-bg-TEMP.png)',
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
            >
              {lastWordUpperCase(button.text)}
            </Button>
          ))}
        </Grid>
        <MobileSlider
          minCardWidth={185}
          sx={{ maxWidth: 1250 }}
          mx="auto"
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
      <BannerButton text={feature1[0].button.text} to={feature1[0].button.path}>
        <GatsbyImage image={feature1[0].image1.asset.gatsbyImageData} alt="" />
      </BannerButton>
      <Container>
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            gap: [0, 6, 7],
            maxWidth: 1250,
          }}
          mx="auto"
        >
          {spotlights.map(({ image, button }) => (
            <Box
              sx={{
                backgroundImage: `url('/blog-bg-1.webp')`,
                backgroundSize: '100% 100%',
                height: 'calc(100% - 45px)',
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
                  // height: 0,
                  // display: 'absolute',
                  // lineHeight: 0,
                  transform: 'translateY(-75px)',
                  minWidth: 250,
                }}
                py={3}
                mx="auto"
              >
                {lastWordUpperCase(button.text)}
              </Button>
            </Box>
          ))}
        </Grid>
      </Container>
      <BannerButton text={feature2[0].button.text} to={feature2[0].button.path}>
        <GatsbyImage image={feature2[0].image1.asset.gatsbyImageData} alt="" />
      </BannerButton>
      <Container pb={[0, 0, 0, 0]}>
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            gap: [0, 6, 7],
            maxWidth: 1250,
          }}
          mx="auto"
        >
          {spotlights.map(({ image, button }) => (
            <Box
              sx={{
                backgroundImage: `url('/blog-bg-1.webp')`,
                backgroundSize: '100% 100%',
                height: 'calc(100% - 45px)',
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
                  // height: 0,
                  // display: 'absolute',
                  // lineHeight: 0,
                  transform: 'translateY(-75px)',
                  minWidth: 250,
                }}
                py={3}
                mx="auto"
              >
                {lastWordUpperCase(button.text)}
              </Button>
            </Box>
          ))}
        </Grid>
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
          width: '100%',
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
    </Layout>
  )
}

export default BelovedHomePage

export const query = graphql`
  {
    sanityBelovedHomePage {
      headerHero {
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
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        button {
          text
          path
        }
      }
      feature1 {
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
      feature2 {
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
