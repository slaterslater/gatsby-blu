import { graphql, Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Container, Flex, Heading, Link, Text } from 'theme-ui'
import Layout from '../../components/layout'
import PermanentStore from '../../components/location/PermanentStore'
import PopupStore from '../../components/location/PopupStore'

const LocationIndexPage = ({ data }) => {
  const [locations, popups] = data.locations.nodes.reduce(
    (all, location) => {
      const storeTypeIndex = location.isPopup ? 1 : 0
      all[storeTypeIndex].push(location)
      return all
    },
    [[], []]
  )
  return (
    <Layout title="locations" description="">
      <Flex
        sx={{
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          maxHeight: 400,
        }}
      >
        <StaticImage
          src="../../images/locations-page-header.jpg"
          alt=""
          layout="fullWidth"
        />
        <Heading
          as="h2"
          variant="h2"
          sx={{
            color: 'white',
            fontSize: 5,
            textAlign: 'center',
            // transform: ['translateY(calc(100% - 50px))', 'translateY(-200px)'],
            transform: ['translateY(calc(-35vw + -90%))', 'translateY(-200px)'],
          }}
        >
          locations
        </Heading>
      </Flex>
      <Container
        as="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        pt={2}
      >
        <Text
          as="p"
          variant="copy"
          sx={{
            textAlign: 'center',
            fontSize: 2,
            maxWidth: 580,
            whiteSpace: ['unset', 'pre-line'],
          }}
          mb={6}
        >
          {`step inside and meet the magic — our stores are cozy,
          inviting, and full of warmth and welcome.
          come, stay a while, and see the beauty of our jewelry
          up close — ethically and sustainably-made
          gold looks good on you.`}
        </Text>
        {popups && (
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              width: ['100%', 'calc(100% - 80px)'],
              bg: 'bbBeige',
              maxWidth: 880,
              // overflowY: 'scroll',
            }}
            mx="auto"
            mb={6}
            py={6}
            px={[3, 4, 6]}
          >
            <Heading as="h2" variant="h2" pb={4}>
              pop-ups
            </Heading>
            <Text
              as="p"
              variant="copy"
              sx={{
                fontWeight: 'heading',
                textAlign: 'center',
                maxWidth: [200, 400],
              }}
            >
              we're here for a good time, but not a long time
            </Text>
            <Text
              as="p"
              variant="copy"
              sx={{ textAlign: 'center', maxWidth: 365 }}
              px={[4]}
              mb={4}
            >
              visit our pop-up events for a fleeting taste of the bluboho magic.
              trust us — we sparkle even more in person.
            </Text>
            <Box
              sx={{
                width: '100%',
                maxHeight: 300,
                overflowY: 'scroll',
                '::-webkit-scrollbar': {
                  '-webkit-appearance': 'none',
                },
                '::-webkit-scrollbar:vertical': {
                  width: 11,
                  borderRadius: 8,
                  backgroundColor: 'sterlingSilver',
                },
                '::-webkit-scrollbar-thumb': {
                  borderRadius: 8,
                  border: '1px solid',
                  borderColor: 'sterlingSilver',
                  backgroundColor: 'white',
                },
              }}
            >
              {[...popups, ...popups, ...popups].map(popup => (
                <PopupStore key={popup.id} location={popup} />
              ))}
            </Box>
          </Flex>
        )}
        {locations.map(location => (
          <PermanentStore key={location.id} location={location} />
        ))}
      </Container>
    </Layout>
  )
}

export default LocationIndexPage

export const query = graphql`
  {
    locations: allSanityLocation {
      nodes {
        id
        name
        isPopup
        email
        street
        city
        province
        postalCode
        phone
        slug {
          current
        }
        daysOpen {
          name
          isClosed
          open
          close
        }
        storeImage {
          asset {
            gatsbyImageData(placeholder: BLURRED, fit: FILLMAX, aspectRatio: 1)
          }
        }
      }
    }
  }
`
