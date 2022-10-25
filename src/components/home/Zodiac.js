import { GatsbyImage } from 'gatsby-plugin-image'
import { Box, Flex, Heading, Text } from 'theme-ui'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ThemeLink from '../app/ThemeLink'

const Zodiac = ({ sign }) => {
  const dateRange = useMemo(() => {
    const signs = [
      { name: 'aries', dateRange: 'mar 21 ~ apr 19' },
      { name: 'taurus', dateRange: 'apr 20 ~ may 20' },
      { name: 'gemini', dateRange: 'may 21 ~ june 21' },
      { name: 'cancer', dateRange: 'june 22 ~ july 22' },
      { name: 'leo', dateRange: 'july 23 ~ aug 22' },
      { name: 'virgo', dateRange: 'aug 23 ~ sept 22' },
      { name: 'libra', dateRange: 'sept 23 ~ oct 23' },
      { name: 'scorpio', dateRange: 'oct 24 ~ nov 21' },
      { name: 'sagittarius', dateRange: 'nov 22 ~ dec 21' },
      { name: 'capricorn', dateRange: 'dec 22 ~ jan 19' },
      { name: 'aquarius', dateRange: 'jan 20 ~ feb 18' },
      { name: 'pisces', dateRange: ' feb 19 ~ mar 20' },
    ]
    return signs.find(({ name }) => name === sign.name).dateRange
  }, [sign])

  return (
    <Box
      sx={{
        display: ['flex', 'grid'],
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
      }}
    >
      <Flex
        sx={{
          height: [350, 'auto'],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'bbBeige',
        }}
        // bg={sign.backgroundColor.hex || 'bbBeige'}
        px={2}
      >
        <GatsbyImage
          image={sign.image.asset.gatsbyImageData}
          alt=""
          style={{ height: '100%' }}
        />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: [0, 615],
        }}
        bg="bbBeige"
        p={7}
      >
        <Heading as="h2" variant="h1" py={5} px={2}>
          Zodiac: {sign.name}
        </Heading>
        <Text
          variant="h1"
          sx={{ fontSize: 1, lineHeight: '1.5em', textTransform: 'lowercase' }}
        >
          {dateRange}
        </Text>
        <Text
          variant="copy"
          sx={{ textTransform: 'lowercase', maxWidth: 435 }}
          py={[6, 6, 7]}
        >
          {sign.description}
        </Text>
        <ThemeLink
          variant="caps"
          sx={{ fontSize: 0, textDecoration: 'underline' }}
          to={`/collections/${sign.name}`}
        >
          Shop Now
        </ThemeLink>
      </Flex>
    </Box>
  )
}

export default Zodiac

Zodiac.propTypes = {
  sign: PropTypes.object,
}
