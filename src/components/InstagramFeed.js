import React from 'react'
import { Link, Container, AspectImage, Grid, Text } from 'theme-ui'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const instagramURL =
  'https://d3ejra0xbg20rg.cloudfront.net/instagram/media?shop=blubohoo.myshopify.com&resource=default'

const InstagramFeed = () => {
  const { data, error } = useSWR(instagramURL, fetcher)
  console.log(data)

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
        <Grid
          sx={{
            gridTemplateColumns: [
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
              'repeat(6, 1fr)',
            ],
          }}
        >
          {data.slice(0, 12).map(post => {
            if (['CAROUSEL_ALBUM', 'IMAGE'].includes(post.media_type))
              return (
                <Link href={post.permalink} target="_blank">
                  <AspectImage
                    key={post.media_url}
                    ratio={1}
                    src={post.media_url}
                    alt={post.caption}
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
                    alt={post.caption}
                  />
                </Link>
              )
            return null
          })}
        </Grid>
      </Container>
    )
  }

  return null
}

export default InstagramFeed
