import { AspectRatio, Grid } from 'theme-ui'
import React from 'react'
import RemoteShopifyImage from './RemoteShopifyImage'

const FluidShopifyImage = ({ ratio, ...props }) => (
  <AspectRatio ratio={ratio}>
    <Grid sx={{ height: '100%', width: '100%' }}>
      <RemoteShopifyImage
        sx={{ height: '100%', width: '100%', gridArea: '1 / 1 / -1 / -1' }}
        {...props}
      />
    </Grid>
  </AspectRatio>
)

export default FluidShopifyImage
