import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container, Flex, Grid, Heading, NavLink, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import Banner from '../../components/content/Banner'
import Layout from '../../components/layout'
import BrownButton from '../../components/BrownButton'

const faqs = [
  `what is the best stone for an engagement ring`,
  `how do i choose the right ring?`,
  `how do i determine the right ring size for my partner?`,
  `is your gold recycled, and are your sapphires and diamonds conflict-free?`,
  `what is your return policy if she says no or if she doesn't like the ring?`,
  `i'm on a deadline — can i place a rush order?`,
  `how much should i spend on a ring?`,
  `do you offer payment plans? do i have to pay a deposit/pay upfront?`,
  `help! i broke/damaged my ring, what now?`,
  `how should i take care of my jewelry?`,
  `can you set my heirloom stones in one of your settings?`,
]

// match faq in nav to faq in body of page
const scrollToAnswer = e => {
  const answers = document.querySelectorAll('h2')
  answers.forEach(answer => {
    const match = answer.innerText.toLowerCase() === e.target.text.toLowerCase()
    if (!match) return
    const top = answer.offsetTop - 20
    window.scrollTo({ top, behavior: 'smooth' })
  })
}

const Paragraph = ({ children, maxWidth = 900, ...props }) => (
  <Text as="p" sx={{ maxWidth }} mx="auto" mb={5} px={5} {...props}>
    {children}
  </Text>
)

