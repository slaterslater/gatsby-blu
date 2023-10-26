import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, Flex, Grid, Heading, Image, Text } from 'theme-ui'
import { CgArrowLongRight, CgClose } from 'react-icons/cg'
import { AnimatePresence, motion } from 'framer-motion'
import { InlineWidget } from 'react-calendly'
import Layout from '../components/layout'
import ElementSlider from '../components/ElementSlider'
import CalendlyLink from '../components/consultation/CalendlyLink'

const faqs = [
  {
    question: `what is a permanent bracelet?`,
    answer: `a permanent bracelet— or, as we like to call it, a linked bracelet —  is a bracelet that has no clasp, forming an unbroken chain. the chain is connected with a small jump ring, which is fused together with a tungsten soldering machine.`,
  },
  {
    question: `what is the cost of a permanent bracelet?`,
    answer: `we have five 14k solid gold chain designs to choose from:
    <ul>
    <li>cable chain: $198</li>
    <li>figaro chain: $248</li>
    <li>inseparable chain: $248</li>
    <li>kinship chain: $298</li>
    <li>small diamond-cut chain: $298</li>
    </ul>
    `,
  },
  {
    question: `when can i get it done?`,
    answer: `we are currently taking appointments at our yonge street location every day that we are open— walk-ins are welcome, or you can <a href="https://calendly.com/ringconsultation/link-bracelets?month=2022-06">book an appointment</a>.`,
  },
  {
    question: `do i need an appointment?`,
    answer: `we recommend booking an appointment ahead, however, we can also accommodate walk-ins. please note that when making an appointment we ask for a $50 non-refundable deposit to secure your spot. this will be applied towards the purchase of your bracelet.`,
  },
  {
    question: `what if i have to cancel or miss my appointment?`,
    answer: `appointments can be cancelled up to 12 hours before the scheduled appointment.  we offer a ten-minute grace period if you are running late— however, if you miss your appointment, your slot and your deposit will be lost.`,
  },
  {
    question: `can i bring my friend(s)?`,
    answer: `permanent bracelets are a wonderful way to mark and celebrate a bond, so if you wish to bring a friend or family member with you, we'd love to help you mark this moment together! <strong>please note that each appointment is for only one person</strong>. for pairs, we recommend booking back-to-back appointments, one slot per person.`,
  },
  {
    question: `can i pre-pay or buy in advance? what about a gift card?`,
    answer: `each appointment must be confirmed with a deposit fee of $50.  this can either go towards the payment of your permanent bracelet or for a gift card to use at a later date. if you're gifting a permanent bracelet to a loved one, we have gift cards available for you to purchase, which can always be used towards your permanent bracelet!`,
  },
  {
    question: `does it hurt?`,
    answer: `not at all!  despite the flash, the machine doesn't actually touch your skin.  we will put a protective cloth on your wrist just in case, as well as provide you with safety glasses to protect your eyes from the flash. both are simply precautionary— better safe than sorry!`,
  },
  {
    question: `what if i need to remove my permanent bracelet, or it breaks off?`,
    answer: `we understand that things happen, and you may need to remove your bracelet.  you can come in and we will remove the bracelet for you, or you can use nail clippers or scissors to remove the bracelet. if you intend to have your bracelet reattached, make sure that you make the cut at the jump ring, as this will make it easier to reattach again later, and help to preserve the integrity of the chain.\n\nif the bracelet has to be removed or breaks off within 90 days of getting it done, we offer a complimentary appointment to have it fixed. after that, your bracelet can be reattached for a fee of $25.`,
  },
  {
    question: `what if it breaks off?`,
    answer: `if the jump ring breaks within 90 days, we will replace that jump ring at no charge. after that, there will be a charge of $25.  we are not responsible for lost chains.`,
  },
  {
    question: `can you make my existing bracelet into a permanent bracelet?`,
    answer: `currently, we are offering select types of chains for linked permanent bracelets. in order to ensure longevity, we cannot alter existing pieces at this time.`,
  },
  {
    question: `can i bring my child to get a permanent bracelet?`,
    answer: `yes— our minimum age is 12 years old to get a linked permanent bracelet. anyone under the age of 16 must be accompanied by an adult.`,
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

const calendars = [
  // {
  //   title: '2616 yonge st, toronto | 20 min',
  //   path: 'ringconsultation/link-bracelets',
  // },
  // {
  //   title: '293 Lakeshore Rd E, Oakville | 15 min',
  //   path: 'bluboho-oakville/linked-permanent-bracelets',
  // },
  // {
  //   title: '2207 4 St SW, Calgary, | 20 min',
  //   path: 'calgary-4/getlinked',
  // },
  {
    title: '350 Queen St W, Toronto, | 15 min',
    // path: 'ringconsultation/bluboho-queen-st-lets-get-linked',
    path: 'ringconsultation/link-bracelets',
  },
]

const LinkedBraceletsPage = () => {
  const [expanded, setExpanded] = useState(false)

  const [fixedHeight, setFixedHeight] = useState('auto')
  const [current, setCurrent] = useState({ index: 0, ...calendars[0] })
  const calendlyPicker = useRef(null)

  useEffect(() => {
    // calculate height
    const max = calendlyPicker.current.offsetHeight - 160 // calendars - (heading + text)
    setFixedHeight(max > 630 ? max : 630) // 630 = iframe + heading

    // set inital calendar
    // const initialSlug = location.state?.consultation
    // if (initialSlug) {
    //   const calendar = calendars.find(({ slug }) => initialSlug === slug)
    //   calendar.index = calendars.indexOf(calendar)
    //   setCurrent(calendar)
    // }

    // send gtag if event booked
    const isCalendlyEventBooked = e =>
      e.origin === 'https://calendly.com' &&
      e.data.event === 'calendly.event_scheduled'

    window.addEventListener('message', e => {
      if (!isCalendlyEventBooked(e) || !window.gtag) return
      window.gtag('event', 'conversion', {
        send_to: `${process.env.GATSBY_AW_CONVERSION_ID}/nweJCJmXtoYDEIu39dgD`,
      })
    })
  }, [])

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
      <Container as="main" sx={{ maxWidth: 1400 }} p={0} mb={8}>
        <Box py={[6, 8]} sx={{ width: '100%', textAlign: 'center' }}>
          <Heading as="h1" variant="h2">
            linked permanent bracelets
          </Heading>
        </Box>
        <Flex
          ref={calendlyPicker}
          mx="auto"
          px={5}
          sx={{
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: ['auto', fixedHeight],
            maxWidth: 825,
            alignContent: 'center',
            '.active': {
              borderColor: 'black',
            },
          }}
        >
          <Text
            as="h3"
            variant="caps"
            pt={1}
            pb={6}
            mx={['auto', 3]}
            sx={{ fontSize: 1, display: 'block' }}
          >
            choose your appointment
          </Text>
          {calendars.map((calendar, i) => (
            <CalendlyLink
              key={`calendly-${i}`}
              calendar={calendar}
              order={i}
              isActive={current.index === i}
              handleChange={() => {
                setCurrent({
                  index: i,
                  ...calendar,
                })
              }}
            >
              {calendar.title.toLowerCase()}
            </CalendlyLink>
          ))}
          <Text
            as="p"
            my={6}
            mx={[0, 3]}
            sx={{
              fontSize: 1,
              lineHeight: 'body',
              letterSpacing: 'wider',
              width: ['100%', '50%'],
              textAlign: ['center', 'left'],
              order: calendars.length + 1,
            }}
          >
            the linked permanent bracelet is a poignant way to mark the most
            meaningful and long-lasting of connections — the ones that outlast
            the test of time, remaining strong and true.
            <br />
            <br />
            book your appointment for a permanent piece to honour the forever
            bonds in your life. all linked permanent bracelets are made in solid
            14k yellow gold.
          </Text>
          <Box
            mx={3}
            sx={{
              height: [500, `calc(100% - 30px)`], // 30 = heading
              width: ['auto', '50%'],
              order: [current.index, calendars.length + 2],
              borderBottom: ['1px solid', 'none'],
              borderColor: 'border',
            }}
          >
            <Text
              variant="caps"
              pb={3}
              sx={{
                display: ['none', 'block'],
                width: '100%',
                textAlign: 'center',
                fontSize: 1,
              }}
            >
              {current.title}
            </Text>
            <InlineWidget
              url={`https://calendly.com/${current.path}`}
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
        </Flex>
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
