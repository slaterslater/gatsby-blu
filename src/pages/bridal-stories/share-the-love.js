import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { Box, Container, Heading } from 'theme-ui'
import { BiHeart } from 'react-icons/bi'
import Layout from '../../components/layout'
import { CalloutBox } from '../../components/product/ProductCTACallout'
import ShareTheLoveForm from '../../components/form/ShareTheLoveForm'
import StoriesHeader from '../../components/StoriesHeader'
// import src from '../../images/stories'

const ShareTheLovePage = () => {
  const pageTitle = 'beloved love story'
  const [success, setSuccess] = useState(false)

  // reset form after a few seconds
  useEffect(() => {
    if (!success) return
    const reset = () => setSuccess(false)
    setTimeout(reset, 8000)
  }, [success])

  // need description copy
  return (
    <Layout
      title={pageTitle}
      description="share the love: we want to hear your love story!"
    >
      <StoriesHeader title={pageTitle}>
        <StaticImage
          src="../../images/stories/header.png"
          alt=""
          objectFit="cover"
          placeholder="blurred"
          height={400}
        />
      </StoriesHeader>
      <Container
        as="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Heading
          as="h2"
          variant="h2"
          sx={{ textAlign: 'center' }}
          pt={[5, 0]}
          pb={5}
        >
          share the love: we want to hear your love story!
        </Heading>
        <Box sx={{ width: '100%', maxWidth: 745 }}>
          {success && (
            <CalloutBox
              icon={BiHeart}
              title="Your love story has been submitted!"
              description="We will reach out shortly"
              bg="cream"
            />
          )}
          {!success && <ShareTheLoveForm onSuccess={() => setSuccess(true)} />}
        </Box>
      </Container>
    </Layout>
  )
}

export default ShareTheLovePage
