import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Box, Flex, Heading, IconButton } from 'theme-ui'
import { wrap } from '@popmotion/popcorn'
import BridalStory from '../BridalStory'

const ProductTestimonials = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityStory(
        sort: { fields: _createdAt, order: DESC }
        filter: {
          people: { elemMatch: { wearing: { regex: "/one.*of.*a.*kind/ig" } } }
        }
        limit: 10
      ) {
        nodes {
          id
          title
          quote
          people {
            name
            social
            wearing
            shopLink
          }
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 415, height: 525)
            }
          }
          overlay {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 360, height: 415)
            }
          }
        }
      }
    }
  `)

  const stories = data.allSanityStory.nodes
  const [currentStory, setStory] = useState(0)
  const setCurrentReview = n => {
    setStory(wrap(0, stories.length, currentStory + n))
  }
  const story = stories[currentStory]

  return (
    <Box id="reviews">
      <Heading
        as="h2"
        variant="h2"
        sx={{
          fontSize: 4,
          textAlign: 'center',
          fontFamily: 'heading',
        }}
        mb={5}
      >
        reviews
      </Heading>
      <Box bg="bbBackground" px={[5, 6, 6, 7]} pb={5}>
        {story && <BridalStory key={story.id} details={story} />}
        <Flex sx={{ justifyContent: 'center', gap: 4 }}>
          <IconButton type="button" onClick={() => setCurrentReview(-1)}>
            <FiChevronLeft />
          </IconButton>
          <IconButton type="button" onClick={() => setCurrentReview(1)}>
            <FiChevronRight />
          </IconButton>
        </Flex>
      </Box>
    </Box>
  )
}

export default ProductTestimonials
