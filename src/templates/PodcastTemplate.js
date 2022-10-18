// src/templates/PodcastTemplate.js

import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Text, Flex, Heading, Box, Container } from 'theme-ui'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import ThemeLink from '../components/app/ThemeLink'

const PodcastDescription = styled.div`
  p {
    text-align: center;
    font-size: ${props => props.theme.fontSizes[1]}px;
    line-height: ${props => props.theme.lineHeights.body};
    letter-spacing: ${props => props.theme.letterSpacings.wider};
  }
`

const PodcastNav = ({ url, text }) => (
  <ThemeLink sx={{ fontSize: 0, textTransform: 'uppercase' }} px={3} to={url}>
    {text}
  </ThemeLink>
)

const SinglePodcastPage = ({ data: { podcast, ...data }, pageContext }) => {
  const { prev, next } = pageContext

  return (
    <Layout
      title={`episode ${podcast.episode_number} | ${podcast.title}`}
      description={`tru blu podcast - episode ${podcast.episode_number} - ${podcast.title}`}
    >
      <Helmet>
        <script
          defer
          src={`${podcast.audio_url.replace(
            /.mp3$/,
            '.js'
          )}?container_id=buzzsprout-player-${podcast.id}&player=small`}
          type="text/javascript"
          charset="utf-8"
        />
      </Helmet>
      <Container as={Flex} sx={{ justifyContent: 'center' }}>
        <Box sx={{ maxWidth: 650 }}>
          <Box py={[5, 6, 7]}>
            <Heading
              as="h1"
              variant="h2"
              pb={4}
              sx={{ textAlign: 'center' }}
            >{`Episode ${podcast.episode_number}: ${podcast.title}`}</Heading>
            <Text
              as="h2"
              variant="looseSans"
              sx={{ fontSize: 0, textAlign: 'center' }}
            >
              {podcast.published_at}
            </Text>
          </Box>
          <div id={`buzzsprout-player-${podcast.id}`} />
          <Flex>
            {data.sanityPodcast?.supportPhotos.map(({ asset }) => (
              <GatsbyImage image={asset.gatsbyImageData} />
            ))}
          </Flex>
          <Box p={4}>
            <PodcastDescription
              dangerouslySetInnerHTML={{ __html: podcast.description }}
            />
          </Box>
          <Box as="nav" sx={{ display: 'flex', justifyContent: 'center' }}>
            {prev && (
              <PodcastNav url={`/podcasts/${prev}`} text="Previous Episode" />
            )}
            {next && (
              <PodcastNav url={`/podcasts/${next}`} text="Next Episode" />
            )}
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default SinglePodcastPage

export const query = graphql`
  query ($slug: String!) {
    podcast(slug: { eq: $slug }) {
      id
      title
      description
      episode_number
      audio_url
      published_at(formatString: "MMMM D, YYYY")
    }
  }
`

SinglePodcastPage.propTypes = {
  data: PropTypes.any,
  pageContext: PropTypes.any,
}
