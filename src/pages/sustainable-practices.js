import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Box, Button, Divider, Flex, Grid, Heading, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import Layout from '../components/layout'
import NotFoundView from '../views/404'

const Banner = ({ height, children, noMobile = false }) => (
  <Box
    sx={{
      flexDirection: 'column',
      justifyContent: 'stretch',
      '.headerFull': {
        display: ['none', 'block'],
      },
      '.headerMobile': {
        display: ['block', 'none'],
      },
      width: '100%',
      height,
      display: noMobile ? ['none', 'flex'] : 'flex',
    }}
    my={6}
  >
    {children}
  </Box>
)

const ContentGrid = ({ children }) => (
  <Grid
    sx={{
      gridTemplateColumns: ['1fr', '1fr 1fr'],
      maxwidth: 1195,
      gap: [6, 7, 8],
    }}
    my={[6, 7, 8]}
    mx="auto"
  >
    {children}
  </Grid>
)

const ImageFlex = ({ children, noMobile = false }) => (
  <Box
    sx={{
      display: noMobile ? ['none', 'flex'] : 'flex',
      justifyContent: 'stretch',
      width: '100%',
      maxWidth: 565,
      height: 'auto',
      maxHeight: [400, 275, 400],
    }}
  >
    {children}
  </Box>
)

const ContentFlex = ({ heading, children }) => (
  <Flex
    sx={{
      maxWidth: 900,
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: ['center', 'space-between'],
      h3: { fontWeight: 'bold', fontSize: 1, marginTop: '48px' },
      p: { maxWidth: [380, '47%', 380], marginTop: '24px', fontSize: 1 },
      '.box': { maxWidth: ['100%', '50%'] },
      '.box > p': { maxWidth: [380, '92%', 380] },
    }}
    mx="auto"
    px={5}
    mb={4}
  >
    {heading && (
      <Heading
        as="h2"
        variant="caps"
        sx={{ fontSize: 1, width: [370, '100%'] }}
        py={1}
      >
        {heading}
      </Heading>
    )}
    {children}
  </Flex>
)

