import React from 'react'
import { Flex, Box } from 'theme-ui'

const ContentOuter = ({ innerWidth, bg = 'transparent', ...props }) => (
  <Flex pb={8} sx={{ justifyContent: 'center', bg }}>
    <Box sx={{ width: '100%', maxWidth: innerWidth }} {...props} />
  </Flex>
)

export default ContentOuter
