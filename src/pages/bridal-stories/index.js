import { graphql, Link as GatsbyLink } from 'gatsby'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Flex, Heading, Text, Button } from 'theme-ui'
import Layout from '../../components/layout'
import StoriesHeader from '../../components/StoriesHeader'

const WhoWearsWhat = ({ people }) => (
  <Text as="p" variant="copy" mt={6} mb={4}>
    {people
      .filter(({ wearing }) => wearing)
      .map((person, i) => {
        const { name, wearing, shopLink } = person
        return (
          <>
            {i !== 0 ? <span> and </span> : null}
            <span>{name} is wearing the </span>
            {shopLink ? (
              <Box
                as={GatsbyLink}
                to={shopLink}
                sx={{
                  color: 'primary',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  ':hover': { textDecoration: 'underline' },
                }}
              >
                {wearing}
              </Box>
            ) : (
              <Text> {wearing}</Text>
            )}
          </>
        )
      })}
  </Text>
)

const Socials = ({ people }) => (
  <Box
    as="ul"
    sx={{ padding: 0, listStyle: 'none', wordBreak: 'break-all' }}
    mt={3}
  >
    {people
      .filter(({ social }) => social)
      .map(({ social }, i) => (
        <Text
          as="li"
          key={social}
          sx={{
            fontWeight: 'bold',
            display: 'inline',
            wordBreak: i === 0 ? 'break-all' : 'break-word',
          }}
          pr={i === 0 ? 5 : 0}
        >
          {social}
        </Text>
      ))}
  </Box>
)

const Story = ({ details, index }) => {
  const { title, quote, people, image, overlay } = details
  const flexStagger = index % 2 ? 'row-reverse' : 'row'
  const consultation = [
    { to: '/book-a-consultation', text: 'book an engagement consultation' },
    { to: './share-the-love/', text: 'share your love story' },
  ]

  return (
    <>
      {!!index && (
        <Flex
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            bg: 'bbBackground',
            height: [175, 155],
          }}
        >
          <Button
            as={GatsbyLink}
            variant="outline"
            sx={{ textAlign: 'center', fontSize: 1 }}
            to={consultation[index % 2].to}
          >
            {consultation[index % 2].text}
          </Button>
        </Flex>
      )}
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
              {/* {names} */}
              {people.map(({ name }) => name).join(' & ')}
            </Text>
          </Box>
          <Socials people={people} />
          <WhoWearsWhat people={people} />
        </Box>
      </Flex>
    </>
  )
}

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
      >
        <StaticImage
          src="../../images/stories/header.png"
          alt=""
          objectFit="cover"
          placeholder="blurred"
          height={400}
        />
      </StoriesHeader>
      {stories.map((story, i) => (
        <Story key={story.id} details={story} index={i} />
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
`
