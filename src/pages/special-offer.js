import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Flex, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import SmsSubscribe from '../components/SmsSubscribe'

const Header = ({ height, children, noMobile = false }) => (
  <Box
    sx={{
      flexDirection: 'column',
      justifyContent: 'stretch',
      '.headerFull': {
        display: ['none', 'block'],
      },
      '.headerMobile': {
        display: ['block', 'none'],
      },
      width: '100%',
      height,
      display: noMobile ? ['none', 'flex'] : 'flex',
    }}
  >
    {children}
  </Box>
)

const Banner = ({ heading, text }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      bg: 'bbBackground',
      height: 210,
      textAlign: 'center',
    }}
  >
    <Heading
      as="h2"
      variant="caps"
      sx={{
        fontSize: 1,
        // maxWidth: [250, 500],
        maxWidth: [330, 600],
        span: { textTransform: 'lowercase' },
      }}
      dangerouslySetInnerHTML={{ __html: heading }}
      mb={5}
    />
    <Text as="p" variant="copy">
      {text}
    </Text>
  </Flex>
)

const SpecialOffersPage = () => (
  <Layout title="special offer" description="sign up today for a special offer">
    <Header height={400}>
      <StaticImage
        className="headerFull"
        src="../images/special-offer/header.jpg"
        alt=""
        placeholder="blurred"
        cropFocus="NORTH"
        style={{ flex: 1 }}
      />
      <StaticImage
        className="headerMobile"
        src="../images/special-offer/header-mobile.jpg"
        alt=""
        placeholder="blurred"
        cropFocus="NORTH"
        style={{ flex: 1 }}
      />
    </Header>
    <Heading as="h1" sx={{ position: 'absolute', left: '-999em' }}>
      special offer
    </Heading>
    <Banner
      heading="sign up today to get a <span>(very,&nbsp;very)</span>&nbsp;special offer"
      text="...trust us, we only share the good stuff"
    />
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 1200,
      }}
      mx="auto"
      px={[0, 7]}
      py={[0, 6, 8]}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 500,
        }}
        mx="auto"
        px={[6, 0]}
        pt={[3, 0]}
        pb={[6, 0]}
      >
        <NewsletterSubscribe color="primary" />
        <SmsSubscribe color="primary" />
      </Flex>
      <Flex
        sx={{ width: '100%', maxWidth: 500, height: 380 }}
        mx="auto"
        pl={[0, 6]}
      >
        <StaticImage
          src="../images/special-offer/packaging.jpg"
          alt=""
          placeholder="blurred"
          style={{ flex: 1 }}
        />
      </Flex>
    </Flex>
    <Banner
      heading="psst... you won't want to miss this"
      text="...this only happens once a year"
    />
  </Layout>
)

export default SpecialOffersPage
