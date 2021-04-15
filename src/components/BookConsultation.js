import { Link } from 'gatsby'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Flex, Button, Text, Grid } from 'theme-ui'

const BookConsultation = () => (
  <Grid sx={{ height: 180 }}>
    <StaticImage
      src="../images/book-background.jpg"
      layout="fullWidth"
      style={{ gridArea: '1 / 1 / -1/ -1' }}
    />
    <Flex
      p={5}
      bg="primary"
      sx={{
        maxWidth: 320,
        flexDirection: 'column',
        alignItems: 'center',
        justifySelf: 'center',
        gridArea: '1 / 1 / -1/ -1',
        zIndex: 1,
      }}
    >
      <Text sx={{ color: 'white', fontSize: 1, lineHeight: '1.75em', pb: 5 }}>
        our expert gemologists will help you find the perfect ring that’s as
        unique as the love you share.
      </Text>
      <Button
        as={Link}
        variant="secondary"
        to="/book-a-consultation"
        sx={{ whiteSpace: 'nowrap', px: 6 }}
      >
        Book your engagement consultation
      </Button>
    </Flex>
  </Grid>
)

export default BookConsultation
