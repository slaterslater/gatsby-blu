import { StaticImage } from 'gatsby-plugin-image'
import { Box, Flex, Heading, Text } from 'theme-ui'
import React from 'react'
import ThemeLink from '../app/ThemeLink'

const BookAConsultationCallout = ({ sx, ...props }) => (
  <Flex {...props} sx={sx || {}}>
    <Flex
      px={5}
      py={6}
      sx={{
        gap: 6,
        bg: 'cream',
        alignSelf: 'center',
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      <Flex
        sx={{
          flex: 1,
          alignSelf: 'center',
          borderRadius: '100%',
          overflow: 'hidden',
          maxWidth: 160,
        }}
      >
        <StaticImage src="../../images/maddie.jpg" alt="maddie" />
      </Flex>
      <Box sx={{ alignSelf: 'center', flex: 2 }}>
        <Heading as="h3" variant="caps" pb={2}>
          Need extra help?
        </Heading>
        <Text as="p" variant="copy" sx={{ lineHeight: '1.6em' }} pb={4}>
          book a personalized video consultation with our expert Maddie
        </Text>
        <ThemeLink
          to="/book-a-consultation"
          variant="caps"
          sx={{ textDecoration: 'underline' }}
        >
          Book Now
        </ThemeLink>
      </Box>
    </Flex>
  </Flex>
)

export default BookAConsultationCallout
