import BlockContent from '@sanity/block-content-to-react'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { Grid, Heading, Text } from 'theme-ui'

// const serializers = {
//   types: {
//     block: props => {
//       console.log({ props })
//       const block = BlockContent.defaultSerializers.types.block(props)
//       if (props.children.length === 1) return block
//       return block
//     },
//   },
// }

const PageContentSEO = ({ title, content, isCollection = true }) => (
  <>
    <Heading as="h2" variant="h2" sx={{ textAlign: 'center' }} py={6}>
      {`${title}${isCollection ? ' jewelry collection' : ''}`}
    </Heading>
    <Grid
      sx={{
        gap: 6,
        textTransform: 'lowercase',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
        'div, p': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bg: 'bbBackground',
          paddingLeft: [4, 7],
          paddingRight: [4, 7],
          paddingTop: 4,
          paddingBottom: 4,
          minHeight: 445,
          p: {
            minHeight: 0,
            padding: 0,
            marginTop: '1em',
            marginBottom: '1em',
            display: 'block',
          },
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
          marginTop: 0,
          marginBottom: 0,
        },
        a: { color: 'primary', fontWeight: 'bold' },
        li: { fontSize: 1, letterSpacing: 'wider', marginBottom: 4 },
      }}
      mt={4}
      mb={7}
    >
      {content.map(({ heading, quote, blocks, image }, i) => (
        <React.Fragment key={`box-${i}`}>
          {heading && <Heading as="h3">{heading}</Heading>}
          {quote && <Text mx="auto">{quote}</Text>}
          {blocks && <BlockContent blocks={blocks} />}
          {image && <GatsbyImage image={image.asset?.gatsbyImageData} alt="" />}
        </React.Fragment>
      ))}
    </Grid>
  </>
)

export default PageContentSEO
