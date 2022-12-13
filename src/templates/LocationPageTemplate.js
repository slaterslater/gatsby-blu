import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import { Box, Container, Divider, Flex, Grid, Heading, Text } from 'theme-ui'
import { DateTime } from 'luxon'
import ImageSwiper from '../components/ImageSwiper'
import Layout from '../components/layout'
import ContactOptions from '../components/location/ContactOptions'
import StoreHours from '../components/location/StoreHours'
import { Breadcrumbs } from '../components/Breadcrumbs'

const LocationPageTemplate = ({ data }) => {
  const {
    name,
    description,
    text,
    daysOpen,
    map,
    slug,
    storeImage,
    galleryImages,
    isTempClosed,
    openingDate,
    closeMessage,
  } = data.sanityLocation
  const storeWillOpen = DateTime.fromISO(openingDate).toFormat('LLLL yyyy')
  const mapRef = useRef(null)
  const [mapSrc] = map.match(/https:\/\/.[^"]+/)
  const descRegExp = /\s*\+\s*/g

  return (
    <Layout title={name} description={description?.replace(descRegExp, ' ')}>
      <Flex
        sx={{
          bg: 'bbBeige',
          justifyContent: 'center',
        }}
      >
        <Heading
          as="h1"
          variant="h2"
          sx={{ fontSize: 4, textAlign: 'center' }}
          py={7}
        >
          {name}
        </Heading>
      </Flex>
      <Breadcrumbs
        sx={{ maxWidth: 1000, width: '100%', alignItems: 'center' }}
        pt={[3, 5]}
        pb={[0, 0]}
        mx="auto"
        px={4}
        currentPage={{ path: `/locations/${slug.current}`, text: name }}
        links={[
          {
            path: '/',
            text: 'Home',
          },
          {
            path: '/locations',
            text: 'locations',
          },
        ]}
      />
      <Heading as="h2" sx={{ zIndex: -100, position: 'absolute' }}>
        {`${name} jewelry store details`}
      </Heading>
      <Container
        as="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isTempClosed && (
          <Box
            sx={{
              textAlign: 'center',
            }}
            mb={4}
          >
            <Text
              as="p"
              variant="caps"
              pb={2}
              sx={{ fontSize: 1, fontWeight: 'bold' }}
            >
              {closeMessage}
            </Text>
            <Text as="p" variant="caps">
              will open {storeWillOpen}
            </Text>
          </Box>
        )}
        <Grid
          sx={{
            width: '100%',
            maxWidth: 900,
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr'],
            gap: 1,
          }}
          mb={[4, 4, 6]}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 300,
              textAlign: 'center',
            }}
            pb={[6, 6, 0]}
            m="auto"
          >
            <GatsbyImage image={storeImage.asset.gatsbyImageData} alt={name} />
          </Box>
          <ContactOptions location={data.sanityLocation} mapRef={mapRef} />
          <StoreHours daysOpen={daysOpen} isTempClosed={isTempClosed} />
        </Grid>
        {!!galleryImages.length && (
          <ImageSwiper images={galleryImages} delay={5000} />
        )}
        {!!description && (
          <>
            <Heading
              as="h3"
              pt={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                maxWidth: 325,
                fontSize: 4,
                textAlign: 'center',
                fontStyle: 'italic',
                fontWeight: 'body',
                letterSpacing: '0.2em',
                textTransform: 'lowercase',
                whiteSpace: 'pre-line',
                div: {
                  marginTop: 15,
                  paddingLeft: 15,
                  lineHeight: '60px',
                },
                span: {
                  fontSize: '3em',
                },
                'span:last-child': {
                  alignSelf: 'flex-end',
                },
              }}
            >
              <span>&ldquo;</span>
              <div>{description.replace(descRegExp, '\n')}</div>
              <span>&bdquo;</span>
            </Heading>
            <Divider
              my={7}
              sx={{ borderColor: 'primary', borderWidth: 2, width: 80 }}
            />
          </>
        )}
        <Text
          as="p"
          variant="copy"
          sx={{
            width: '100%',
            maxWidth: 650,
            lineHeight: '3.5em',
            textAlign: 'center',
            fontSize: [2, 3],
          }}
          mx="auto"
          px={[5, 5]}
        >
          {text}
        </Text>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: 950,
          }}
          px={[0, 5, 8]}
          mx="auto"
        >
          <Box
            as="iframe"
            id="map"
            ref={mapRef}
            src={mapSrc}
            sx={{
              width: '100%',
              height: [300, 450, 600],
              border: 'none',
            }}
            allowFullScreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            py={6}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default LocationPageTemplate

export const query = graphql`
  query ($slug: String!) {
    sanityLocation(slug: { current: { eq: $slug } }) {
      name
      email
      street
      city
      province
      postalCode
      phone
      description
      text
      slug {
        current
      }
      map
      isTempClosed
      openingDate
      closeMessage
      daysOpen {
        name
        isClosed
        open
        close
      }
      storeImage {
        asset {
          gatsbyImageData(placeholder: BLURRED, fit: FILLMAX, width: 250)
        }
      }
      galleryImages {
        asset {
          gatsbyImageData(placeholder: BLURRED, fit: FILLMAX)
        }
      }
    }
  }
`
