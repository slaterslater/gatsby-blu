import React from 'react'
import { Box, Flex, Heading, Link, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

const ContactOptions = ({ location, mapRef = null }) => {
  const { email, street, city, province, postalCode, phone, slug, isPopup } =
    location
  const tel = `+1 ${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`

  console.log({ mapRef })

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxHeight: 275,
        textAlign: ['center', 'center', 'left'],
      }}
      mt={[0, 0, 5]}
      mx="auto"
    >
      <Box pb={6}>
        <Heading as="h3" variant="h2" sx={{ fontSize: 3 }} pb={2}>
          location
        </Heading>
        <Link
          as={isPopup ? Text : GatsbyLink}
          to={mapRef ? '.' : `${slug.current}#map`}
          onClick={e => {
            if (!mapRef) return
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
              color: 'primary',
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
  )
}

export default ContactOptions
