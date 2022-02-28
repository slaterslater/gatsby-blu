import React from 'react'
import { navigate } from 'gatsby'
import { Flex, Box, Heading, Grid, Button, Text } from 'theme-ui'

const CollectionDetails = ({ title, description, consultation }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gridColumn: 'span 2',
    }}
  >
    <Heading variant="h2" as="h2" mb={5}>
      {title}{' '}
      <Text
        as="span"
        sx={{
          fontFamily: 'body',
          fontSize: 3,
          textTransform: 'lowercase',
          letterSpacing: 'widest',
          lineHeight: 1.5,
          fontWeight: 'body',
        }}
      >
        collection
      </Text>
    </Heading>
    <Text as="p" variant="copy" sx={{ textAlign: 'center', maxWidth: 375 }}>
      {description}
    </Text>
    {consultation && (
      <Button
        onClick={() =>
          navigate('/book-a-consultation', {
            state: { consultation },
          })
        }
        sx={{ fontSize: 1, letterSpacing: 'widest' }}
        mt={6}
        mb={[7, 0]}
        py={4}
        px={7}
      >
        {`book ${consultation}`}
      </Button>
    )}
  </Flex>
)

const CollectionProductGroup = ({
  title,
  description,
  consultation,
  children,
  ...props
}) => (
  <Box id={title} py={3} {...props}>
    <Grid
      as="section"
      sx={{
        gap: 3,
        gridTemplateColumns: [
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(4, 1fr)',
        ],
        gridAutoRows: 'minmax(250px, auto)',
      }}
      pt={4}
    >
      {description && (
        <CollectionDetails
          title={title}
          description={description}
          consultation={consultation}
        />
      )}
      {children}
    </Grid>
  </Box>
)

export default CollectionProductGroup
