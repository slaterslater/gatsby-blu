import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { Box, Container, Flex, Grid, Heading, Image, Text } from 'theme-ui'
import { CgArrowLongRight, CgClose } from 'react-icons/cg'
import { AnimatePresence, motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import Layout from '../components/layout'
import ElementSlider from '../components/ElementSlider'
import CalendlyLink from '../components/consultation/CalendlyLink'

const faqs = [
  {
    question: `What is a zap bracelet?`,
    answer: `A zap bracelet — or, as we like to call it, a linked bracelet —  is a bracelet that has no clasp, and is fused 'permanently' to your body. The chain is connected with a small jump ring, which is fused with a zap machine (aka a tungsten soldering machine).`,
  },
  {
    question: `what's the cost of the bracelet?`,
    answer: `We have four 14k solid gold chain designs to choose from:
    <ul>
    <li>cable chain- $198</li>
    <li>figaro  chain- $248</li>
    <li><a href="/products/14k-infinite-inseparable-bracelet-14k-yellow-gold" target="_blank">inseparable chain</a>- $248</li>
    <li><a href="/products/kinship-bracelet" target="_blank">kinship chain</a> - $298</li>
    <li>small diamond chain- $298</li>
    </ul>
    `,
  },
  {
    question: `When can I get it done?`,
    answer: `We are currently taking appointments at our yonge street location every day we are open- walk-ins welcome.`,
  },
  {
    question: `Do I need an appointment?`,
    answer: `We recommend booking an appointment ahead, however, we can accommodate walk-ins. Please note that when making an appointment we do ask for a $50 non-refundable deposit to secure your spot. This will be applied towards the purchase of your bracelet.`,
  },
  {
    question: `What if I have to cancel or miss my appointment?`,
    answer: `Appointments can be canceled up to 12 hours before the scheduled appointment.  We offer a 10 minute grace period if you are running late, however, if you miss your appointment, your slot and your deposit will be lost.`,
  },
  {
    question: `Can I bring my friend(s)?`,
    answer: `zap bracelets are a wonderful way to mark and celebrate a bond, so if you wish to bring a friend or family member with you, we'd love to help you mark this moment together! <br /><br />However, please note that each appointment is for only one person. For pairs, we recommend booking back-to-back appointments, one slot per person.`,
  },
  {
    question: `Can I pre-pay or buy in advance? What about a gift card?`,
    answer: `Each appointment must be confirmed with a deposit fee of $50.  This can either go towards the payment of your zap bracelet, or for a gift card to use at a later date. If you're gifting a zap bracelet to a loved one, we have gift cards available for you to purchase, which can always be used towards your zap bracelet!`,
  },
  {
    question: `Does it hurt?`,
    answer: `Not at all!  Despite the flash, the machine doesn't actually touch your skin.  We will put a protective cloth on your wrist just in case, as well as giving you safety glasses to protect your eyes from the flash. Both are simply precautionary— better safe than sorry!`,
  },
  {
    question: `What if I need to take it off or it breaks off?`,
    answer: `We understand that things happen, and you may need to remove your bracelet for any reason.  You can come in and we will remove the bracelet for you, or you can use nail clippers or scissors to remove the bracelet. If you intend to have your bracelet reattached, make sure that you make the cut at the jump ring, as this will make it easier to reattach again later, and help to preserve the integrity of the chain. <br /><br />If the bracelet has to be removed or breaks off within 90 days of getting it done, we offer a complimentary appointment to have it fixed. after that, your bracelet can be reattached for a fee of $25. You can <a style="color: black" href="/pages/how-to-care-for-gold-jewelry" target="_blank">see more about our warranty</a>.`,
  },
  {
    question: `Can you make my existing bracelet into a linked bracelet?`,
    answer: `currently we are offering select types of chains for zap bracelets, and in order to ensure longevity we cannot alter existing pieces at this time.`,
  },
  {
    question: `Can I bring my child to get zapped?`,
    answer: `Yes — our minimum age is 12 years old to get zapped. Anyone under the age of 16 must be accompanied by an adult.`,
  },
]

const MotionBox = motion(Box)

const QuestionAnswer = ({ faq, index, expanded, setExpanded }) => {
  const { question, answer } = faq
  const isOpen = index === expanded
  return (
    <Box
      as="li"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border',
      }}
      px={3}
      py={4}
    >
      <Grid
        sx={{ cursor: 'pointer', gridTemplateColumns: '1fr 16px' }}
        onClick={() => setExpanded(isOpen ? false : index)}
      >
        <Text
          sx={{
            fontSize: 1,
            fontWeight: 'heading',
            letterSpacing: 'widest',
          }}
          variant="caps"
        >
          {question}
        </Text>
        <Flex sx={{ alignItems: 'center' }}>
          {isOpen ? <CgClose /> : <CgArrowLongRight />}
        </Flex>
      </Grid>
      <AnimatePresence initial={false}>
        {isOpen && (
          <MotionBox
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: 'auto',
              },
              collapsed: {
                opacity: 0,
                height: 0,
              },
            }}
            transition={{
              duration: 0.8,
              ease: [0.05, 0.65, 0.25, 1],
              opacity: { duration: 0.2 },
            }}
          >
            <Text
              variant="copy"
              sx={{
                fontSize: 1,
                width: '100%',
                maxWidth: 595,
                display: 'block',
                textAlign: ['center', 'left'],
                whiteSpace: 'pre-line',
                a: { color: 'primary' },
                ul: {
                  lineHeight: 1,
                },
              }}
              mx="auto"
              py={5}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

