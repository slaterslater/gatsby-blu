import React from 'react'
import { Box, Container, Grid, Heading, Link, Text } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Banner from '../components/content/Banner'

import imageLocationsDesktop from '../images/how-to-buy-a-ring/Desktop-600px-11.webp'
import imageLocationsMobile from '../images/how-to-buy-a-ring/mobile-600px-18.webp'
import { Breadcrumbs } from '../components/Breadcrumbs'

const BackgroundImage = ({ src, minHeight = 0, className = '' }) => (
  <Box
    className={className}
    sx={{
      bg: '#eeece1',
      minHeight,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundBlendMode: 'multiply',
      '.mobile': { display: ['block', 'none'] },
      '.desktop': { display: ['none', 'block'] },
    }}
  />
)

const HowToBuyPage = () => (
  <Layout
    title="How to choose an engagement ring?"
    description="We're here to answer all of your most asked questions about finding an unique and ethically-made sapphire or diamond engagement ring you can cherish forever"
    isBeloved
  >
    <Container
      sx={{
        '.h1': { fontFamily: 'heading', fontSize: 4 },
        'h2, h3': {
          textTransform: 'uppercase',
          fontFamily: 'body',
          fontSize: 1,
          fontWeight: 'bold',
          letterSpacing: 'wider',
          paddingBottom: 5,
          paddingLeft: [5, 0],
          paddingRight: [5, 0],
        },
        h3: {
          textAlign: ['center', 'left'],
        },
        '.center *': { textAlign: 'center', margin: 5, marginBottom: -5 },
        '.grid': {
          maxWidth: 820,
          gridTemplateColumns: ['1fr', '1fr 1fr'],
          gap: [0, 4, 7],
          rowGap: [0, 5, 5],
          margin: 'auto',
          marginTop: 7,
          marginBottom: 4,
          textTransform: 'lowercase',
        },
        '.grid p': {
          fontSize: 1,
          fontFamily: 'body',
          letterSpacing: 'wider',
          paddingBottom: 5,
          textAlign: ['center', 'left'],
          lineHeight: 2,
          paddingLeft: [5, 0],
          paddingRight: [5, 0],
        },
        '.strong': {
          fontWeight: 'bold',
          textTransform: 'uppercase',
          margin: ['auto', 0],
        },
        a: {
          color: 'primary',
          textDecoration: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
        },
        '.quote': {
          display: 'flex',
          flexDirection: 'column',
          fontStyle: 'italic',
          fontWeight: 'heading',
        },
        '.quote span': {
          fontStyle: 'normal',
          fontWeight: 'body',
          marginTop: 2,
        },
        ul: {
          margin: 0,
          padding: 0,
          paddingLeft: [7, 5],
          paddingRight: [5, 0],
          li: { marginBottom: 5, lineHeight: 2 },
        },
        '.m5': { margin: 5 },
        '.mobile': { display: ['block', 'none'] },
        '.desktop': { display: ['none', 'block'] },
      }}
      p={[0, 0, 0]}
    >
      <Banner>
        <StaticImage
          placeholder="blurred"
          className="desktop"
          src="../images/how-to-buy-a-ring/Desktop-top-1.webp"
          alt=""
        />
        <StaticImage
          placeholder="blurred"
          className="mobile"
          src="../images/how-to-buy-a-ring/mobile-600px-1.webp"
          alt=""
        />
      </Banner>
      <Breadcrumbs
        sx={{ maxWidth: 1000, width: '100%', alignItems: 'center' }}
        pt={[3, 5]}
        pb={[0, 0]}
        mx="auto"
        px={4}
        mb={7}
        currentPage={{
          path: `/how-to-buy-a-ring`,
          text: 'how to buy an engagement ring',
        }}
      />
      <Box className="center">
        <Heading as="h1" variant="h2" pb={5}>
          how to buy an engagement ring
        </Heading>
        <Heading as="h2">why beloved by bluboho?</Heading>
        <Text as="p">
          we want the experience of buying an engagement ring to become a
          cherished and joyful memory.
        </Text>
      </Box>
      <Grid className="grid">
        <Box>
          <Text as="p">
            our goal is to be your guide through the process in a supportive and
            celebratory environment, equipping you with the knowledge and
            insight needed to make the right choice for you.
          </Text>
          <Text as="p" className="strong">
            when you buy a ring from beloved by bluboho, you can feel proud to
            wear it forever.
          </Text>
          <Text as="p">
            our rings are made with style and substance, crafted with care and
            intention to represent your story. we love creating one of a kind
            rings with the most unique stones, that will never be replicated.
            when you're deciding where to buy an engagement ring, consider the
            benefits of shopping with your values: we are leaders in creating
            sustainably minded, ethically made sapphire engagement rings,
            handmade in Toronto. our rings each come with a unique name and
            deeply meaningful storytelling, making them a truly unique
            engagement ring in every way.
          </Text>
        </Box>
        <Box>
          <Text as="p">
            see{' '}
            <GatsbyLink to="/bridal-stories">
              what our guests are saying
            </GatsbyLink>
            .
          </Text>
          <Text as="p">
            we believe that your engagement ring is more than simply a piece of
            jewelry: it is a future heirloom that will represent this moment in
            your life— so we want you to find exactly what you want, and to love
            it forever. whether that means a traditional large centre stone
            solitaire, a diamond-encrusted band, or something unique to you, we
            want to make your dream come true. when we create our rings, our
            focus is resonant, soulful design, magical centre stones full of
            character and complexity, and fine craftsmanship from expert
            artisans.
          </Text>
        </Box>
      </Grid>
      <Banner>
        <StaticImage
          placeholder="blurred"
          className="desktop"
          src="../images/how-to-buy-a-ring/Desktop-top-2.webp"
          alt=""
        />
        <StaticImage
          placeholder="blurred"
          className="mobile"
          src="../images/how-to-buy-a-ring/mobile-600px-2.webp"
          alt=""
        />
      </Banner>
      <Grid className="grid">
        <Box>
          <Heading as="h3">the beloved by bluboho shopping experience</Heading>
          <Text as="p">
            with beloved by bluboho, you'll have all the support you need to
            find the perfect piece in a pressure-free environment. we know what
            a big decision this is, and we're ready to help you make an informed
            decision by equipping you with our years of experience and
            expertise.
          </Text>
          <Text as="p" className="strong">
            we encourage you to take your time to mull things over— bring
            someone with you, sleep on it, and trust your intuition.{' '}
          </Text>
          <Text as="p">
            whether you connect with us online via virtual appointments, emails,
            or text, or in person at one of our locations, dedicated people who
            care deeply about what they do will walk you through each step in
            the process. the celebration starts here!
          </Text>
        </Box>
        <Box>
          <Text as="p" className="quote">
            "bluboho is so much more than a jewelry store— it's a place that
            made me feel unabashedly welcome (big hugs included) and immediately
            made me want to become friends with the bluboho ladies…"
            <span>— kaylee & james</span>
          </Text>
          <Text as="p" className="quote">
            "when we first visited the store in oakville, the store associates
            were kind and curious of our story which made the experience of
            choosing a ring even more meaningful. they went the extra mile with
            each interaction."
            <span>— shelby & mike</span>
          </Text>
          <Text as="p" className="quote">
            "bluboho has been my fiancée's favourite jewelry store since she
            worked in downtown toronto. since she introduced me to bluboho they
            have been my go-to for gifts for her, my mom, and my sister. the
            whole staff has made getting the engagement ring and making sure
            it's perfect easier than i ever thought it would be."
            <span>— lauren & william</span>
          </Text>
        </Box>
      </Grid>
      <Banner>
        <StaticImage
          placeholder="blurred"
          className="desktop"
          src="../images/how-to-buy-a-ring/Desktop-top-3.webp"
          alt=""
        />
        <StaticImage
          placeholder="blurred"
          className="mobile"
          src="../images/how-to-buy-a-ring/mobile-600px-3.webp"
          alt=""
        />
      </Banner>
      <Grid className="grid">
        <Box>
          <Heading as="h3">our process</Heading>
          <Text as="p">
            meaningful design: each of our pieces starts with a story, which
            influences the design. we like to think of these unique engagement
            rings as tiny, wearable sculptures: pieces of art that embody the
            love between you. we choose the perfect setting to complement the
            hand-selected ethically-sourced sapphire, and then each ring is
            handcrafted in the heart of toronto.
          </Text>
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-4.webp"
            alt=""
          />
          <Heading as="h3" mt={6}>
            sustainable sourcing
          </Heading>
          <Text as="p">
            meaningful design: each of our pieces starts with a story, which
            influences the design. we like to think of these unique engagement
            rings as tiny, wearable sculptures: pieces of art that embody the
            love between you. we choose the perfect setting to complement the
            hand-selected ethically-sourced sapphire, and then each ring is
            handcrafted in the heart of toronto.
          </Text>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}> */}

          <StaticImage
            placeholder="blurred"
            className="desktop"
            src="../images/how-to-buy-a-ring/Desktop-600px-9.webp"
            alt=""
          />
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-5.webp"
            alt=""
          />
        </Box>
      </Grid>
      <Banner noMobile>
        <StaticImage
          placeholder="blurred"
          // className="desktop"
          src="../images/how-to-buy-a-ring/Desktop-top-4.webp"
          alt=""
        />
      </Banner>
      <Grid className="grid">
        <Box>
          <Box>
            <Heading as="h3">Intentional design</Heading>
            <Text as="p">
              our pieces begin with the story that shapes them. our creative and
              design teams collaborate closely to find a theme, story, or
              symbolism with which to begin designing our pieces— each unique
              centre stone is hand-selected in-house, then matched with a
              setting that will best complement and enhance its beauty.
            </Text>
            <StaticImage
              placeholder="blurred"
              className="mobile"
              src="../images/how-to-buy-a-ring/mobile-600px-6.webp"
              alt=""
            />
          </Box>
          <Box>
            <Heading as="h3" mt={7}>
              small batch collections
            </Heading>
            <Text as="p">
              we create and release our pieces in small batches to ensure the
              highest quality and care goes into each one. our pieces are
              handmade by expert artisans who work closely with us to make each
              ring a unique work of art.
            </Text>
            <StaticImage
              placeholder="blurred"
              className="mobile"
              src="../images/how-to-buy-a-ring/mobile-600px-7.webp"
              height={200}
              alt=""
            />
          </Box>
        </Box>
        <StaticImage
          placeholder="blurred"
          className="desktop"
          src="../images/how-to-buy-a-ring/Desktop-600px-1.webp"
          alt=""
        />
        <Box>
          <Heading as="h3">certifications</Heading>
          <Text as="p">
            each one-of-a-kind engagement ring comes with a complimentary
            certificate of authenticity signed by our in-house gemmologist,
            outlining the specifications of your ring and the story upon which
            it was based.
          </Text>
        </Box>
        <StaticImage
          placeholder="blurred"
          className="mobile m5"
          src="../images/how-to-buy-a-ring/mobile-600px-8.webp"
          alt=""
        />
        <Box>
          <Heading as="h3">storytelling</Heading>
          <Text as="p">
            each one-of-a-kind ring comes uniquely named with a bespoke story
            attached. we hope the meaning speaks to you as deeply as the design,
            and that every time you look at your ring, you remember the love
            story it represents.
          </Text>
        </Box>
      </Grid>
      <Box
        className="center"
        sx={{ h2: { fontFamily: 'heading', fontSize: 4 } }}
        py={6}
      >
        <Heading as="h2" className="h1">
          how to buy an engagement ring
        </Heading>
        <Text as="p">
          first and foremost— breathe! we are here to guide you through this
          amazing, life-changing experience from start to finish.
        </Text>
      </Box>
      <Grid className="grid">
        <Box>
          <Heading as="h3">first steps</Heading>
          <Text as="p">
            <strong>do your research</strong>: figure out your partner's ring
            size, and what kinds of rings they love. ring sizing is not an exact
            science, and depends on multiple factors, including the width of the
            band, the shape of one's fingers, & environmental factors such as
            climate and temperature.
          </Text>
          <Text as="p">
            <strong>top tip</strong>: if you can get hold of a ring your partner
            wears on their ring finger, try to slip on the ring and mark where
            it lands on your finger— voila, you can now use a ring sizer to find
            their size! if your partner is right-handed and the ring is worn on
            their right hand, size down a quarter of a size.
          </Text>
          <StaticImage
            placeholder="blurred"
            className="desktop"
            src="../images/how-to-buy-a-ring/Desktop-600px-2.webp"
            alt=""
          />
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-9.webp"
            alt=""
          />
        </Box>
        <Box>
          <Heading as="h3" mt={[7, 0]}>
            things to keep in mind
          </Heading>
          <Text as="p">
            due to aspects of their design, many of our rings can be resized,
            some cannot be resized at all, and some can only be resized in a
            certain way. if you're not sure what size to get, we can advise you
            on which styles are compatible with your potential resizing needs.
          </Text>
          <Text as="p" className="strong">
            if you have no way to figure out your partner's size in secret, you
            still have options:
          </Text>
          <Text as="p">
            <strong>ONE</strong>: ask! whether you choose to do it covertly or
            openly, asking your partner for their ring size is one way to know
            for sure that you have the correct size.
          </Text>
          <Text as="p">
            <strong>TWO</strong>: if in doubt, too big is better than too small.
          </Text>
          <Text as="p">
            <strong>THREE</strong>: use a placeholder ring such as our{' '}
            <GatsbyLink to="/products/marry-me-ring">marry me</GatsbyLink> or{' '}
            <GatsbyLink to="/products/marry-me-ring-14k-yellow-gold-white-diamond">
              beloved rings
            </GatsbyLink>{' '}
            to propose, and then come in together to pick your forever ring.
            within one year of purchasing one of these rings, you can receive a
            credit for an engagement ring from the beloved one-of-a-kind or
            beloved endless collections:
          </Text>
          <Box as="ul">
            <Text as="li">
              $100 credit on engagement ring purchases up to the value of $4997
            </Text>
            <Text as="li">
              $398 credit (the full value of the marry me/beloved ring) on
              engagement ring purchases of $4998+
            </Text>
          </Box>
          <Text as="p" sx={{ maxWidth: [320, 400] }} mx={['auto', 0]}>
            if you have any additional questions about figuring out your
            partner's ring size, get in touch with us at{' '}
            <a href="mailto:guestexperience@bluboho.com">
              guestexperience@bluboho.com
            </a>
            <br />
            or ask your expert during your{' '}
            <GatsbyLink to="/book-a-consultation">
              ring&nbsp;consultation&nbsp;appointment
            </GatsbyLink>
          </Text>
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-10.webp"
            alt=""
          />
        </Box>
        <Box>
          <Heading as="h3">inspiration</Heading>
          <Text as="p">
            seek out inspiration from our{' '}
            <GatsbyLink to="">
              collective of beloved by bluboho couples
            </GatsbyLink>
            .
          </Text>
          <Text as="p" className="strong">
            consider important lifestyle factors
          </Text>
          <Text as="p">
            if your partner is very active? will this ring be worn to the gym,
            gardening, hiking, etc? do they prefer very dainty, delicate designs
            or bolder statement pieces? do they love— or avoid— wearing certain
            colours? attention to detail is key in figuring out their tastes,
            practicalities, and preferences.
          </Text>
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-11.webp"
            alt=""
          />
        </Box>
        <Box sx={{ textAlign: ['center', 'left'] }} mt={[7, 0]}>
          <Heading as="h3">book your ring consultation! </Heading>
          <Text as="p">
            this is the best way to receive the bluboho experience— whether
            you're just starting out, or hitting a wall in your process. think
            of it like a guided backstage tour, and you are our vip. this is a
            friendly one-on-one session with one of our beloved by bluboho
            experts, where you can have all your questions answered and get
            personalized guidance to make your search easy and enjoyable.
          </Text>
          <Link
            as={GatsbyLink}
            to="/book-a-consultation"
            variant="outlineButton"
            sx={{ display: 'inline-block' }}
            mb={[5, 0]}
          >
            book an engagement consultation
          </Link>
        </Box>
      </Grid>
      <Box sx={{ maxWidth: 1000, display: ['none', 'flex'] }} mx="auto">
        <Box sx={{ transform: 'translateX(25px)' }} mt={[0, 6, 8]}>
          <StaticImage
            placeholder="blurred"
            id="imgLft"
            src="../images/how-to-buy-a-ring/Desktop-600px-8.webp"
            alt=""
          />
        </Box>
        <Box sx={{ transform: 'translateX(-25px)' }} pb={[0, 6, 8]}>
          <StaticImage
            placeholder="blurred"
            id="imgRht"
            src="../images/how-to-buy-a-ring/Desktop-600px-7.webp"
            alt=""
          />
        </Box>
      </Box>
      <StaticImage
        placeholder="blurred"
        className="mobile"
        src="../images/how-to-buy-a-ring/mobile-600px-12.webp"
        alt=""
      />
      <Grid className="grid">
        <Box>
          <Heading as="h3">how much to spend on an engagement ring</Heading>
          <Text as="p">
            the perfect ring is not necessarily the most expensive one— it's the
            one that makes your heart beat faster. having a budget is great for
            selecting your options, but we believe that the “rules” about how
            much to spend on an engagement ring, such as the three months'
            salary rule, are antiquated and unnecessary. engagement ring
            etiquette is evolving with the times. to us, what matters is
            identifying a realistic and practical budget and finding a deeply
            meaningful and beautiful ring within it.{' '}
          </Text>
          <Text as="p">
            we'll always respect the boundaries you give us, and help you
            navigate our collections to find what you're looking for. at every
            price point, our rings are made with the highest quality, care, and
            ethical practices, so you can never go wrong!
          </Text>
        </Box>
        <Box>
          <StaticImage
            placeholder="blurred"
            className="desktop"
            src="../images/how-to-buy-a-ring/Desktop-600px-3.webp"
            alt=""
          />
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-13.webp"
            alt=""
          />
        </Box>
        <BackgroundImage src={imageLocationsDesktop} className="desktop" />
        <Box>
          <Heading as="h3" mt={[7, 0]}>
            where to buy an engagement ring
          </Heading>
          <Text as="p">
            there is no right or wrong answer here— it just depends on what
            works best for you. of course, it's extra special to see the rings
            in person, but we know that that isn't always possible due to
            location— or discretion if you're trying to keep this a surprise!{' '}
          </Text>
          <Text as="p">
            if you can't make it into one of our store locations, we are still
            able to make some magic happen for you via our virtual appointments
            and guest experience team. we can send videos and photos of the
            rings from every angle, video chat with you, and keep you updated if
            appointments are made to see a one-of-a-kind ring you've had your
            eye on.
          </Text>
        </Box>
        <BackgroundImage
          src={imageLocationsMobile}
          minHeight={150}
          className="mobile m5"
        />
        <Box>
          <Heading as="h3">
            the magic of our rings
            <br /> we make pieces that speak to the soul
          </Heading>
          <Text as="p">
            our engagement rings are designed to create a soulful impression—
            each one is a piece of art to be worn every day. whether you choose
            a one-of-a-kind ring or a classic from our core collections, every
            piece was designed with intention, meaning, and symbolism. our
            designs span a diverse range of styles to suit everyone from the
            classic traditionalist to the free-spirited individualist and
            everyone in between. a beloved by bluboho ring has a unique presence
            and personality— just like your love.
          </Text>
        </Box>
        <StaticImage
          placeholder="blurred"
          className="desktop"
          src="../images/how-to-buy-a-ring/Desktop-600px-4.webp"
          alt=""
        />
        <StaticImage
          placeholder="blurred"
          className="mobile"
          src="../images/how-to-buy-a-ring/mobile-600px-14.webp"
          alt=""
        />
      </Grid>
      <Banner pt={5} noMobile>
        <StaticImage
          placeholder="blurred"
          src="../images/how-to-buy-a-ring/Desktop-top-5.webp"
          alt=""
        />
      </Banner>
      <Box
        sx={{ maxWidth: 510, 'h3, p': { textAlign: 'center' } }}
        py={6}
        mx="auto"
      >
        <Heading as="h3">our sapphires</Heading>
        <Text as="p">
          we are leaders in creating artisan and one-of-a-kind (unique) sapphire
          engagement rings. we use sapphires for many reasons:
        </Text>
      </Box>
      <StaticImage
        placeholder="blurred"
        className="mobile"
        src="../images/how-to-buy-a-ring/mobile-600px-15.webp"
        alt=""
      />
      <Grid className="grid">
        <Box sx={{ strong: { textTransform: 'uppercase' } }}>
          <Text as="p">
            <strong>hardness and durability</strong>: at a 9-9.5 on the mohs
            scale, sapphires are durable enough to withstand daily wear over a
            lifetime.
          </Text>
          <Text as="p">
            <strong>reverence</strong>: revered throughout history for their
            romantic associations with fidelity, love, truth, and commitment,
            sapphires have been used in engagement rings for centuries— we love
            being part of the continuation of this tradition.
          </Text>
          <Text as="p" mb={7}>
            <strong>beauty</strong>: simply put, sapphires are incredibly
            beautiful stones that stand out in a crowd. with their
            colour-changing properties, broad range of colours, and eye-catching
            appeal, they strike a balance between tradition and originality.
            read&nbsp;more&nbsp;about
            <br />
            <GatsbyLink to="/blogs/news">
              why we love sapphire engagement rings
            </GatsbyLink>
          </Text>
          <StaticImage
            placeholder="blurred"
            className="desktop"
            src="../images/how-to-buy-a-ring/Desktop-600px-5.webp"
            alt=""
          />
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-16.webp"
            alt=""
          />
        </Box>
        <Box>
          <Heading as="h3" mt={[7, 0]}>
            montana sapphires
          </Heading>
          <Text as="p">
            we predominantly use ethically sourced montana sapphires, which we
            favour for their ethical sourcing, traceability from mine to market,
            and their unique hues. they come in almost every colour— most
            notably, soft hues of blues, greens, pinks, violets, and yellows. we
            also love using bicolour sapphires for their unique colour
            combinations, adding depth and complexity to your ring.
          </Text>
          <StaticImage
            placeholder="blurred"
            className="mobile m5"
            src="../images/how-to-buy-a-ring/mobile-600px-19.webp"
            alt=""
            height={200}
          />
          <Heading as="h3">artist-cut sapphires</Heading>
          <Text as="p">
            artist-cut sapphires are, quite literally, works of art. these
            magical stones are shaped by hand by expert gem cutters to best
            highlight the unique beauty of the stone in its facets. every gem
            cutter has their own signature, style and specialty. most artist
            cuts are proprietary, meaning that the way the stone is cut in
            pattern, and the way of faceting, is owned by the gem cutter. these
            brilliant artists hand-select each gemstone and its design to
            highlight the stone's most striking features, which remain exclusive
            to the hands that crafted it.
          </Text>
          <StaticImage
            placeholder="blurred"
            className="desktop"
            src="../images/how-to-buy-a-ring/Desktop-600px-10.webp"
            alt=""
          />
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-20.webp"
            alt=""
          />
        </Box>
      </Grid>
      <Banner noMobile>
        <StaticImage
          placeholder="blurred"
          src="../images/how-to-buy-a-ring/Desktop-top-6.webp"
          alt=""
        />
      </Banner>
      <Grid className="grid">
        <Box mb={5}>
          <Box>
            <Heading as="h3">diamonds</Heading>
            <Text as="p">
              our diamonds have been sourced ethically from all over the world
              and verified using the kimberley process, which is a worldwide
              organization uniting over 80 countries around the world that stand
              by ethical diamond mining practices. it is canadian law that
              diamonds entering the country are ethically sourced and verified
              by the kimberley process, and our sources have deep respect for
              this process.
            </Text>
          </Box>
          <StaticImage
            placeholder="blurred"
            className="desktop"
            src="../images/how-to-buy-a-ring/Desktop-600px-6.webp"
            alt=""
          />
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-17.webp"
            alt=""
          />
        </Box>
        <Box>
          <Box>
            <Heading as="h3" mt={[5, 0]}>
              our collections
            </Heading>
            <Text as="p">
              our one-of-a-kind engagement rings: what makes them one-of-a-kind?
              we go out of our way to source unique sapphires in terms of their
              colour, shape, and size. each sapphire cannot be replicated
              because they are natural stones plucked from mother earth, often
              with unique qualities such as vivid colours, pale hues, shimmering
              internal minerals, or colour-changing properties. we always say
              our sapphires are waiting for their destined couple, and finding
              your ring can feel just as magical as finding your soulmate. the
              stones are then cut and polished by hand. each setting is
              thoughtfully designed and sketched by hand based on the shape,
              color and size of the stone to create a masterpiece. each stone is
              set into a bespoke setting created specially for that stone.
            </Text>
          </Box>
          <Box>
            <Heading as="h3">
              how to shop for an engagement ring: online or in-person
            </Heading>
            <Text as="p">
              whether you visit us in-store or prefer to take your consultation
              from the comfort of your couch with a virtual appointment, you'll
              find a long-lost friend in our beloved by bluboho engagement ring
              experts. we offer complimentary, one-on-one sessions that are
              tailored to guide you through our rings in a pressure-free, fun,
              and meaningful way. we believe that this milestone should be
              celebrated & most importantly— enjoyed!
            </Text>
            <StaticImage
              placeholder="blurred"
              className="mobile"
              src="../images/how-to-buy-a-ring/mobile-600px-21.webp"
              alt=""
            />
          </Box>
        </Box>
        <Box>
          <Heading as="h3" mt={[7, 0]}>
            what can i expect at my appointment?
          </Heading>
          <Text as="p">
            these appointments are one-on-one sessions where we educate our
            guests on our unique sapphires, the builds of our rings, and the
            inspiration and symbolism behind each piece. if you're bringing your
            partner, they can try them on and be styled with wedding ring
            pairings.
          </Text>
          <Text as="p">
            we will ensure that you are sized correctly and that you leave your
            appointment armed with all the crucial information about your top
            choices, along with links to the pieces and photos and videos to
            refer back to.
          </Text>
          <Text as="p">
            you will automatically be added to our exclusive beloved by bluboho
            list, and we will keep you informed if any appointments have been
            made to view your top choice rings or when we get new pieces in
            stock.
          </Text>
          <StaticImage
            placeholder="blurred"
            className="mobile"
            src="../images/how-to-buy-a-ring/mobile-600px-22.webp"
            alt=""
          />
        </Box>
        <Box>
          <Heading as="h3" mt={[7, 0]}>
            how to prepare for your appointment{' '}
          </Heading>
          <Box as="ul" sx={{ height: ['auto', 0] }}>
            <Text as="li">
              take a look at our website to let us know which rings you love and
              gravitate towards the most. this way we can get a better
              understanding of taste and preferences, and ensure we have a
              complimentary selection at the store for you.
            </Text>
            <Text as="li">
              decide on your budget so that we can respect your boundaries and
              show you rings that are within your comfort zone.
            </Text>
            <Text as="li">
              come with an open mind! sometimes a favourite ring might have
              sold, and because they're one of a kind, it's gone for good. take
              heart— we have a wide variety of other stunning one-of-a-kind
              rings, and the one that's meant for you is waiting to be
              discovered amongst them...
            </Text>
            <Text as="li">
              <strong>make it a date</strong>: bring your beloved along for the
              ride— it's twice the fun! bringing your partner along can be just
              as romantic, and takes out a lot of the guesswork. by involving
              them in the ring-choosing process, you can guarantee that they'll
              love the ring you eventually present them with. if you want the
              proposal to be a surprise, that can still happen! many of our
              couples will narrow their selection down to a “shortlist” so they
              can be surprised at the proposal and know they'll end up with a
              ring they love.
            </Text>
          </Box>
        </Box>
        <Box>
          <Heading as="h3">Custom/bespoke creations</Heading>
          <Text as="p">
            we are known for our one-of-a-kind engagement rings, and we have
            worked with so many couples to create bespoke creations. If you have
            a specific vision you'd like to create, get in touch: we would love
            to work with you on stone sourcing and creating your one-of-a-kind
            ring! as long as your request fits within our ethical and logistical
            parameters, we can make your dream come true.
          </Text>
          <Text as="p">
            Some customizations we can offer:
            <br />
            <br /> 18k gold <br /> White gold <br />
            Resizing (dependent on design elements)
            <br />
            Stone sourcing
          </Text>
          <Text as="p">
            Still have questions? Try our{' '}
            <GatsbyLink to="/pages/faq">FAQ page</GatsbyLink> for more
            information on our engagement rings, or <strong>text</strong> or{' '}
            <strong>call</strong> us at{' '}
            <a href="tel:+1 647-273-6297">647-273-6297</a>
          </Text>
        </Box>
      </Grid>
    </Container>
  </Layout>
)

export default HowToBuyPage
