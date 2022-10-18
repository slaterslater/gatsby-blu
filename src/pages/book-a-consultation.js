import { Container, Box, Heading, Flex, Text } from 'theme-ui'
import React, { useState, useEffect, useRef } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { InlineWidget } from 'react-calendly'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ElementSlider from '../components/ElementSlider'
import CalendlyLink from '../components/consultation/CalendlyLink'
import FAQ from '../components/consultation/FAQ'

const CalendlyConsultationPage = ({ data, location }) => {
  const { calendars } = data.sanityConsultation
  const images = [
    <StaticImage
      src="../images/consultation/offering1.jpg"
      alt=""
      key="consultation-image-1"
      placeholder="blurred"
    />,
    <StaticImage
      src="../images/consultation/offering2.jpg"
      alt=""
      key="consultation-image-2"
      placeholder="blurred"
    />,
    <StaticImage
      src="../images/consultation/offering3.jpg"
      alt=""
      key="consultation-image-3"
      placeholder="blurred"
    />,
  ]
  const [fixedHeight, setFixedHeight] = useState('auto')
  const [current, setCurrent] = useState({ index: 0, ...calendars[0] })
  const calendlyPicker = useRef(null)

  useEffect(() => {
    // calculate height
    const max = calendlyPicker.current.offsetHeight - 160 // calendars - (heading + text)
    setFixedHeight(max > 630 ? max : 630) // 630 = iframe + heading

    // set inital calendar
    const initialSlug = location.state?.consultation
    if (initialSlug) {
      const calendar = calendars.find(({ slug }) => initialSlug === slug)
      calendar.index = calendars.indexOf(calendar)
      setCurrent(calendar)
    }

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

  return (
    <Layout
      title="Book a Consultation Appointment"
      description="Let us work with you throughout your engagement ring consultation on finding your beloved by bluboho engagement ring or wedding band"
    >
      <Flex sx={{ justifyContent: 'stretch', maxHeight: 400 }}>
        <StaticImage
          src="../images/consultation/consultation-booking-header.jpg"
          alt="Book a Consultation Appointment"
          placeholder="blurred"
        />
      </Flex>
      <Container as="main" sx={{ maxWidth: 1400 }} p={0}>
        <Box py={[6, 8]} sx={{ width: '100%', textAlign: 'center' }}>
          <Heading as="h1" variant="h2">
            book a consultation
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
            book a complimentary appointment with one of our jewelry experts who
            are here to help answer all of your questions. let your dreams of
            the perfect engagement ring or jewelry stack become a reality.
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
              url={`https://calendly.com/ringconsultation/${current.slug}`}
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
            gridTemplateColumns: ['1fr 1fr 1fr', 'repeat(3, 1fr)'],
            gap: 2,
          }}
        >
          {images.map(image => image)}
        </Box>
        <Box sx={{ display: ['block', 'none'] }}>
          <ElementSlider elements={images} />
        </Box>
        <Box pt={[6, 2]} mx="auto" sx={{ maxWidth: 830, textAlign: 'center' }}>
          <Heading variant="h2" pb={6} sx={{ textIndent: '1em' }}>
            F.A.Q.
          </Heading>
          <FAQ
            question="what does an engagement ring consultation look like?"
            answer="the appointment is an exclusive, one on one experience with one of our bridal specialists. typically they are an hour long, where you will be able to see our entire bridal collection in person. we will educate you on each ring, we will provide specific details such as carat weight and cut of each stone. you can try on every ring to discover which colour, cut and setting you love! we will also be able to help you style the ring with wedding bands to create a look that tells your story."
          />
          <FAQ
            question="do bluboho engagement rings come with a warranty?"
            answer="you will be part of the bluboho family for life. you can come in anytime for complimentary ring cleanings with our ultrasonic. you can also send your ring to our designer who made your piece to have a complimentary “check up”. our designer will be able to polish, tighten the prongs, and give your ring a thorough examination to ensure your ring is in tip top shape! we will be able to resize your ring complimentary as well! your ring also comes with a complimentary certificate of authenticity which verifies the rings specifications, that the stones have been ethically sourced, and the gold is made from recycled material."
          />
          <FAQ
            question="what does “one of a kind” mean?"
            answer="we specialize in one of a kind rings! this means that the stones we have sourced are absolutely unique. the stone colour, carat weight and shape will never be the exact same as another sapphire we find, which makes your ring absolutely rare and bespoke to you. we also carry a wide range of setting styles, so no two rings are ever the exact same. you will be the only person in the world who has your ring, just like your soulmate and love story."
          />
          <FAQ
            question="how far in advance should i begin searching for my ring?"
            answer="you should give yourself at least 3 months to find your one of a kind ring! we carry small collections in store, and only release new rings once every month. it can also take upwards of 12 weeks to resize your ring! but when you find the ring of your dreams, jump on it as fast as you can because it’s one of a kind and we will never have it back in stock again!"
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default CalendlyConsultationPage

export const query = graphql`
  {
    sanityConsultation {
      calendars {
        title
        slug
      }
    }
  }
`

CalendlyConsultationPage.propTypes = {
  data: PropTypes.any,
  location: PropTypes.object,
}
