import { GatsbyImage } from 'gatsby-plugin-image'
import { Box, Flex, Grid, Text } from 'theme-ui'

const CollectionContemplationCard = ({ card }) => {
  if (!card) return null
  const {
    title,
    subtitle,
    text,
    energy,
    collectionHandle,
    amulets,
    amplify,
    image,
    stones,
    icons,
  } = card

  return (
    <Box
      sx={{
        bg: 'bbBackground',
        order: [1000, 5],
        gridColumn: 'span 2',
        height: '100%',
      }}
    >
      <Grid
        sx={{
          height: '100%',
          gap: 4,
          gridTemplateColumns: ['1fr', '1fr minmax(250px, 1fr)'],
          textAlign: 'center',
          span: { display: 'block' },
        }}
        px={5}
        py={[5, 5, 0]}
      >
        <Flex
          sx={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              borderRadius: 15,
              maxWidth: 250,
              bg: 'prodBackground',
              img: {
                borderRadius: 15,
                maxHeight: 425,
                objectFit: 'contain',
              },
            }}
            my={3}
          >
            <GatsbyImage image={image.asset.gatsbyImageData} alt={title} />
          </Box>
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <Box sx={{ maxHeight: 80, '*': { objectFit: 'contain' } }}>
            <GatsbyImage image={icons.asset.gatsbyImageData} alt="" />
          </Box>
          <Flex
            sx={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            mb={4}
          >
            <SubTitle title="how to amplify this energy:" subtitle={amplify} />
            <SubTitle title="stones:" subtitle={stones} />
            <SubTitle title="amulets:" subtitle={amulets} />
            <SubTitle title="energy centre:" subtitle={energy} />
          </Flex>
        </Flex>
      </Grid>
    </Box>
  )
}

export default CollectionContemplationCard

const SubTitle = ({ title, subtitle, as }) => (
  <Box>
    <Text
      variant="small"
      sx={{
        fontWeight: 'bold',
        color: 'darkerGray',
        letterSpacing: 'widest',
        textTransform: 'uppercase',
      }}
      // mb={1}
    >
      {title}
    </Text>
    <Text
      variant="small"
      sx={{
        textTransform: 'lowercase',
        letterSpacing: 'wider',
        lineHeight: 1.75,
        // textAlign: 'center',
        maxWidth: 300,
      }}
      mx="auto"
      mt={1}
      mb={4}
    >
      {subtitle}
    </Text>
  </Box>
)
