import { GatsbyImage } from 'gatsby-plugin-image'
import { Flex, Heading, Text, Container } from 'theme-ui'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import ThemeLink from '../app/ThemeLink'

const Zodiac = ({ sign }) => {
  const dateRange = useMemo(() => {
    const signs = [
      { name: 'aries', dateRange: 'march 21 – april 19' },
      { name: 'taurus', dateRange: 'april 20 – may 20' },
      { name: 'gemini', dateRange: 'may 21 – june 21' },
      { name: 'cancer', dateRange: 'june 22 – july 22' },
      { name: 'leo', dateRange: 'july 23 – august 22' },
      { name: 'virgo', dateRange: 'august 23 – september 22' },
      { name: 'libra', dateRange: 'september 23 – october 23' },
      { name: 'scorpio', dateRange: 'october 24 – november 21' },
      { name: 'sagittarius', dateRange: 'november 22 – december 21' },
      { name: 'capricorn', dateRange: 'december 22 – january 19' },
      { name: 'aquarius', dateRange: 'january 20 – february 18' },
      { name: 'pisces', dateRange: ' february 19 – march 20' },
    ]
    return signs.find(({ name }) => name === sign.name).dateRange
  }, [sign])

  return (
    <Container
      variant="full"
      sx={{ bg: sign.backgroundColor.hex || '#f3f2f0', textAlign: 'center' }}
      py={[5, 6, 7, 8]}
    >
      <Flex
        mb={[0, 4]}
        sx={{
          height: [300, 575],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GatsbyImage
          image={sign.image.asset.gatsbyImageData}
          alt=""
          style={{ height: '100%' }}
        />
      </Flex>
      <Heading as="h3" variant="h1" py={5} px={2}>
        Zodiac: {sign.name}
      </Heading>
      <Text
        as="h2"
        variant="looseSans"
        pb={5}
        sx={{ fontSize: 1, lineHeight: '1.5em' }}
      >
        {dateRange}
      </Text>
      <Text as="p">
        <ThemeLink
          variant="caps"
          sx={{ fontSize: 1, textDecoration: 'underline' }}
          to={`/collections/${sign.name}`}
        >
          Shop Now
        </ThemeLink>
      </Text>
    </Container>
  )
}

export default Zodiac

Zodiac.propTypes = {
  sign: PropTypes.object,
}
