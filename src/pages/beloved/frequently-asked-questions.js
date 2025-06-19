import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import { Container, Flex, Grid, Heading, NavLink, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import Banner from '../../components/content/Banner'
import Layout from '../../components/layout'
import BrownButton from '../../components/BrownButton'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { useLocation } from '@reach/router'

const faqs = [
  `What is the Best Stone for an Engagement Ring? Does it Have to be a Diamond? Can I Use Any Stone I Like?`,
  `What is the Best Metal for an Engagement Ring?`,
  `What's the Difference Between an Engagement and a Wedding Ring?`,
  `how do i choose the right ring?`,
  `how do i determine the right ring size for my partner?`,
  `is your gold recycled, and are your sapphires and diamonds conflict-free?`,
  `Can I Just Walk in, or Do I Need an Appointment?`,
  `How Long Before My Proposal Should I Purchase my Engagement Ring?`,
  `I'm on a Deadline — Can I Place a Rush Order?`,
  `What Are the Benefits of Buying an Engagement Ring Online?`,
  `Can I Get my Ring Engraved?`,
  `how much should i spend on a ring?`,
  `do you offer payment plans? do i have to pay a deposit/pay upfront?`,
  `Does my Ring Come with an Appraisal?`,
  `what is your return policy if she says no or if she doesn't like the ring?`,
  `help! i broke/damaged my ring, what now?`,
  `how should i take care of my jewelry?`,
  `Can I Customize a Ring?`,
  `Do your Rings Have a Warranty?`,
  `can you set my heirloom stones in one of your settings?`,
]

// match faq in nav to faq in body of page
const scrollToAnswer = n => {
  const answers = document.querySelectorAll('h2')
  const top = answers[n-1].offsetTop - 110
  window.scrollTo({ top, behavior: 'smooth' })
}

const Paragraph = ({ children, maxWidth = 900, ...props }) => (
  <Text as="p" sx={{ maxWidth }} mx="auto" mb={5} px={5} {...props}>
    {children}
  </Text>
)

const BelovedFAQpage = () => {
  
  const {hash} = useLocation()

  // go to faq if hash ie: #3
  useEffect(() => {
    if (!hash) return
    const num = hash.substring(1)
    scrollToAnswer(num)
  }, []);

  
  return (
  <Layout
    title="FAQ - Frequently Asked Questions"
    description="what is the best stone for an engagement ring? what is the average price range for an engagement ring? do you offer payment plans? do i have to pay a deposit/pay upfront? what is bluboho return policy?"
    isBeloved
  >
    <Container
      sx={{
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
        p: { textAlign: 'center', lineHeight: 2, bg: '#eeece1' },
        'p a': { color: 'primary', fontWeight: 'heading' },
        ul: {
          padding: 0,
          maxWidth: 800,
          margin: 'auto',
          marginTop: 5,
          marginBottom: 5,
          paddingLeft: 6,
          paddingRight: 6,
          listStyleType: 'none',
          // listStyleType: ['disc', 'none'],
        },
        li: {
          bg: '#eeece1',
          fontSize: 1,
          letterSpacing: 'wider',
          lineHeight: 'body',
          // textAlign: ['left', 'center'],
          paddingBottom: 2,
          // ':before': { content: [null, '"•\\00a0\\00a0\\00a0"'], fontSize: 1 },
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
      <Breadcrumbs
        sx={{ maxWidth: 1000, width: '100%', alignItems: 'center' }}
        pt={[3, 5]}
        pb={[0, 0]}
        mx="auto"
        px={4}
        currentPage={{
          path: `/beloved/frequently-asked-questions`,
          text: 'FAQ',
        }}
      />
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
          Engagement Ring Frequently Asked Questions
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
      {/* <Paragraph maxWidth="100%">
        have a more specific question? get in touch and{' '}
        <GatsbyLink to="/book-a-consultation">make an appointment</GatsbyLink>{' '}
        so we can answer all your questions in real time.
      </Paragraph> */}
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
          // <NavLink key={`faq-${i}`} onClick={scrollToAnswer} p={3}>
          <NavLink key={`faq-${i}`} onClick={()=> {scrollToAnswer(i+1)}} p={3}>
            {faq}
          </NavLink>
        ))}
      </Grid>
      <Heading as="h2">What is the Best Stone for an Engagement Ring? Does it Have to be a Diamond? Can I Use Any Stone I Like?</Heading>
      <Paragraph>
      the type of gemstone you'd like in your ethically sourced engagement ring is perhaps the first big decision you'll make in the process. though everyone has their own preference, we define “best” as the most durable, sustainable, and beautiful. 
      </Paragraph>
      <Paragraph>
        there are several options for the shape of the center stone, such as:
        <br />
        round <br />
        oval <br />
        square <br />
        rectangle <br />
        marquis
      </Paragraph>
      <Paragraph>all of our stones are ethically and sustainably sourced, and they have uniquely beautiful properties, making each stone one-of-a-kind, just like your love.</Paragraph>
      <Paragraph>
        Though we work in a variety of stones, we specialize in{' '}
        <GatsbyLink to="/sapphires">
          montana sapphire engagement rings
        </GatsbyLink>
        , which are beloved for their soulful array of colours and shades. we also use antique or recycled diamonds, and are happy to source stones for your dream custom ring. we recommend diamond and sapphire stones because they score among the highest on the Mohs hardness scale, and are best suited to daily wear and will last generations as future heirlooms. other stones, such as emerald or opal, though beautiful, are not necessarily as durable as sapphire or diamond, which limits its wearability and longevity. feel free to <GatsbyLink to="/book-a-consultation/">contact us</GatsbyLink> to see what we can find for you to make your ring dreams come true.
      </Paragraph>
      <Paragraph>
        learn more about <GatsbyLink to="/sapphires">our sapphires</GatsbyLink>{' '}
        and <GatsbyLink to="/diamonds">our diamonds</GatsbyLink>.
      </Paragraph>
      {/* <BrownButton
        to="/book-a-consultation"
        text="book an engagement consultation"
      /> */}
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
      <Heading as="h2">What is the Best Metal for an Engagement Ring?</Heading>
      <Paragraph>
        there are several metal options to consider for your engagement ring:
      </Paragraph>
      <ul>
        <li>
          <strong>Yellow Gold</strong> - a classic and traditional choice for an
          engagement ring, always beautiful and elegant for any wearer that will
          last the test of time.
        </li>
        <li>
          <strong>Rose Gold</strong> - considered a more romantic style, with
          its rosy and warm hues in the metal, making it truly unique. the rose
          hue is created in the metal by an increase of copper alloys.
        </li>
        <li>
          <strong>White Gold</strong> - a more luxurious option, with its
          brilliant white colour, offering a more modern, stylish appearance.
          white gold is also more durable than yellow or rose gold. note that
          nickel is used to create that white colour in the gold, which is an
          allergen for those with metal sensitivities.
        </li>
        <li>
          <strong>Platinum</strong> - more durable than gold, holding up to
          scratches and wear and tear, and is the most allergy-friendly metals.
        </li>
      </ul>
      <Paragraph>
        we make all of our rings in 14k recycled gold as it is not only more
        affordable, but more durable as an everyday piece. along with proper
        {` `}
        <GatsbyLink to="/wear-and-care">wear and care</GatsbyLink>, we want to
        make sure you can enjoy your engagement ring for a lifetime and beyond.
      </Paragraph>
      <Heading as="h2">
        What's the Difference Between an Engagement and a Wedding Ring?
      </Heading>
      <Paragraph>
        traditionally, an engagement ring is given when a couple decides to get
        married, often with a proposal and an offering of a ring. this ring is
        commonly the centerpiece of a wedding stack, while a wedding ring is
        exchanged at the wedding ceremony, representing the official bond of
        marriage. the wedding ring can be a simpler style than the engagement
        ring, but this is subjective. both rings are often worn together as
        symbols of love and commitment. that being said, engagement rings can
        also be used as wedding rings, depending on your personal preference.
      </Paragraph>
      <Heading as="h2">How do I choose the right ring? </Heading>
      <Paragraph>
        Much like finding your beloved, choosing the right ring is mostly based
        on feeling and instinct— when you find it, you'll know.
      </Paragraph>
      <Paragraph>
        When you{' '}
        <GatsbyLink to="/book-a-consultation">book an appointment</GatsbyLink>{' '}
        with one of our experts, you'll get one-on-one guidance, advice, and
        personalized recommendations based on your partner's tastes and
        preferences— our goal is to make the selection process easy, memorable,
        and fun.
      </Paragraph>
      <Paragraph>
        <strong>some good starting points to consider:</strong>
        <br />
        what colours does she love?
        <br />
        is her style more classic, contemporary, or unique?
        <br />
        when it comes to her lifestyle, is she very active, adventurous, or
        outdoorsy?
        <br />
        what kind of jewellery does she already wear and love?
        <br />
        is it elaborate or more simple and subdued?
      </Paragraph>
      {/* <Heading as="h3">some good starting points to consider: </Heading>
      <ul>
        <li>What colours does she love? </li>
        <li>Is her style more classic, contemporary, or unique? </li>
        <li>
          When it comes to her lifestyle, is she very active, adventurous, or
          outdoorsy?
        </li>
        <li>What kind of jewelry does she already wear and love?</li>
      </ul> */}
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
        Can I Just Walk in, or Do I Need an Appointment?
      </Heading>
      <Paragraph>
        we don't mind if you make an appointment or walk into our store
        spontaneously, we are thrilled to see you either way! that being said,
        booking an appointment is a great way to ensure we have items ready for
        you that you are interested in seeing in person or wanting to try on.
        book an appointment with one of our expert connectors today.
      </Paragraph>

      <Heading as="h2">How Long Before My Proposal Should I Purchase my Engagement Ring?</Heading>
      <Paragraph>some guests have waited years between ordering and their proposal, while others have proposed the same day they receive the ring. timelines for purchasing your ring should be based on your own timeline and limitations (if any). there is no right (or wrong) answer to this question, but there are some factors that need to be taken into consideration:</Paragraph>
      <ul>
        <li>a brand new ring takes 4-6 weeks to make, starting from day of production</li>
        <li>a custom engagement ring can take 6-8 weeks from day of production, which does not include stone sourcing time and choosing your stone </li>
        <li>are you organizing a destination proposal? you will want to make sure your ring is ready before you leave</li>
        <li>are we shipping the ring to you? please take into consideration shipping times, including items being shipped internationally, as delays can occur.</li>
      </ul>
      <Paragraph>if you have any concerns about shipping or timelines for your ring, you can contact our guest experience team <GatsbyLink to="/contact-us">guestexperience</GatsbyLink> and they will be happy to assist you.</Paragraph>
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
      <Heading as="h2">What Are the Benefits of Buying an Engagement Ring Online?</Heading>
      <Paragraph>We understand that not everyone can make it into <GatsbyLink to="/locations/">our stores</GatsbyLink> to visit and purchase the ring of their dreams, so we are happy to help with an online purchase! although a purchase this important may seem daunting, not being done face to face, there are benefits to this option:</Paragraph>
      <ul>
        <li><strong>Wider Selection</strong> - all of our <GatsbyLink to="/collections/engagement-rings">one-of-a-kind engagement rings</GatsbyLink>, as well as our <GatsbyLink to="/collections/wedding-bands">wedding bands</GatsbyLink> are available to view online</li>
        <li><strong>Guest Experience</strong> - our online connectors are happy to help with any questions you may have</li>
        <li><strong>Discretion</strong> - ordering your ring online helps with the surprise of it all. you can order the ring fro the comfort of your home, and no one but you and us will know (and we can keep a secret!)</li>
        <li><strong>Virtual Appointments</strong> - for those that wish to have a closer look at our rings, we can coordinate a virtual appointment to see rings via facetime or video chat. <GatsbyLink to="/book-a-consultation/">contact us</GatsbyLink> to set up a personalized appointment</li>
      </ul>
      <Heading as="h2">Can I Get my Ring Engraved?</Heading>
      <Paragraph>
        depending on the ring size and the type of engraving you wishe to have
        done, yes! one of our connectors or our guest experience team would be
        happy to help you!
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

      <Heading as="h2">Does my Ring Come with an Appraisal?</Heading>
      <Paragraph>
        All of our artist cut engagement rings include an appraisal with the
        ring. ur other engagement rings can include a certificate or an
        appraisal upon request for a fee.
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
        <GatsbyLink to="/beloved/wear-and-care">
          golden rules for wear and care
        </GatsbyLink>
        .
      </Paragraph>

      <Heading as="h2">Can I Customize a Ring?</Heading>
      <Paragraph>
        absolutely! please note that if you are ordering a ring with no
        customization outside of metal or ring size, the average time is 4-5
        weeks. we would be happy to discuss options with you! please contact our
        guest experience team or meet with one of our connectors in store to
        discuss options. we average 6-8 weeks for a custom engagement ring to be
        made for production time.{' '}
        <GatsbyLink to="/book-a-consultation">book an appointment</GatsbyLink>{' '}
        to start the process with us.
      </Paragraph>

      <Heading as="h2">Do your Rings Have a Warranty?</Heading>
      <Paragraph>
        yes, all of our engagement and beloved wedding rings have a{' '}
        <GatsbyLink to="/warranty-policy">warranty policy</GatsbyLink> in place.
        if you have any questions about your ring, or would like to give your
        ring a routine check up, please contact our guest services team at{' '}
        <a href="mailto:guestservices@bluboho.com">guestservices@bluboho.com</a>
      </Paragraph>

      <Heading as="h2">
        can you set my heirloom stones in one of your settings?
      </Heading>
      <Paragraph pb={7}>
        We don't work with heirloom stones at this time— however, if you love
        our signature beloved by bluboho settings, we can source your dream
        stone to pair with it!{' '}
        <GatsbyLink to="/book-a-consultation">Get in touch</GatsbyLink> to find
        out more about custom stone sourcing.
      </Paragraph>
    </Container>
  </Layout>
)
}

export default BelovedFAQpage
