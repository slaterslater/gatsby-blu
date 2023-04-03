import BlockContent from '@sanity/block-content-to-react'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Grid, Heading, Text } from 'theme-ui'

const CollectionExtraContent = ({ title, content }) => (
  <>
    <Heading as="h2" variant="h2" sx={{ textAlign: 'center' }} py={6}>
      {`${title} jewelry collection`}
    </Heading>
    <Grid
      sx={{
        gap: 6,
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
        div: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bg: 'bbBackground',
          paddingLeft: [4, 7],
          paddingRight: [4, 7],
          paddingTop: 4,
          paddingBottom: 4,
          minHeight: 445,
        },
        h3: {
          gridColumn: '1/-1',
          textAlign: 'center',
          textTransform: 'uppercase',
          padding: 5,
          paddingTop: 0,
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
        },
        a: { color: 'primary', fontWeight: 'bold' },
      }}
      mt={4}
      mb={7}
    >
      {content.map(({ heading, quote, blocks, image }, i) => (
        <React.Fragment key={`box-${i}`}>
          {heading && <Heading as="h3">{heading}</Heading>}
          {quote && <Text mx="auto">{quote}</Text>}
          {blocks && <BlockContent blocks={blocks} />}
          {image && <GatsbyImage image={image.asset.gatsbyImageData} alt="" />}
        </React.Fragment>
      ))}
    </Grid>
  </>
)

export default CollectionExtraContent