const BelovedFAQpage = () => (
  <Layout
    title="FAQ - Frequently Asked Questions"
    description="what is the best stone for an engagement ring? what is the average price range for an engagement ring? do you offer payment plans? do i have to pay a deposit/pay upfront? what is bluboho return policy?"
  >
    <Container
      sx={{
        maxWidth: '100vw',
        background: 'url("/background_beige.webp")',
        h2: {
          textAlign: 'center',
          fontWeight: 'body',
          fontSize: 4,
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          marginTop: 8,
          marginBottom: 6,
          paddingLeft: 4,
          paddingRight: 4,
        },
        h3: {
          fontSize: 1,
          fontFamily: 'body',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 'wider',
          fontWeight: 'bold',
          paddingTop: 5,
          paddingBottom: 3,
        },
        p: { textAlign: 'center', lineHeight: 2, bg: '#f9f1e8' },
        'p a': { color: 'primary', fontWeight: 'heading' },
        ul: {
          padding: 0,
          maxWidth: 800,
          margin: 'auto',
          marginTop: 5,
          marginBottom: 5,
          paddingLeft: 6,
          paddingRight: 6,
          listStyleType: ['disc', 'none'],
        },
        li: {
          bg: '#f9f1e8',
          fontSize: 1,
          letterSpacing: 'wider',
          lineHeight: 'body',
          textAlign: ['left', 'center'],
          paddingBottom: 2,
          ':before': { content: [null, '"•\\00a0\\00a0\\00a0"'], fontSize: 1 },
        },
        'li::marker': { fontSize: '8px' },
      }}
      p={[0, 0, 0]}
    >
      <Banner height={380}>
        <StaticImage
          src="../../images/faq/banner-0-lg.webp"
          className="desktop"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../../images/faq/banner-0-sm.webp"
          className="mobile"
          alt=""
          placeholder="blurred"
        />
      </Banner>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          h1: { position: 'absolute', left: '-999em' },
          img: { width: [200, 200, 315] },
        }}
        py={7}
      >
        <Heading as="h1" variant="h2">
          frequently asked questions
        </Heading>
        <StaticImage
          id="headerImg"
          src="../../images/faq/FAQ-writing.webp"
          alt=""
          placeholder="blurred"
        />
      </Flex>
      <Paragraph maxWidth={750}>
        buying an engagement ring is an exciting experience, and luckily we are
        experts at guiding the process! remember to peruse our{' '}
        <GatsbyLink to="/how-to-buy-a-ring">
          how to buy an engagement ring
        </GatsbyLink>{' '}
        page for a step-by-step guide on how to get started, and take a peek at
        our engagement ring FAQs below for any lingering questions.
      </Paragraph>
      <Paragraph maxWidth="100%">
        have a more specific question? get in touch and{' '}
        <GatsbyLink to="/book-a-consultation">make an appointment</GatsbyLink>{' '}
        so we can answer all your questions in real time.
      </Paragraph>
      <Grid
        as="nav"
        sx={{
          gridAutoRows: '1fr',
          maxWidth: 900,
          width: '100%',
          a: {
            display: 'inline-flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            color: 'white',
            bg: '#33374C',
            fontFamily: 'heading',
            textTransform: 'lowercase',
            letterSpacing: 'wider',
            fontWeight: 'body',
            '&:hover': { color: 'white', bg: '#414a78' },
          },
        }}
        mx="auto"
        px={4}
        pt={5}
      >
        {faqs.map((faq, i) => (
          <NavLink key={`faq-${i}`} onClick={scrollToAnswer} p={3}>
            {faq}
          </NavLink>
        ))}
      </Grid>
      <Heading as="h2">what is the best stone for an engagement ring</Heading>
      <Paragraph>
        the type of gemstone you'd like in your ethically sourced engagement
        ring is perhaps the first big decision you'll make in the process.
        though everyone has their own preference, we define “best” as the most
        durable, sustainable, and beautiful.
      </Paragraph>
      <Paragraph>
        Though we work in a variety of stones, we specialize in{' '}
        <GatsbyLink to="/sapphires">
          montana sapphire engagement rings
        </GatsbyLink>
        , which are beloved for their soulful array of colours and shades, and
        we also use antique or recycled diamonds. we recommend these stones
        because they score among the highest on the mohs hardness scale. They
        are best suited to daily wear and will last generations as future
        heirlooms, they are ethically and sustainably sourced, and they have
        uniquely beautiful properties.
      </Paragraph>
      <Paragraph>
        learn more about <GatsbyLink to="/sapphires">our sapphires</GatsbyLink>{' '}
        and <GatsbyLink to="/diamonds">our diamonds</GatsbyLink>.
      </Paragraph>
      <BrownButton
        to="/book-a-consultation"
        text="book an engagement consultation"
      />
      <Grid
        sx={{
          maxWidth: 1200,
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gap: [0, 6, 8],
          '.noMobile': { display: ['none', 'block'] },
        }}
        py={5}
        px={[0, 0, 8]}
        mx="auto"
      >
        <StaticImage
          className="noMobile"
          src="../../images/faq/artwork-1.webp"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          src="../../images/faq/artwork-2.webp"
          alt=""
          placeholder="blurred"
        />
      </Grid>
      <Heading as="h2">How do I choose the right ring? </Heading>
      <Paragraph>
        Much like finding your beloved, choosing the right ring is mostly based
        on feeling and instinct— when you find it, you'll know.
      </Paragraph>
      <Paragraph>
        When you book an appointment with one of our experts, you'll get
        one-on-one guidance, advice, and personalized recommendations based on
        your partner's tastes and preferences— our goal is to make the selection
        process easy, memorable, and fun.
      </Paragraph>
      <Heading as="h3">some good starting points to consider: </Heading>
      <ul>
        <li>What colours does she love? </li>
        <li>Is her style more classic, contemporary, or unique? </li>
        <li>
          When it comes to her lifestyle, is she very active, adventurous, or
          outdoorsy?
        </li>
        <li>What kind of jewelry does she already wear and love?</li>
      </ul>
      <Grid
        sx={{
          maxWidth: 1200,
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gap: [0, 6, 8],
          '.noMobile': { display: ['none', 'block'] },
        }}
        pt={3}
        px={[0, 0, 8]}
        mx="auto"
      >
        <StaticImage
          src="../../images/faq/artwork-3.webp"
          alt=""
          placeholder="blurred"
        />
        <StaticImage
          className="noMobile"
          src="../../images/faq/artwork-4.webp"
          alt=""
          placeholder="blurred"
        />
      </Grid>
      <Heading as="h2">
        how do i determine the right ring size for my partner?
      </Heading>
      <Paragraph>
        there are a few different methods you can use to get a good estimate if
        you're unsure of your partner's ring size:
      </Paragraph>
      <ul>
        <li>
          Let us know that you're bringing her in to determine her ring size,
          and we'll help you
        </li>
        <li>
          ask a close friend or family member if they know your partner's ring
          size
        </li>
        <li>
          borrow a ring that your partner already wears and bring it to a
          jeweller to be measured
        </li>
        <li>
          use a printable ring size chart to measure your partner's finger
          yourself, or you can secretly measure one of their rings while they're
          not looking
        </li>
      </ul>
      <Heading as="h3">some things to keep in mind:</Heading>
      <ul>
        <li>
          if you don't get the perfect size on the first try, we can resize most
          rings. <strong>please note</strong>: resizing can take between 2-3
          weeks depending on the ring's style and the size change.
          <br />
          <br /> in some cases, the ring may need to be rebuilt to accommodate a
          size change. we can walk you through this process in or after your
          appointment.
        </li>
      </ul>
      <Heading as="h2">
        is your gold recycled, and are your sapphires and diamonds
        conflict-free?
      </Heading>
      <Paragraph>
        Yes! Our sustainable engagement rings are handcrafted in recycled 14k
        yellow gold, and all of{' '}
        <GatsbyLink to="/sapphires">our sapphires</GatsbyLink> are ethically and
        sustainably sourced from montana.{' '}
        <GatsbyLink to="/diamonds">our diamonds</GatsbyLink> are always
        ethically sourced in compliance with the kimberley process.
      </Paragraph>
      <Heading as="h2">
        what is your return policy if she says no or if she doesn't like the
        ring?
      </Heading>
      <Paragraph>
        we treat each of our rings as a sculpture: a wearable piece of art that
        will someday become an heirloom. due to the craftsmanship and artistry
        that goes into each piece, our engagement rings and wedding bands are
        final sale.
      </Paragraph>
      <Paragraph>
        <strong>tips from our experts</strong>: if you want to be 100% certain
        that your partner will like the ring, many of our guests bring their
        partner for a{' '}
        <GatsbyLink to="/book-a-consultation">
          free ring consultation
        </GatsbyLink>{' '}
        so that they can explore all of our options together— it makes for a fun
        date and gives you clarity on their preferences, too!
      </Paragraph>
      <Paragraph>
        if you're hoping to surprise them, you can have them pick out a
        shortlist of their favourite rings in the appointment for you to choose
        from— a failsafe surprise!
      </Paragraph>
      <Heading as="h2">i'm on a deadline — can i place a rush order?</Heading>
      <Paragraph>
        yes— in many cases, we can accommodate a rush order. typically our
        special orders and resizing take 4-6 weeks. if you need to pick up your
        rings in less than six weeks, it is considered a rush order. rush fees
        start at a minimum of $100, and your fee will be determined and
        communicated by our experts.
      </Paragraph>
      <Paragraph>
        typical rush orders take 3-4 weeks; shorter turnarounds can be discussed
        on a case-by-case basis. please make sure that you let us know your
        preferred <strong>pick-up date</strong> for the ring instead of the date
        of the wedding. this way, we can ensure that you have your rings well in
        advance, leaving you free to focus on preparing for your big day.
      </Paragraph>
      <Heading as="h2">How much should I spend on a ring?</Heading>
      <Paragraph>
        We've created our own way of doing things, and here, there are no rules!
      </Paragraph>
      <Paragraph>
        Ultimately, it doesn't matter what anyone says you “should” spend. We
        offer gorgeous pieces in a wide price range, and we love them all
        equally.
      </Paragraph>
      <Paragraph>
        Find the ring that makes you excited to get down on one knee— the one
        that gives you the feeling”, that you can't wait to see your love wear
        for the rest of your lives. The perfect ring is one that gives you this
        feeling and is affordable to you.
      </Paragraph>
      <Paragraph>
        Looking to break the mold and create your own love story? Read about our{' '}
        <GatsbyLink to="/blog/affordable-engagement-rings-that-break-tradition-but-not-the-bank">
          on-traditional engagement ring options
        </GatsbyLink>
        .
      </Paragraph>
      <Heading as="h2">
        do you offer payment plans? do i have to pay a deposit/pay upfront?
      </Heading>
      <Paragraph>
        We're here to help! Talk to our team about how we can work with you to
        accommodate your budget and timelines.{' '}
        <GatsbyLink to="/book-a-consultation">
          Book your free consultation
        </GatsbyLink>
        .
      </Paragraph>
      <Heading as="h2">help! i broke/damaged my ring, what now?</Heading>
      <Paragraph>
        Not to worry— it happens! Our pieces are designed to be as durable as
        possible, but damage sometimes occurs with long term everyday wear. In
        most cases, we're able to provide repair and maintenance services.
      </Paragraph>
      <Heading as="h2">how should i take care of my jewelry?</Heading>
      <Paragraph>
        We want your rings to last a lifetime, becoming a part of your love
        story. Read our{' '}
        <GatsbyLink to="/wear-and-care">
          golden rules for wear and care here
        </GatsbyLink>
        .
      </Paragraph>
      <Heading as="h2">
        can you set my heirloom stones in one of your settings?
      </Heading>
      <Paragraph pb={7}>
        We don't work with heirloom stones at this time— however, if you love
        our signature beloved by bluboho settings, we can source your dream
        stone to pair with it! Get in touch to find out more about custom stone
        sourcing.
      </Paragraph>
    </Container>
  </Layout>
)

export default BelovedFAQpage
