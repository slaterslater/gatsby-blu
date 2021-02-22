import { Link, useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { Flex, Button, Text } from 'theme-ui'
import BackgroundImage from 'gatsby-background-image'
import styled from '@emotion/styled'

const StyledBackground = styled(BackgroundImage)`
  display: flex;
  justify-content: center;
`

const BookConsultation = () => {
  const data = useStaticQuery(graphql`
    query {
      bookEngagementBackground: file(
        relativePath: { eq: "book-background.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <StyledBackground
      fluid={data.bookEngagementBackground.childImageSharp.fluid}
    >
      <Flex
        p={5}
        bg="primary"
        sx={{
          maxWidth: 320,
          flexDirection: 'column',
          alignItems: 'center',
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
    </StyledBackground>
  )
}

export default BookConsultation
