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
        order: 5,
        // gridColumn: '1/2',
        // marginBottom: 4,
        gridColumn: 'span 2',
        height: '100%',
        // height: 360,
      }}
    >
      <Grid
        sx={{
          height: '100%',
          gap: 4,
          // rowGap: 8,
          // maxWidth: 1444,
          // gridTemplateColumns: ['1fr', 'repeat(2, minmax(250px, 1fr))'],
          // gridTemplateColumns: ['1fr', 'repeat(2, minmax(1fr, 1fr))'],
          gridTemplateColumns: ['1fr', '1fr minmax(250px, 1fr)'],
          textAlign: 'center',
          span: { display: 'block' },
          // '.flexCol': {
          //   display: 'flex',
          //   flexDirection: 'column',
          //   justifyContent: 'space-between',
          // },
          // height: '100%',
        }}
        // px={[6, 8]}
        // py={[7, 8]}
        // mx="auto"
        px={5}
        py={[5, 5, 0]}
      >
        <Box
          sx={{
            display: ['none', 'block', 'block'],
            // alignContent: 'center',
            // order: 0,
            boxShadow: '2px 2px 10px 5px lightgrey',
            borderRadius: 15,
            // height: '100%',
            // height: 425,
            // height: 'calc(25vw)',
            height: ['calc(50vw)', 'calc(50vw)', 'calc(25vw)'],
            // maxWidth: 250,
            // width: 'max-content',
            maxWidth: 250,
            img: {
              borderRadius: 15,
              height: ['calc(50vw)', 'calc(50vw)', 'calc(25vw)'],
              objectFit: 'contain',
            },
          }}
          my="auto"
          mx="auto"
          // mx={5}
        >
          <GatsbyImage image={image.asset.gatsbyImageData} alt={title} />
        </Box>
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
            // mt={2}
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
