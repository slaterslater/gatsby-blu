import React from 'react'
import { Grid, Box, Text, Link, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import FooterSocials from './FooterSocials'
import NewsletterForm from './NewsletterForm'
import CurrencyPicker from './CurrencyPicker'

const SectionHeading = props => (
  <Text
    as="h5"
    variant="caps"
    pb={4}
    sx={{ color: 'cream', fontSize: 0, fontWeight: 'heading' }}
    {...props}
  />
)
const SectionLink = props => (
  <Text
    as="p"
    sx={{
      fontSize: 0,
    }}
    py={1}
  >
    <Link
      as={GatsbyLink}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        color: 'gray',
        transition: 'color .3s ease',
        '&:hover': { color: 'white' },
      }}
      {...props}
    />
  </Text>
)

const exploreLinks = [
  { to: '/pages/faq', label: 'faq & help' },
  { to: '/pages/sizing-chart', label: 'necklace sizing chart' },
  { to: '/products/bluboho-ring-sizer', label: 'ring sizer' },
  { to: '/pages/exchange-policy', label: 'exchanges' },
  { to: '/pages/shipping', label: 'shipping & special info' },
  { to: '/pages/privacy-policy', label: 'privacy policy' },
  { to: '/pages/terms-of-service', label: 'terms of service' },
]

const bluFamLinks = [
  { to: '/pages/locations-and-hours', label: 'contact & locations' },
  { to: '/products/gift-card', label: 'gift cards' },
  { to: '/newsletter', label: 'subscribe to keep in touch' },
  { to: '/pages/care-and-wear-disclaimer', label: 'jewelry care & wear' },
]

const Footer = props => (
  <Grid
    bg="primary"
    mt="auto"
    p={6}
    gap={6}
    sx={{
      gridAutoFlow: ['row', 'column'],
      gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', '2fr 2fr 3fr 1fr'],
    }}
  >
    <Box>
      <SectionHeading>Explore</SectionHeading>
      <Box as="nav">
        {exploreLinks.map(({ label, to }) => (
          <SectionLink key={`${label}-${to}`} to={to}>
            {label}
          </SectionLink>
        ))}
      </Box>
    </Box>
    <Box>
      <SectionHeading>Blu Fam</SectionHeading>
      <Box as="nav">
        {bluFamLinks.map(({ label, to }) => (
          <SectionLink key={`${label}-${to}`} to={to}>
            {label}
          </SectionLink>
        ))}
      </Box>
    </Box>
    <Box>
      <SectionHeading>Become a Pen Pal</SectionHeading>
      <Text as="p" sx={{ fontSize: 0, color: 'gray', pb: 4 }}>
        Subscribe to receive updates, access to exclusive deals, and more.
      </Text>
      <NewsletterForm />
    </Box>
    <Box>
      <SectionHeading>Socials</SectionHeading>
      <FooterSocials />
      <Box pt={4}>
        <CurrencyPicker />
      </Box>
    </Box>
  </Grid>
)

export default Footer
