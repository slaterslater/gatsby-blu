import React from 'react'
import { Link, Container, AspectImage, Box, Grid, Text, Image } from 'theme-ui'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const instagramURL =
  'https://d3ejra0xbg20rg.cloudfront.net/instagram/media?shop=blubohoo.myshopify.com&resource=default'

const InstagramFeed = props => {
  const { data, error } = useSWR(instagramURL, fetcher)

  if (error) return null

  if (data) {
    return (
      <Container>
        <Text
          as="h3"
          variant="caps"
          sx={{ fontSize: 3, textAlign: 'center', fontWeight: 'light' }}
          pb={5}
        >
          Follow Us On Instagram
        </Text>
        <Grid sx={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
          {data.slice(0, 12).map(post => {
            console.log(post.media_type)
            if (['CAROUSEL_ALBUM', 'IMAGE'].includes(post.media_type))
              return (
                <Link href={post.permalink} target="_blank">
                  <AspectImage
                    key={post.media_url}
                    ratio={1}
                    src={post.media_url}
                  />
                </Link>
              )
            if (post.media_type === 'VIDEO')
              return (
                <Link href={post.permalink} target="_blank">
                  <AspectImage
                    key={post.media_url}
                    as="video"
                    ratio={1}
                    src={post.media_url}
                  />
                </Link>
              )
          })}
        </Grid>
      </Container>
    )

    return null
  }
}

export default InstagramFeed

// import { graphql, useStaticQuery } from 'gatsby'
// // import Image from 'gatsby-image';

// import React from 'react'

//   return (
//     <Box variant="sectionWrap">
//       <Grid
//         sx={{
//           justifyContent: 'center',
//           gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(5, 1fr)'],
//           gridTemplateRows: ['repeat(5, 1fr)', 'repeat(2, 1fr)'],
//           gap: 4,
//         }}
//       >
//         {data.allInstaNode.edges.map(({ node }) => (
//           <a
//             key={node.id}
//             href={`https://www.instagram.com/p/${node.id}`}
//             target="_blank"
//           >
//             <Image
//               srcSet={node.thumbnails.reduce((set, thumbnail) => {
//                 if (!set) return `${thumbnail.src} ${thumbnail.config_width}w`
//                 return `${set}, ${thumbnail.src} ${thumbnail.config_width}w`
//               }, '')}
//               src={node.thumbnails[2].src}
//               key={node.id}
//               alt="node.title"
//             />
//           </a>
//         ))}
//       </Grid>
//     </Box>
//   )
// }

// export default InstagramFeed
