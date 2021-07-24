import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Flex, Text } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'

const OnePercentCallout = props => (
  <Flex py={7} sx={{ bg: 'cream', justifyContent: 'center' }}>
    <Flex
      sx={{
        gap: [5, 7],
        maxWidth: 680,
        alignItems: 'center',
        flexDirection: ['column', 'row'],
      }}
      mx={4}
    >
      <Box sx={{ minWidth: 160 }}>
        <StaticImage
          src="../../images/one-percent-logo.png"
          alt="1% for the planet"
          width={160}
        />
      </Box>
      <Box sx={{ textAlign: ['center', 'left'] }}>
        <Text
          as="p"
          variant="copy"
          sx={{ display: ['none', 'block'], flex: 1, fontSize: 0, pb: 2 }}
        >
          we are members of 1% for the Planet, a global network of 4000
          businesses in 90 countries that pledge a minimum of 1% of sales to
          organizations working to find solutions to the environmental crisis.
        </Text>
        <ThemeLink
          to="/one-percent-for-the-planet"
          variant="caps"
          sx={{ fontSize: [1, 0], textDecoration: 'underline' }}
        >
          Learn More
        </ThemeLink>
      </Box>
    </Flex>
  </Flex>
)

export default OnePercentCallout
