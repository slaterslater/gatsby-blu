import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Button, Grid, Text } from 'theme-ui'

const SubTitle = ({ title, subtitle, as }) => (
  <Box>
    <Text as={as} sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
      {title}
    </Text>
    <Text sx={{ textTransform: 'lowercase', letterSpacings: 'wider' }} mb={5}>
      {subtitle}
    </Text>
  </Box>
)

const ProductContemplationCard = ({ card }) => {
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
    <Box bg="bbBackground">
      <Grid
        sx={{
          rowGap: 8,
          maxWidth: 1444,
          gridTemplateColumns: [
            '1fr',
            'repeat(2, minmax(250px, 1fr))',
            'repeat(2, minmax(250px, 1fr))',
            'repeat(3, minmax(250px, 1fr))',
          ],
          textAlign: 'center',
          span: { display: 'block' },
          '.flexCol': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
        px={[6, 8]}
        py={[7, 8]}
        mx="auto"
      >
        <Box
          sx={{
            order: 0,
            boxShadow: '2px 2px 10px 5px lightgrey',
            borderRadius: 15,
            height: 425,
            maxWidth: 250,
            img: { borderRadius: 15 },
          }}
          mx="auto"
        >
          <GatsbyImage image={image.asset.gatsbyImageData} alt={title} />
        </Box>
        <Box
          className="flexCol"
          sx={{ order: 2, alignItems: 'center', maxHeight: 425 }}
        >
          <SubTitle title="how to amplify this energy:" subtitle={amplify} />
          <SubTitle title="stones:" subtitle={stones} />
          <SubTitle title="amulets:" subtitle={amulets} />
          <SubTitle title="energy centre:" subtitle={energy} />
          <GatsbyImage image={icons.asset.gatsbyImageData} alt="" />
        </Box>
        <Box
          className="flexCol"
          sx={{
            order: [1, 3, 3, 1],
            gridColumn: ['auto', '1 / span 2', '1 / span 2', 'auto'],
            textAlign: ['center', 'center', 'center', 'left'],
          }}
        >
          <SubTitle title={`the ${title}`} subtitle={subtitle} />
          <Text
            as="p"
            sx={{
              lineHeight: 2,
              maxWidth: 600,
              width: '100%',
              whiteSpace: 'pre-line',
            }}
            mx={[null, 'auto', null]}
          >
            {text}
          </Text>
          <Button
            as={Link}
            variant="inverted"
            sx={{ textAlign: 'center', fontSize: 1, maxWidth: 250 }}
            to={`/collections/${collectionHandle}`}
            mx={['auto', 'auto', 'auto', 0]}
            mt={5}
          >
            {`shop ${title}`}
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}

export default ProductContemplationCard
