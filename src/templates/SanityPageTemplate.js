import { graphql } from 'gatsby'
import React from 'react'
import { Container, Flex, Grid, Heading, Text } from 'theme-ui'
import SanityBlockContent from '@sanity/block-content-to-react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import CollectionPageHeader from '../components/CollectionPageHeader'

const SanityPageTemplate = ({ data }) => {
  const { isBeloved, seo, title, description, image, content } = data.sanityPage
  console.log({ content })
  return (
    <Layout
      isBeloved={isBeloved}
      title={seo.title}
      description={seo.description}
    >
      <CollectionPageHeader
        title={title}
        description={description}
        image={image.asset.gatsbyImageData}
      />
      <Container>
        <Grid
          sx={{
            gap: 6,
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
            'div > div, p': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              bg: 'bbBackground',
              paddingLeft: [4, 7],
              paddingRight: [4, 7],
              paddingTop: 4,
              paddingBottom: 4,
              minHeight: 445,
              p: {
                minHeight: 0,
                padding: 0,
                marginTop: '1em',
                marginBottom: '1em',
                display: 'block',
              },
            },
            'div > div': { height: '100%' },
            h2: {
              gridColumn: '1/-1',
              textAlign: 'center',
              textTransform: 'uppercase',
              padding: 5,
              letterSpacing: 'widest',
            },
            span: {
              gridColumn: '1/-1',
              fontFamily: 'heading',
              fontSize: 4,
              textAlign: 'center',
              maxWidth: 800,
              padding: 5,
            },
            p: {
              fontSize: 1,
              lineHeight: 'body',
              letterSpacing: 'wider',
              textAlign: 'center',
              marginTop: 0,
              marginBottom: 0,
            },
            ul: {
              margin: 0,
              padding: 0,
              paddingLeft: 5,
            },
            li: {
              fontSize: 1,
              lineHeight: 1.5,
              letterSpacing: 'wider',
              marginBottom: 3,
            },
            a: { color: 'primary', fontWeight: 'bold', display: 'contents' },
            '.full': { gridColumn: '1/-1' },
            // img: { objectFit: 'contain !important' },
          }}
          mt={4}
          mb={7}
        >
          {content.map(({ heading, image, blocks, isFullWidth, quote }, i) => (
            <React.Fragment key={`box-${i}`}>
              {heading && <Heading as="h2">{heading}</Heading>}
              {image && (
                <Flex className={isFullWidth ? 'full' : ''}>
                  <GatsbyImage image={image.asset.gatsbyImageData} alt="" />
                </Flex>
              )}
              {quote && <Text mx="auto">{quote}</Text>}
              {blocks && (
                <div className={isFullWidth ? 'full' : ''}>
                  <SanityBlockContent blocks={blocks} />
                </div>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default SanityPageTemplate

export const query = graphql`
  query ($current: String!) {
    sanityPage(slug: { current: { eq: $current } }) {
      isBeloved
      image {
        asset {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      seo {
        description
        title
      }
      slug {
        current
      }
      title
      description
      content {
        ... on SanityPageHeading {
          heading
        }
        ... on SanityPageImage {
          isFullWidth
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, height: 450)
            }
          }
        }
        ... on SanityPageBlock {
          blocks: _rawBlocks
          isFullWidth
        }
        ... on SanityPageQuote {
          quote
        }
      }
    }
  }
`
