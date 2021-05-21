import { useLocation } from '@reach/router'
import React from 'react'
import { FaFacebookF, FaPinterest, FaTwitter } from 'react-icons/fa'
import { Grid, Text, Link } from 'theme-ui'
import { stringify } from 'qs'
import { truncateString } from '../../lib/truncate'
import { getSrcWithSize } from '../RemoteShopifyImage'

export const getFacebookShareUrl = url =>
  `https://www.facebook.com/sharer.php?${stringify({ u: url })}`

export const getTwitterHref = ({ url, text }) =>
  `https://twitter.com/share?${stringify({ text, url })}`

export const getPinterestHref = ({ url, description, media }) =>
  `https://pinterest.com/pin/create/button/?${stringify({
    url,
    description: truncateString(description),
    media: getSrcWithSize(media, 'large'),
  })}`

const ExternalLink = props => (
  <Link
    target="_blank"
    rel="noreferrer"
    sx={{ cursor: 'pointer', color: 'darkGray' }}
    {...props}
  />
)

const ProductSocial = ({ description, image, title, showLabel = true }) => {
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
      {showLabel && (
        <Text variant="caps" sx={{ color: 'darkGray' }}>
          Share
        </Text>
      )}
      <ExternalLink href={facebookHref}>
        <FaFacebookF aria-hidden />
      </ExternalLink>
      <ExternalLink href={twitterHref}>
        <FaTwitter aria-hidden />
      </ExternalLink>
      <ExternalLink href={pinterestHref}>
        <FaPinterest aria-hidden />
      </ExternalLink>
    </Grid>
  )
}

export default ProductSocial
