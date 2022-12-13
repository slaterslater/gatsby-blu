import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Container, Flex, Heading, Text } from 'theme-ui'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import Layout from '../../components/layout'
import PermanentStore from '../../components/location/PermanentStore'
import PopupStore from '../../components/location/PopupStore'

const LocationIndexPage = ({ data }) => {
  const [locations, popups] = data.allSanityLocation.nodes.reduce(
    (all, location) => {
      const storeTypeIndex = location.isPopup ? 1 : 0
      all[storeTypeIndex].push(location)
      return all
    },
    [[], []]
  )
  return (
    <Layout title="locations" description="step inside and meet the magic">
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'stretch',
          '*': { flex: 1 },
          width: '100%',
          height: 400,
        }}
      >
        <StaticImage
          src="../../images/locations-page-header.webp"
          alt=""
          placeholder="blurred"
        />
      </Flex>
      <Breadcrumbs
        sx={{ maxWidth: 1000, width: '100%', alignItems: 'center' }}
        pt={[3, 5]}
        pb={[0, 0]}
        mx="auto"
        px={4}
        currentPage={{ path: `/locations`, text: 'locations' }}
        links={[
          {
            path: '/',
            text: 'Home',
          },
        ]}
      />
      <Container
        as="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        pt={2}
      >
        <Heading
          as="h1"
          variant="h2"
          sx={{
            fontSize: 5,
            textAlign: 'center',
          }}
          my={7}
        >
          locations
        </Heading>
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
        {!!popups?.length && (
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              width: ['100%', 'calc(100% - 80px)'],
              bg: 'bbBeige',
              maxWidth: 880,
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
                overflowY:
                  popups.length > 1 ? 'scroll' : ['scroll', 'scroll', 'hidden'],
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
              {popups.map(popup => (
                <PopupStore key={popup.id} location={popup} />
              ))}
            </Box>
          </Flex>
        )}
        <Box sx={{ width: '100%', maxWidth: 900 }} mx="auto" px={[3, 4, 6]}>
          {locations.map(location => (
            <PermanentStore key={location.id} location={location} />
          ))}
        </Box>
      </Container>
    </Layout>
  )
}

export default LocationIndexPage

export const query = graphql`
  {
    allSanityLocation {
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
        isTempClosed
        openingDate
        closeMessage
        storeImage {
          asset {
            gatsbyImageData(placeholder: BLURRED, fit: FILLMAX, width: 220)
          }
        }
      }
    }
  }
`
