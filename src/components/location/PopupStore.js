import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Flex, Grid, Heading } from 'theme-ui'
import ContactOptions from './ContactOptions'
import StoreHours from './StoreHours'

const PopupStore = ({ location }) => {
  const { name, storeImage, daysOpen } = location
  return (
    <Grid
      sx={{
        gridTemplateColumns: ['1fr', '1fr', '200px 1fr 1fr'],
        gap: 1,
      }}
      mb={4}
    >
      <Flex
        sx={{ width: 200, flexDirection: 'column', justifyContent: 'flex-end' }}
        mx="auto"
      >
        {/* <GatsbyImage image={storeImage.asset.gatsbyImageData} alt={name} /> */}
        <StaticImage
          src="../../images/DELETETHIS.calgary.png"
          alt="DELETE THIS IMAGE"
          height={200}
          width={200}
        />
        <Heading
          as="h3"
          sx={{ transform: 'translateY(-110px)', color: 'white' }}
          mx="auto"
        >
          {name}
        </Heading>
      </Flex>
      <ContactOptions location={location} />
      <StoreHours daysOpen={daysOpen} />
    </Grid>
  )
}

export default PopupStore
