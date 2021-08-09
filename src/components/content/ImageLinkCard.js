import { Flex, Box, AspectRatio } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import useGatsbySanityImageData from '../../lib/useGatsbySanityImageData'
import ThemeLink from '../app/ThemeLink'

const ImageLinkCard = ({ image, q = 85, path, text, ratio, ...props }) => {
  const imageData = useGatsbySanityImageData(image, { q })

  return (
    <Box {...props} sx={{ textAlign: 'center', ...(props.sx || {}) }}>
      <ThemeLink variant="caps" sx={{ fontSize: 0 }} to={path}>
        <AspectRatio ratio={ratio} sx={{ overflow: 'hidden', display: 'flex' }}>
          <GatsbyImage image={imageData} alt="" objectFit="cover" />
        </AspectRatio>
        <Box py={1} />
        {text}
      </ThemeLink>
    </Box>
  )
}
export default ImageLinkCard
