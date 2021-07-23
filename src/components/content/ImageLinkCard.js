import { Flex, Box, AspectRatio } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import useGatsbySanityImageData from '../../lib/useGatsbySanityImageData'
import ThemeLink from '../app/ThemeLink'

const ImageLinkCard = ({ image, q = 85, path, text, ratio, ...props }) => {
  const imageData = useGatsbySanityImageData(image, { q })

  return (
    <Box {...props} sx={{ textAlign: 'center', ...(props.sx || {}) }}>
      <AspectRatio ratio={ratio}>
        <GatsbyImage image={imageData} alt="" />
      </AspectRatio>
      <Box py={1} />
      <ThemeLink variant="caps" sx={{ fontSize: 0 }} to={path}>
        {text}
      </ThemeLink>
    </Box>
  )
}
export default ImageLinkCard
