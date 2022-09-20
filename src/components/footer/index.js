import { Text, Container, Flex, Box, Grid } from 'theme-ui'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import ThemeLink from '../app/ThemeLink'
import {
  CollapsibleFooterSection,
  FooterNewsletterSubscribe,
  FooterSection,
} from './sections'
import { FooterA, FooterLink, FooterText } from './links'
import CurrencyPicker from '../CurrencyPicker'

const Footer = props => (
  <>
    <Box as="footer" mt="auto" sx={{ bg: 'primary' }} p={[0, 6, 6, 7]}>
      <Container
        as={Flex}
        variant="full"
        sx={{
          gap: 6,
          flexDirection: ['column', 'row'],
          alignItems: ['stretch'],
        }}
        pb={[0, 2, 3, 4]}
      >
        <Grid
          sx={{
            flex: 1,
            gridTemplateColumns: [
              '1fr',
              '1fr 1fr',
              '1fr 1fr',
              'repeat(3, 2fr) 1fr',
            ],
            gap: [5, 6],
            rowGap: [5, 7],
            width: '100%',
          }}
        >
          <CollapsibleFooterSection
            title="Connect"
            sx={{
              borderBottom: '1px solid',
              borderColor: ['white', 'transparent'],
            }}
          >
            <FooterA href="mailto:guestexperience@bluboho.com">
              email us
            </FooterA>
            <FooterA href="tel:+1 647-273-6297">call us</FooterA>
            <FooterText>mon - sun &nbsp; 9am - 5pm EST</FooterText>
            <FooterLink to="/locations">visit us</FooterLink>
            <FooterLink to="/book-a-consultation">
              book virtual appointment
            </FooterLink>
            <FooterLink pb={0} to="/newsletter">
              subscribe
            </FooterLink>
          </CollapsibleFooterSection>
          <CollapsibleFooterSection
            title="Customer Service"
            sx={{
              borderBottom: '1px solid',
              borderColor: ['white', 'transparent'],
            }}
          >
            <FooterLink to="/pages/faq">faq &amp; help</FooterLink>
            <FooterLink to="/pages/exchange-policy">
              orders &amp; exchanges
            </FooterLink>
            <FooterLink to="/pages/shipping">
              shipping &amp; special info
            </FooterLink>
            <FooterLink to="/products/gift-card">gift cards</FooterLink>
            <FooterLink to="/pages/sizing-chart">
              necklace size chart
            </FooterLink>
            <FooterLink pb={0} to="/products/bluboho-ring-sizer">
              ring sizer
            </FooterLink>
          </CollapsibleFooterSection>
          <CollapsibleFooterSection
            title="Blu Fam"
            sx={{
              borderBottom: '1px solid',
              borderColor: ['white', 'transparent'],
            }}
          >
            <FooterLink to="/pages/the-bluboho-origin-story">
              the origin story
            </FooterLink>
            <FooterLink to="/careers">careers</FooterLink>
            <FooterLink to="/pages/care-and-wear-disclaimer">
              jewelry care &amp; wear
            </FooterLink>
            <FooterLink pb={0} to="/wholesale">
              Wholesale
            </FooterLink>
          </CollapsibleFooterSection>
          <CollapsibleFooterSection title="Social">
            <FooterA href="https://www.instagram.com/bluboho">
              instagram
            </FooterA>
            <FooterA href="https://www.facebook.com/blubohojewelry">
              facebook
            </FooterA>
            <FooterA href="https://www.pinterest.ca/bluboho" pb={0}>
              pinterest
            </FooterA>
          </CollapsibleFooterSection>
        </Grid>

        <FooterSection
          title="subscribe"
          sx={{ width: '100%', maxWidth: ['auto', 360], order: [-1, 0] }}
          p={[6, 0]}
        >
          <FooterNewsletterSubscribe />
        </FooterSection>
      </Container>
    </Box>
    <Box sx={{ bg: 'white' }} px={[5, 5, 6, 7]}>
      <Flex
        sx={{
          height: [170, 90],
          alignItems: 'center',
        }}
      >
        <Flex
          sx={{
            flex: 1,
            rowGap: 5,
            columnGap: 6,
            flexWrap: 'wrap',
            flexDirection: ['column', 'row'],
          }}
        >
          <Flex
            mx={['auto', 0]}
            sx={{ height: [60, 45], width: [179, 124], order: [2, 0] }}
          >
            <StaticImage
              objectFit="contain"
              src="../../images/globe-logo.png"
              height={65}
              width={179}
              alt="2021 report on business canada's top growing companies"
            />
          </Flex>
          <Grid
            sx={{
              gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, max-content)'],
              alignItems: 'center',
              rowGap: 3,
              columnGap: 6,
              justifyContent: 'center',
            }}
            pt={[5, 0]}
          >
            <Text variant="caps" sx={{ justifySelf: 'right' }}>
              Bluboho &copy; {new Date().getFullYear()}
            </Text>
            <ThemeLink to="/pages/terms-of-service" variant="small">
              Terms of Service
            </ThemeLink>
            <ThemeLink
              to="/pages/privacy-policy"
              variant="small"
              sx={{ justifySelf: 'right' }}
            >
              Privacy Policy
            </ThemeLink>
            <CurrencyPicker />
          </Grid>
        </Flex>
      </Flex>
    </Box>
  </>
)

export default Footer
