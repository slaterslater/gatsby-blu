import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { alignSelf } from 'styled-system'
import { AspectRatio, Box, Button, Container, Grid, Text } from 'theme-ui'
import ThemeLink from '../../components/app/ThemeLink'
import { MobileSlider } from '../../components/content/CollectionRow'
import HomeLocations from '../../components/home/Locations'
import Layout from '../../components/layout'

const BelovedHomePage = ({data}) => {
  console.log({data})
  const {collectionRow} = data.sanityBelovedHomePage
  const locations = data.allSanityLocation.nodes

  return (
  <Layout isBeloved>
    <Container>
    <Grid sx={{gridTemplateColumns:['1fr', '1fr 1fr']}}>
      <Button variant="belovedBlue">book an appointment</Button>
      <Button variant="belovedBlue">find a location</Button>
    </Grid>
    <MobileSlider
      minCardWidth={185}
      nodes={collectionRow.map(({handle, image, title}) => (
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
            <Button variant="belovedBlue" sx={{width:'80%', transform:'translateY(-45px)', zIndex:2}} py={1}>{`shop ${title}`}</Button>
          </ThemeLink>
        </Box>
      ))}
    />
    <HomeLocations locations={locations} />
    <Button sx={{bg:'transparent', color:'primary', backgroundImage:'url(/curly-button-bg.png)', backgroundSize:'100% 100%', backgroundRepeat:'no-repeat', backgroundPosition:'center',
  fontSize:2,
  fontFamily:'heading',
  textTransform:'lowercase',
  display:'block'
  }}
  mx="auto"
  py={5}
  px={5}
  >book an appointment</Button>
    </Container>
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
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      imageMobile {
        asset {
          gatsbyImageData(placeholder: BLURRED)
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