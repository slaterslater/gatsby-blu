import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import { Box, Container, Divider, Flex, Heading, Link, Text } from 'theme-ui'
import ImageSwiper from '../components/ImageSwiper'
import Layout from '../components/layout'

const LocationPageTemplate = ({ data }) => {
  const {
    name,
    email,
    street,
    city,
    province,
    postalCode,
    phone,
    description,
    text,
    daysOpen,
    map,
    storeImage,
    galleryImages,
  } = data.sanityLocation

  const mapRef = useRef(null)
  const mapSrc = map.match(/https:\/\/.[^"]+/)[0]
  const descRegExp = /\s*\+\s*/g
  const tel = `+1 ${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`

  return (
    <Layout title={name} description={description?.replace(descRegExp, ' ')}>
      <Flex
        sx={{
          bg: 'bbBeige',
          justifyContent: 'center',
        }}
      >
        <Heading
          as="h2"
          variant="h2"
          sx={{ fontSize: 4, textAlign: 'center' }}
          py={7}
        >
          {name}
        </Heading>
      </Flex>
      <Container
        as="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Flex
          sx={{
            flexDirection: ['column', 'row'],
            width: '100%',
            maxWidth: 1000,
            justifyContent: 'space-around',
            alignItems: ['center', 'normal'],
            textAlign: ['center', 'left'],
            flexWrap: ['wrap', 'wrap', 'nowrap'],
          }}
          px={[3, 4, 6]}
          mb={6}
          pb={[6, 3]}
        >
          <Box
            sx={{
              width: '100%',
              minWidth: ['100%', '100%', '25%'],
              maxWidth: [410, 350],
              textAlign: 'center',
            }}
          >
            <GatsbyImage image={storeImage.asset.gatsbyImageData} alt="" />
          </Box>
          <Flex
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: 260,
              maxHeight: 275,
              minHeight: [260, 0],
            }}
            mt={5}
            ml={[0, 4, 6]}
          >
            <Box pb={6}>
              <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={2}>
                location
              </Heading>
              <Link
                href=""
                onClick={e => {
                  e.preventDefault()
                  const y = mapRef.current.offsetTop - 105
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }}
                variant="small"
                sx={{ fontSize: 1, display: 'block' }}
              >
                <Text
                  as="address"
                  sx={{
                    fontStyle: 'normal',
                    textTransform: 'lowercase',
                    lineHeight: '1.8em',
                  }}
                >
                  {street}
                  <br />
                  {`${city}, ${province} ${postalCode}`}
                </Text>
              </Link>
            </Box>
            <Box pb={6}>
              <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={2}>
                phone
              </Heading>
              <Link
                variant="small"
                sx={{ fontSize: 1, display: 'block' }}
                href={`tel:${tel}`}
              >
                {tel}
              </Link>
            </Box>
            <Box>
              <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={2}>
                email
              </Heading>
              <Link
                variant="small"
                sx={{ fontSize: 1, display: 'block' }}
                href={`mailto:${email}`}
                pb={3}
              >
                {email}
              </Link>
            </Box>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column',
              width: '100%',
              maxWidth: 250,
              maxHeight: 275,
            }}
            mt={[8, 5]}
            mr={[0, 5, 6]}
          >
            <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={[4, 2]}>
              store hours
            </Heading>
            <Flex
              as="ul"
              sx={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                listStyleType: 'none',
                minHeight: [275, 0],
                padding: 0,
                flex: 1,
                li: {
                  paddingBottom: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                },
                span: {
                  minWidth: 125,
                  textAlign: 'center',
                },
              }}
            >
              {daysOpen.map(day => {
                const { name, isClosed, open, close } = day
                const time = t => {
                  const [hh, mm] = t.split(':')
                  return `${hh % 12 || 12}:${mm}${hh < 12 ? 'am' : 'pm'}`
                }
                return (
                  <Text key={name} as="li">
                    {name}
                    <span>
                      {isClosed ? 'closed' : `${time(open)} - ${time(close)}`}
                    </span>
                  </Text>
                )
              })}
            </Flex>
          </Flex>
        </Flex>
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
      map
      daysOpen {
        name
        isClosed
        open
        close
      }
      storeImage {
        asset {
          gatsbyImageData(placeholder: BLURRED, fit: FILLMAX)
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
