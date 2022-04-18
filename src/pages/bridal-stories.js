import { graphql, Link } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import { Box, Flex, Heading, Text, Button } from 'theme-ui'
import Layout from '../components/layout'

const StoriesHeader = ({ title, description }) => (
  <Flex
    mx="auto"
    sx={{
      bg: 'bbBeige',
      width: '100%',
      flexDirection: ['column-reverse', 'row'],
      alignItems: 'stretch',
    }}
  >
    <Flex sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Box
        py={7}
        sx={{
          textAlign: 'center',
          width: '100%',
          maxWidth: 375,
          mx: 'auto',
        }}
      >
        <Heading variant="h2" as="h1" sx={{ textTransform: 'lowercase' }}>
          {title}
        </Heading>
        <Text
          as="p"
          mx="auto"
          mt={5}
          px={[4, 0]}
          sx={{
            display: 'block',
            fontSize: 1,
            lineHeight: 'body',
            letterSpacing: 'wider',
            maxWidth: 375,
            textAlign: 'center',
          }}
        >
          {description}
        </Text>
      </Box>
    </Flex>
    <Flex sx={{ width: ['100%', '50%'], height: 400 }}>
      <StaticImage
        src="../images/stories/header.png"
        alt=""
        objectFit="cover"
        placeholder="blurred"
        height="400"
      />
    </Flex>
  </Flex>
)

const Story = ({ details, index }) => {
  const { title, quote, people, image, overlay } = details
  const flexStagger = index % 2 ? 'row-reverse' : 'row'

  const { names, socials, comment } = useMemo(() => {
    const allNames = people.map(({ name }) => name).join(' & ')
    const allSocials = people.filter(({ social }) => social)
    const whoIsWearingWhat = people
      .filter(({ wearing }) => wearing)
      .map(({ name, wearing }) => `${name} is wearing ${wearing}`)
      .join(' and ')
    return {
      names: allNames,
      socials: allSocials,
      comment: whoIsWearingWhat,
    }
  }, [people])

  return (
    <Flex
      sx={{
        flexDirection: ['column', flexStagger],
        width: '100%',
        maxWidth: 1230,
      }}
      mx="auto"
      py={[0, 5, 6]}
    >
      <Flex
        sx={{
          alignItems: 'stretch',
          flexDirection: ['column', 'column', flexStagger],
          flex: 1,
        }}
      >
        <GatsbyImage
          image={image.asset.gatsbyImageData}
          alt="names || socials"
        />
        <Box
          sx={{
            alignSelf: index % 2 ? 'flex-start' : 'flex-end',
            width: [210, 210, 'auto'],
            marginBottom: [-200, -200, 0],
            transform: [
              'translateY(-180px)',
              'translateY(-180px)',
              `translateX(${index % 2 ? '' : '-'}30px)`,
            ],
          }}
          mt="auto"
          mx={[3, 3, '-20px']}
        >
          <GatsbyImage image={overlay.asset.gatsbyImageData} alt="" />
        </Box>
      </Flex>
      <Box
        mx={['auto', 5]}
        px={[4, 0]}
        sx={{
          width: ['100%', '50%'],
          maxWidth: 365,
        }}
      >
        <Heading as="h2" variant="h2" pt={[5, 0]} pb={6}>
          {title}
        </Heading>
        <Text as="p" variant="copy" mb={5} sx={{ width: '100%' }}>
          {quote}
        </Text>
        <Box as="ul" sx={{ padding: 0 }} ml={3}>
          <Text as="li" variant="caps" sx={{ fontSize: 1 }} pl={2}>
            {names}
          </Text>
        </Box>
        <Box
          as="ul"
          sx={{ padding: 0, listStyle: 'none', wordBreak: 'break-all' }}
          mt={3}
        >
          {socials.map(({ social }, i) => (
            <Text
              as="li"
              sx={{
                fontWeight: 'bold',
                display: 'inline',
                wordBreak: i === 0 ? 'break-all' : 'break-word',
              }}
              pr={i + 1 === socials.length ? 0 : 5}
            >
              {social}
            </Text>
          ))}
        </Box>
        <Text as="p" variant="copy" mt={6} mb={4}>
          {comment}
        </Text>
      </Box>
    </Flex>
  )
}

const ConsultationButton = () => (
  <Flex
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      bg: 'bbBackground',
      height: [175, 155],
    }}
  >
    <Button
      as={Link}
      variant="outline"
      sx={{ textAlign: 'center', fontSize: 1 }}
      to="/book-a-consultation"
    >
      book an engagement consultation
    </Button>
  </Flex>
)

const StoriesPage = ({ data }) => {
  const pageTitle = 'our bridal stories'
  const stories = data?.stories.nodes
  return (
    <Layout
      title={pageTitle}
      description="calling all beloved couples: we want to celebrate your love story! click here to share your story and show us your rings"
    >
      <StoriesHeader
        title={pageTitle}
        description="the very best love stories are the ones that are true: our ever-growing collective of beloved couples share the stories of how they found each other and the rings that embody their everlasting love."
      />
      {stories.map((story, i) => (
        <>
          <Story key={story.id} details={story} index={i} />
          {i + 1 < stories.length && <ConsultationButton />}
        </>
      ))}
    </Layout>
  )
}

export default StoriesPage

export const query = graphql`
  {
    stories: allSanityStory(sort: { fields: _updatedAt, order: DESC }) {
      nodes {
        id
        title
        quote
        people {
          name
          social
          wearing
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
`
