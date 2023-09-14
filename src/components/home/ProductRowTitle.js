import { Box, Heading } from 'theme-ui'

const ProductRowTitle = ({ title }) => {
  if (!title) return null
  return (
    <Box
      sx={{
        textAlign: 'center',
        alignSelf: 'center',
        zIndex: 1,
      }}
      mt={[6, 7]}
    >
      <Heading as="h2" variant="h1" pb={2}>
        {title}
      </Heading>
    </Box>
  )
}

export default ProductRowTitle
