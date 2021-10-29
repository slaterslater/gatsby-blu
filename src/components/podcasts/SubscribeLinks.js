import React from 'react'
import { Heading, Grid, Box, Text, Container, Icon, Link, Flex } from 'theme-ui'
import { RiSpotifyLine, RiMicLine } from 'react-icons/ri'
import { CgArrowLongRight } from 'react-icons/cg'

const ListItem = ({ icon: Icon, text, link }) => (
  <Flex
    as="li"
    sx={{
      borderBottom: '1px solid',
      borderColor: 'border',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    }}
    px={3}
    py={4}
  >
    <Icon />
    <Text
      sx={{
        fontSize: 0,
        fontWeight: 'bold',
        letterSpacing: 'widest',
      }}
    >
      {text}
    </Text>
    <Box ml="auto">
      <CgArrowLongRight />
    </Box>
  </Flex>
)

const SubscribeLinks = () => (
  <>
    <Heading variant="h2" as="h2" pt={9} sx={{ textAlign: 'center' }}>
      How to Subscribe
    </Heading>
    <Flex sx={{ justifyContent: 'center' }}>
      <Box
        pb={4}
        sx={{
          width: '100%',
          maxWidth: 550,
        }}
      >
        <Text
          as="p"
          // px={6}
          my={6}
          sx={{
            fontSize: 1,
            lineHeight: 'body',
            letterSpacing: 'wider',
            textAlign: 'center',
          }}
        >
          you can stream TRUBLU right here on our podcast page. however if you’d
          prefer to subscribe via a third party service, check out the options
          below.
        </Text>
        <Box
          as="ul"
          sx={{
            listStyleType: 'none',
            borderTop: '1px solid',
            borderColor: 'border',
            padding: 0,
          }}
          mx={[0, 5, 5]}
        >
          <ListItem
            icon={RiMicLine}
            text="subscribe on apple podcasts"
            link="#somethign"
          />
          <ListItem
            icon={RiSpotifyLine}
            text="subscribe on spotify"
            link="#somethign"
          />
        </Box>
      </Box>
    </Flex>
  </>
)

export default SubscribeLinks
