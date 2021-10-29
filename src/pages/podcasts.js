import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { Heading, Grid, Box, Text, Container, Image, Flex } from 'theme-ui'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SubscribeLinks from '../components/podcasts/SubscribeLinks'
import ReviewPagination from '../components/reviews/ReviewPagination'

const PodcastsPage = ({ data, pageContext }) => {
  const podcasts = data.podcasts.edges
  const { currentPage, totalPages } = pageContext
  return (
    <Layout>
      <SEO title="tru blu podcast" description="tru blu podcast" />
      <Flex
        sx={{
          bg: '#f2eee9',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: ['flex', 'none'] }}>
          <StaticImage
            src="../images/podcast/trublu-header-sm.jpg"
            alt="the trublu podcast by bluboho"
          />
        </Box>
        <Box sx={{ display: ['none', 'flex'], maxHeight: 600 }}>
          <StaticImage
            src="../images/podcast/trublu-header-lg.jpg"
            alt="the trublu podcast by bluboho"
            objectFit="contain"
          />
        </Box>
      </Flex>
      <Container>
        {podcasts.length > 0 && (
          <>
            <Heading
              variant="h2"
              as="h1"
              mt={3}
              pb={7}
              sx={{ textAlign: 'center' }}
            >
              Latest Podcast Episodes
            </Heading>
            <Grid
              sx={{
                gridTemplateColumns: ['1fr', '1fr 1fr', 'repeat(3, 1fr)'],
                columnGap: [0, 1, 2],
                rowGap: 0,
              }}
            >
              {podcasts.map(({ node: podcast }) => (
                <Box key={podcast.id}>
                  <GatsbyLink to={`/podcasts/${podcast.slug}`}>
                    <Image src={podcast.artwork_url} alt={podcast.title} />
                  </GatsbyLink>
                  <Box p={6} m={2} sx={{ textAlign: 'center' }}>
                    <Text
                      as="h3"
                      sx={{
                        fontSize: 1,
                        lineHeight: 'heading',
                        letterSpacing: 'widest',
                      }}
                      pb={3}
                    >{`episode ${podcast.episode_number} - ${podcast.title}`}</Text>
                    <Text
                      as="p"
                      sx={{
                        fontSize: 1,
                        lineHeight: 'heading',
                        letterSpacing: 'widest',
                      }}
                    >
                      {podcast.published_at.toLowerCase()}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Box pt={4}>
              <ReviewPagination
                totalPages={totalPages}
                currentPage={currentPage}
                boundaryPages={2}
                getLinkForPage={page =>
                  page === 1 ? `/podcasts` : `/podcasts/${page}`
                }
              />
            </Box>
          </>
        )}
        <SubscribeLinks />
      </Container>
    </Layout>
  )
}

export default PodcastsPage

export const query = graphql`
  query($skip: Int = 0, $limit: Int = 6) {
    podcasts: allPodcast(
      filter: { episode_number: { gt: 0 } }
      sort: { fields: published_at, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          title
          slug
          artwork_url
          episode_number
          published_at(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`
PodcastsPage.propTypes = {
  data: PropTypes.any,
  pageContext: PropTypes.any,
}
