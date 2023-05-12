import React from 'react'
import { Box, Button, Container, Flex, Heading, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const WhoWearsWhat = ({ people }) => (
  <Text as="p" variant="copy" mt={6} mb={4}>
    {people
      .filter(({ wearing }) => wearing)
      .map((person, i) => {
        const { name, wearing, shopLink } = person
        return (
          <Box as="span" key={i}>
            {i !== 0 ? <span> and </span> : null}
            <span>{name} is wearing </span>
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
          </Box>
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

const BridalStory = ({ details, index = 0 }) => {
  const { title, quote, people, image } = details
  const flexStagger = index % 2 ? 'row-reverse' : 'row'
  const consultation = [
    { to: '/book-a-consultation', text: 'book an engagement consultation' },
    { to: './share-the-love/', text: 'share your love story' },
  ]

  return (
    <Container sx={{ maxWidth: '100vw', bg: 'white' }} p={[0, 0, 0, 0]}>
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
          justifyContent: 'space-around',
          flexDirection: ['column', flexStagger],
          width: '100%',
          maxWidth: 1230,
        }}
        mx="auto"
        py={[0, 5, 6]}
      >
        {/* <Flex
          sx={{
            alignItems: 'stretch',
            flexDirection: ['column', 'column', flexStagger],
            flex: 1,
          }}
        > */}
        <GatsbyImage
          image={image.asset.gatsbyImageData}
          alt="names || socials"
        />
        {/* <Box
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
          </Box> */}
        {/* </Flex> */}
        <Box
          mx={['auto', 5]}
          px={[4, 0]}
          sx={{
            width: ['100%', '50%'],
            // maxWidth: 365,
            maxWidth: 630,
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
              {people.map(({ name }) => name).join(' & ')}
            </Text>
          </Box>
          <Socials people={people} />
          <WhoWearsWhat people={people} />
        </Box>
      </Flex>
    </Container>
  )
}

export default BridalStory