const SustainablePracticesPage = () => (
  <NotFoundView />
  // <Layout
  //   title="sustainable practices"
  //   description="our sustainability and ethical practices are an ongoing work in progress. we are continuing to seek out new ways to minimize our impact and to help build a more sustainable future for all."
  // >
  //   <Banner height={400}>
  //     <StaticImage
  //       className="headerFull"
  //       src="../images/sustainable/header1-full.jpg"
  //       alt=""
  //       placeholder="blurred"
  //       style={{ flex: 1 }}
  //     />
  //     <StaticImage
  //       className="headerMobile"
  //       src="../images/sustainable/header1-mobile.jpg"
  //       alt=""
  //       placeholder="blurred"
  //       style={{ flex: 1 }}
  //     />
  //   </Banner>
  //   <Heading as="h1" variant="h2" my={[3, 5]} sx={{ textAlign: 'center' }}>
  //     sustainable practices
  //   </Heading>
  //   <ContentFlex>
  //     <Box className="box">
  //       <Text as="p" variant="copy">
  //         bluboho was created from its inception with ethical and sustainable
  //         practices at its heart.
  //       </Text>
  //       <Text as="p" variant="copy">
  //         we believe that businesses must play a role in protecting the
  //         environment for future generations. we strive to be stewards of the
  //         planet, making every decision with our values in mind. creating a more
  //         sustainable future begins with all of us realizing that our actions
  //         have an impact on the earth.
  //       </Text>
  //     </Box>
  //     <Box className="box">
  //       <Text as="p" variant="copy">
  //         our sustainability and ethical practices are an ongoing work in
  //         progress. we are continuing to seek out new ways to minimize our
  //         impact and to help build a more sustainable future for all.
  //       </Text>
  //       <Flex
  //         sx={{ justifyContent: 'space-between' }}
  //         px={[1, 2, 3]}
  //         mt={[5, 6, 7]}
  //       >
  //         <StaticImage
  //           src="../images/sustainable/icon1.png"
  //           alt="ethically sourced icon"
  //           placeholder="blurred"
  //           width={85}
  //           height={85}
  //         />
  //         <StaticImage
  //           src="../images/sustainable/icon2.png"
  //           alt="recucled materials"
  //           placeholder="blurred"
  //           width={85}
  //           height={85}
  //         />
  //         <StaticImage
  //           src="../images/sustainable/icon3.png"
  //           alt="hand crafted"
  //           placeholder="blurred"
  //           width={85}
  //           height={85}
  //         />
  //       </Flex>
  //     </Box>
  //   </ContentFlex>
  //   <Banner height={400}>
  //     <StaticImage
  //       className="headerFull"
  //       src="../images/sustainable/header2-full.jpg"
  //       alt=""
  //       placeholder="blurred"
  //       style={{ flex: 1 }}
  //     />
  //     <StaticImage
  //       className="headerMobile"
  //       src="../images/sustainable/header2-mobile.jpg"
  //       alt=""
  //       placeholder="blurred"
  //       style={{ flex: 1 }}
  //     />
  //   </Banner>
  //   <Box sx={{ textAlign: ['left', 'center'], maxWidth: 540 }} mx="auto" px={5}>
  //     <Heading
  //       as="h2"
  //       variant="h2"
  //       my={[3, 5]}
  //       sx={{ textAlign: ['left', 'center'], maxWidth: 540 }}
  //     >
  //       here are some of the ways we are working to minimize our impact
  //     </Heading>
  //     <Heading as="h3" variant="caps" my={5} sx={{ fontSize: 1 }}>
  //       ethical practices &amp; traceability:
  //     </Heading>
  //   </Box>
  //   <ContentFlex>
  //     <Text as="p" variant="copy">
  //       it takes many hands to make our jewelry. we are committed to ensuring
  //       that everyone involved, and the earth from which these materials are
  //       taken, is respected and kept safe. traceability and transparency are
  //       crucial to ethical protocols.
  //     </Text>
  //     <Text as="p" variant="copy">
  //       wherever possible, we choose to work with vendors certified by
  //       responsible jewelry council, which is the world's leading
  //       standard-setting organization for the jewelry industry,and we are
  //       constantly seeking out ways to elevate and improve our practices.
  //     </Text>
  //   </ContentFlex>
  //   <Flex
  //     sx={{
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       bg: 'bbBackground',
  //       height: [175, 155],
  //     }}
  //     mb={[5, 6, 7]}
  //     mt={5}
  //   >
  //     <Button
  //       as={GatsbyLink}
  //       variant="outline"
  //       sx={{ textAlign: 'center', fontSize: 1 }}
  //       to="/book-a-consultation"
  //     >
  //       book an engagement consultation
  //     </Button>
  //   </Flex>
  //   <Heading
  //     as="h3"
  //     variant="caps"
  //     px={5}
  //     sx={{ textAlign: ['left', 'center'], width: '100%', maxWidth: 540 }}
  //     mx="auto"
  //     my={5}
  //   >
  //     what is traceability?
  //   </Heading>
  //   <ContentFlex>
  //     <Text as="p" variant="copy">
  //       traceability is the practice that makes sure our actions align with our
  //       values. the process that starts with raw materials and ends with you
  //       wearing your jewelry passes through many collaborations and partnerships
  //       along the supply chain. traceability requires that we can pinpoint and
  //       trace the history, location, application, and distribution of our
  //       products and materials,
  //     </Text>
  //     <Text as="p" variant="copy">
  //       ensuring that our sustainability and ethics claims are reliable and
  //       legitimate. traceability applies to many areas, including product
  //       quality, safety, human rights, labour, environmentalism, and
  //       anti-corruption.
  //     </Text>
  //   </ContentFlex>
  //   <ContentGrid>
  //     <ImageFlex>
  //       <StaticImage
  //         src="../images/sustainable/1a.jpg"
  //         alt=""
  //         placeholder="blurred"
  //         style={{ flex: 1 }}
  //       />
  //     </ImageFlex>
  //     <ImageFlex noMobile>
  //       <StaticImage
  //         src="../images/sustainable/1b.jpg"
  //         alt=""
  //         placeholder="blurred"
  //         style={{ flex: 1 }}
  //       />
  //     </ImageFlex>
  //   </ContentGrid>
  //   <Heading
  //     as="h2"
  //     variant="h2"
  //     my={[3, 5]}
  //     px={5}
  //     sx={{ textAlign: 'center' }}
  //   >
  //     why is traceability important?
  //   </Heading>
  //   <Text
  //     as="p"
  //     variant="copy"
  //     sx={{ maxWidth: 730, width: '100%', textAlign: ['left', 'center'] }}
  //     px={5}
  //     pt={4}
  //     pb={[4, 6]}
  //     mx="auto"
  //   >
  //     traceability ensures our integrity. by practicing traceability and being
  //     mindful of our impact on people and the environment, we are able to verify
  //     that the values and ethos of our business are being carried out,
  //     prioritizing good practice and respect for all along the supply chain.
  //   </Text>
  //   <ContentFlex>
  //     <Box className="box">
  //       <Heading as="h3" variant="caps" sx={{ fontWeight: 'bold' }}>
  //         recycled metals:
  //       </Heading>
  //       <Text as="p" variant="copy">
  //         traceability ensures our integrity. by practicing traceability and
  //         being mindful of our impact on people and the environment, we are able
  //         to verify that the values and ethos of our business are being carried
  //         out, prioritizing good practice and respect for all along the supply
  //         chain.
  //       </Text>
  //     </Box>
  //     <Box className="box">
  //       <Heading as="h3" variant="caps" sx={{ fontWeight: 'bold' }}>
  //         why recycled metals?
  //       </Heading>
  //       <Text as="p" variant="copy">
  //         using recycled metal alleviates negative environmental impact; by
  //         using recycled metals, we avoid contributing to the mining of new
  //         resources, therefore lowering the carbon footprint of our pieces and
  //         helping to reduce waste.
  //       </Text>
  //     </Box>
  //     <Box className="box">
  //       <Heading as="h3" variant="caps" sx={{ fontWeight: 'bold' }}>
  //         where do recycled gold &amp; silver come from?
  //       </Heading>
  //       <Text as="p" variant="copy">
  //         post-consumer recycled gold and silver can come from a wide variety of
  //         sources, such as other jewelry, electronics, and many others. it is
  //         always refined to its purest form and undergoes testing to ensure our
  //         pieces remain heirloom-quality.
  //       </Text>
  //     </Box>
  //     <Box className="box">
  //       <Heading as="h3" variant="caps" sx={{ fontWeight: 'bold' }}>
  //         ethically-sourced diamonds:
  //       </Heading>
  //       <Text as="p" variant="copy">
  //         all the diamonds used in our pieces are sourced in accordance with the
  //         kimberley process, which is an international certification scheme that
  //         works against the circulation of conflict diamonds around the world by
  //         regulating trade in rough diamonds. more information about the
  //         kimberley process can be found on their website.
  //       </Text>
  //     </Box>
  //   </ContentFlex>
  //   <Banner height={400}>
  //     <StaticImage
  //       className="headerFull"
  //       src="../images/sustainable/header3-full.jpg"
  //       alt=""
  //       placeholder="blurred"
  //       style={{ flex: 1 }}
  //     />
  //     <StaticImage
  //       className="headerMobile"
  //       src="../images/sustainable/2a.jpg"
  //       alt=""
  //       placeholder="blurred"
  //       style={{ flex: 1 }}
  //     />
  //   </Banner>
  //   <Box sx={{ textAlign: ['left', 'center'] }} mx="auto" px={5}>
  //     <Heading
  //       as="h2"
  //       variant="h2"
  //       my={[3, 5]}
  //       sx={{ maxWidth: 540 }}
  //       mx="auto"
  //     >
  //       antique diamonds
  //     </Heading>
  //     <Heading as="h3" variant="caps" my={4} sx={{ fontSize: 1 }}>
  //       very environmentally friendly, as they have effectively been "upcycled"
  //     </Heading>
  //   </Box>
  //   <ContentFlex>
  //     <Text as="p" variant="copy">
  //       some of our beloved by bluboho engagement rings are designed using
  //       antique diamonds- creating a unique, wearable artifact of history. these
  //       one-of-a-kind engagement rings are designed and created around each
  //       stone that we hand-select for each collection. cut by hand years before
  //       our time, these unique stones contain a soft, romantic inner light and
  //       distinct organic personalities that could never be replicated by modern
  //       technology- think
  //     </Text>
  //     <Box className="box">
  //       <Text as="p" variant="copy">
  //         candlelit dinners, glowing embers in a hearth, the light of a sunrise
  //         reflected in the eyes of your beloved.
  //       </Text>
  //       <Text as="p" variant="copy">
  //         beyond their inherently poignant appeal, antique diamonds have another
  //         feather in their cap- they're very environmentally friendly, as they
  //         have effectively been “upcycled” into a new design rather than
  //         utilizing a newly-mined diamond. by using diamonds already in
  //         circulation, we can avoid further impact on the earth.
  //       </Text>
  //     </Box>
  //   </ContentFlex>
  //   {/* <Flex
  //     sx={{
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       bg: 'bbBackground',
  //       height: [175, 155],
  //     }}
  //     mb={[5, 6, 7]}
  //     mt={5}
  //   >
  //     <Button
  //       as={GatsbyLink}
  //       variant="outline"
  //       sx={{ textAlign: 'center', fontSize: 1 }}
  //       to="/book-a-consultation"
  //     >
  //       history of our antique diamonds
  //     </Button>
  //   </Flex> */}
  //   <ContentGrid>
  //     <ImageFlex noMobile>
  //       <StaticImage
  //         src="../images/sustainable/2a.jpg"
  //         alt=""
  //         placeholder="blurred"
  //         style={{ flex: 1 }}
  //       />
  //     </ImageFlex>
  //     <ImageFlex noMobile>
  //       <StaticImage
  //         src="../images/sustainable/2b.jpg"
  //         alt=""
  //         placeholder="blurred"
  //         style={{ flex: 1 }}
  //       />
  //     </ImageFlex>
  //   </ContentGrid>
  //   <Divider sx={{ borderColor: 'white' }} py={7} />
  // </Layout>
)

export default SustainablePracticesPage
