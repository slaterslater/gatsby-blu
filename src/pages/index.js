import React from 'react'
import { Box } from 'theme-ui'
import Layout from '../components/layout'
import Hero from '../components/Hero'

import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <Hero */}
    {/*   images={[]} */}
    {/*   title="Shed Your Skin" */}
    {/*   subtitle="Poignant &bull; Beautiful . Enduring" */}
    {/*   button={{ */}
    {/*     label: 'Shop New Beginnings', */}
    {/*     path: '/shop/new-beginnings', */}
    {/*   }} */}
    {/* /> */}
    <Box>category list</Box>
    <Box>big links</Box>
    <Box>brand statement</Box>
    <Box>book engagement section</Box>
    <Box>reviews</Box>
    <Box>instagram</Box>
  </Layout>
)

export default IndexPage
