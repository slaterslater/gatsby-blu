import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Container, Flex, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import SmsSubscribe from '../components/SmsSubscribe'

const ReleaseDate = () => (
  <Text
    sx={{
      textTransform: 'uppercase',
      bg: 'bbBeige',
      transform: 'translateY(-200px)',
      sub: {
        fontSize: '8px',
        position: 'absolute',
        transform: 'translateY(1px)',
      },
    }}
    px={5}
    py={4}
  >
    coming june 21<sub>st</sub>
  </Text>
)

const SampleSalePage = () => (
  <Layout
    title="sample sale signup"
    description="sign up because the last time we did this it sold out in 1 day"
  >
    <Flex
      mx="auto"
      sx={{
        bg: 'bbBeige',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: 210,
      }}
    >
      <Heading
        variant="copy"
        as="h1"
        sx={{ textTransform: 'uppercase' }}
        px={[9, 0]}
      >
        psst... our sample sale is coming june 21
      </Heading>
      <Text
        as="p"
        mx="auto"
        mt={5}
        sx={{
          display: 'block',
          fontSize: 1,
          lineHeight: 'body',
          letterSpacing: 'wider',
          maxWidth: 375,
          textAlign: 'center',
        }}
      >
        ... you don’t want to miss out
      </Text>
    </Flex>
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Flex
        sx={{
          justifyContent: ['center', 'space-between'],
          width: '100%',
          maxWidth: 1150,
        }}
      >
        <Box
          sx={{
            display: ['none', 'flex'],
            flexDirection: 'column',
            alignItems: 'center',
          }}
          pr={[2]}
        >
          <StaticImage
            src="../images/sample-sale/samplesale-2022-june-04.jpg"
            alt=""
            width={335}
            aspectRatio={1}
          />
          <ReleaseDate />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          pl={[0, 2]}
          pr={[0, 0, 2]}
        >
          <StaticImage
            src="../images/sample-sale/samplesale-2022-june-02.jpg"
            alt=""
            width={335}
            aspectRatio={1}
          />
          <ReleaseDate />
        </Box>
        <Box
          sx={{
            display: ['none', 'none', 'flex'],
            flexDirection: 'column',
            alignItems: 'center',
          }}
          pl={[2]}
        >
          <StaticImage
            src="../images/sample-sale/samplesale-2022-june-03.jpg"
            alt=""
            width={335}
            aspectRatio={1}
          />
          <ReleaseDate />
        </Box>
      </Flex>
      <Heading as="h2" variant="copy" sx={{ fontSize: 1 }}>
        sign up to get access to the sample sale
      </Heading>
      <Box
        as="section"
        sx={{ width: '100%', maxWidth: 480 }}
        variant="sectionWrap"
      >
        <SmsSubscribe color="primary" />
        <NewsletterSubscribe color="primary" />
      </Box>
    </Container>
  </Layout>
)

export default SampleSalePage
