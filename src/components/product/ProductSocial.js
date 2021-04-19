import { useLocation } from '@reach/router'
import React from 'react'
import { FaFacebookF, FaPinterest, FaTwitter } from 'react-icons/fa'
import { Grid, Text, Link } from 'theme-ui'
import { stringify } from 'qs'
import { truncateString } from '../../lib/truncate'
import { getSrcWithSize } from '../RemoteShopifyImage'

const getFacebookShareUrl = url =>
  `https://www.facebook.com/sharer.php?u=${url}`

const getTwitterHref = ({ url, text }) =>
  `https://twitter.com/share?${stringify({ text, url })}`

const getPinterestHref = ({ url, description, media }) =>
  `https://pinterest.com/pin/create/button/?${stringify({
    url,
    description: truncateString(description),
    media: getSrcWithSize(media, 'large'),
  })}`

const ExternalLink = props => (
  <Link
    target="_blank"
    sx={{ cursor: 'pointer', color: 'blueGray' }}
    {...props}
  />
)

const ProductSocial = ({ description, image, title }) => {
  const location = useLocation()

  if (!location) return false
  const facebookHref = getFacebookShareUrl(location.href)
  const twitterHref = getTwitterHref({ url: location.href, text: title })
  const pinterestHref = getPinterestHref({
    url: location.href,
    description,
    media: image,
  })

  return (
    <Grid
      sx={{
        display: 'inline-grid',
        gridAutoFlow: 'column',
        alignContent: 'baseline',
      }}
    >
      <Text variant="caps" sx={{ color: 'lightBlueGray' }}>
        Share
      </Text>
      <ExternalLink href={facebookHref}>
        <FaFacebookF />
      </ExternalLink>
      <ExternalLink href={twitterHref}>
        <FaTwitter />
      </ExternalLink>
      <ExternalLink href={pinterestHref}>
        <FaPinterest />
      </ExternalLink>
    </Grid>
  )
}

export default ProductSocial
