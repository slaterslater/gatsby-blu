import { Text, Container, Flex, Box, Grid } from 'theme-ui'
import React from 'react'
import ThemeLink from '../app/ThemeLink'
import NewsletterSignUp from '../NewsletterForm'
import { CollapsibleFooterSection, FooterSection } from './sections'
import { FooterLink, FooterText, FooterTidioLink } from './links'
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
            <FooterLink to="/pages/locations-and-hours">email us</FooterLink>
            <FooterLink to="/pages/locations-and-hours">call us</FooterLink>
            <FooterTidioLink />
            <FooterText>m - f 9am - 5pm EST</FooterText>
            <FooterLink to="/pages/locations-and-hours">visit us</FooterLink>
            <FooterLink pb={0} to="/book-a-consultation">
              book virtual appointment
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
            <FooterLink to="/pages/careers">careers</FooterLink>
            <FooterLink pb={0} to="/pages/care-and-wear-disclaimer">
              jewelry care &amp; wear
            </FooterLink>
          </CollapsibleFooterSection>
          <CollapsibleFooterSection title="Social">
            <FooterLink href="https://www.instagram.com/bluboho">
              instagram
            </FooterLink>
            <FooterLink href="https://www.facebook.com/blubohojewelry">
              facebook
            </FooterLink>
            <FooterLink href="https://www.pinterest.ca/bluboho" pb={0}>
              pinterest
            </FooterLink>
          </CollapsibleFooterSection>
        </Grid>

        <FooterSection
          title="subscribe"
          sx={{ width: '100%', maxWidth: ['auto', 360], order: [-1, 0] }}
          p={[6, 0]}
        >
          <Text
            variant="copy"
            sx={{
              fontSize: 0,
              color: 'white',
              transform: 'translateY(-5px)',
              display: 'block',
            }}
            pb={4}
          >
            handcrafted in toronto. ethically sourced. sign up today for the
            latest news, updates, and collection launches.
          </Text>
          <Box>
            <NewsletterSignUp color="white" />
          </Box>
        </FooterSection>
      </Container>
    </Box>
    <Box sx={{ bg: 'white' }} px={[5, 5, 6, 7]}>
      <Flex
        sx={{
          height: 70,
          alignItems: 'center',
        }}
      >
        <Flex sx={{ flex: 1, rowGap: 3, columnGap: 6, flexWrap: 'wrap' }}>
          <Text variant="caps">Bluboho &copy; {new Date().getFullYear()}</Text>
          <Flex sx={{ columnGap: 6 }}>
            <ThemeLink to="/pages/terms-of-service" variant="small">
              Terms of Service
            </ThemeLink>
            <ThemeLink to="/pages/privacy-policy" variant="small">
              Privacy Policy
            </ThemeLink>
          </Flex>
        </Flex>
        <Box ml="auto">
          <CurrencyPicker />
        </Box>
      </Flex>
    </Box>
  </>
)

export default Footer
