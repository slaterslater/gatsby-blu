import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Flex, Heading, Link, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

const PermanentStore = ({ location }) => {
  const {
    id,
    name,
    email,
    street,
    city,
    province,
    postalCode,
    phone,
    slug,
    daysOpen,
    storeImage,
  } = location
  const tel = `+1 ${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`
  return (
    <>
      <Link
        as={GatsbyLink}
        to={`/locations/${slug.current}`}
        sx={{ width: '100%', textAlign: 'center' }}
      >
        <Heading as="h3" variant="h2" my={6}>{`${name} jewlery store`}</Heading>
      </Link>
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
            <GatsbyLink
              to={`${slug.current}#map`}
              // to={null}
              // onClick={e => e.preventDefault()}
              variant="small"
              sx={{ fontSize: 1, display: 'block' }}
            >
              <Text
                as="address"
                sx={{
                  fontStyle: 'normal',
                  textTransform: 'lowercase',
                  lineHeight: '1.8em',
                  color: 'primary',
                }}
              >
                {street}
                <br />
                {`${city}, ${province} ${postalCode}`}
              </Text>
            </GatsbyLink>
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
    </>
  )
}

export default PermanentStore