const LinkedBraceletsPage = () => {
  const [expanded, setExpanded] = useState(false)
  const images = Array.from({ length: 3 }).map((_, i) => (
    <Image
      key={`linked-bracelet-image-${i}`}
      src={require(`../images/linked-bracelets/bg${i + 1}.jpg`).default}
      alt=""
      sx={{ objectFit: 'cover', aspectRatio: 1, width: '100%' }}
    />
  ))

  return (
    <Layout
      title="linked bracelets"
      description="mark the most meaningful and long-lasting of connections"
    >
      <Flex
        sx={{
          flexDirection: 'column',
          width: '100%',
          height: 'auto',
          maxHeight: [275, 225, 400],
        }}
      >
        <StaticImage
          src="../images/linked-bracelets/linked-bracelets-header2.jpg"
          alt=""
          layout="fullWidth"
          placeholder="blurred"
        />
      </Flex>
      <Container>
        <Heading as="h1" variant="h2" mt={[3, 6]} sx={{ textAlign: 'center' }}>
          linked bracelets
        </Heading>
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr 1fr'],
            width: '100%',
            maxWidth: 850,
          }}
          mx="auto"
        >
          <Box>
            <Text
              variant="caps"
              pt={[6, 8, 9]}
              pb={6}
              mx={['auto', 3]}
              sx={{
                fontSize: 1,
                textAlign: ['center', 'center', 'left'],
                display: 'block',
              }}
            >
              choose your appointment
            </Text>
            <CalendlyLink>yonge st. location | 20 min </CalendlyLink>
            <Text
              as="p"
              mt={6}
              mb={[0, 0, 6]}
              mx={[0, 4]}
              sx={{
                fontSize: 1,
                lineHeight: 'body',
                letterSpacing: 'wider',
                textAlign: ['center', 'left'],
              }}
            >
              the linked bracelet is a poignant way to mark the most meaningful
              and long-lasting of connections — the ones that outlast the test
              of time, remaining strong and true.
            </Text>
          </Box>
          <Box mx={3} sx={{ height: 500 }}>
            <InlineWidget
              url="https://calendly.com/ringconsultation/link-bracelets"
              styles={{
                height: '100%',
              }}
              pageSettings={{
                hideEventTypeDetails: true,
                hideLandingPageDetails: true,
                primaryColor: '7b92a3',
                textColor: '14191f',
              }}
            />
          </Box>
        </Grid>
        <Box
          my={7}
          mx="auto"
          sx={{
            display: ['none', 'inline-grid'],
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            width: '100%',
          }}
        >
          {images.map(image => image)}
        </Box>
        <Box sx={{ display: ['block', 'none'] }}>
          <ElementSlider elements={images} />
        </Box>
        <Heading
          variant="h2"
          as="h2"
          mt={[5, 0]}
          pb={6}
          sx={{ textAlign: 'center', textIndent: '1em' }}
        >
          F.A.Q.
        </Heading>
        <Box
          as="ul"
          sx={{
            padding: 0,
            width: '100%',
            maxWidth: 830,
            borderTop: '1px solid',
            borderColor: 'border',
            listStyleType: 'none',
          }}
          mx="auto"
        >
          {faqs.map((faq, i) => (
            <QuestionAnswer
              key={`faq-${i}`}
              faq={faq}
              index={i}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </Box>
      </Container>
    </Layout>
  )
}

export default LinkedBraceletsPage
