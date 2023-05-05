import React from 'react'
import { graphql } from 'gatsby'
import { Box, Button, Flex, Grid, Heading, Link, Text } from 'theme-ui'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Layout from '../components/layout'
import Banner from '../components/content/Banner'

dayjs.extend(advancedFormat)

const EventDateTime = ({ dateAndTimes }) => {
  const { date, endTime, startTime } = dateAndTimes
  const day = dayjs(date).format('MMMM Do')
  const time = t => {
    const [hh, mm] = t.split(':')
    return `${hh % 12 || 12}:${mm}${hh < 12 ? 'am' : 'pm'}`
  }
  const timeRange = `${time(startTime)} - ${time(endTime)}`
  return (
    <Text as="li">
      {day}, {timeRange}
    </Text>
  )
}

const Event = ({ details, index }) => {
  const { image, title, badge, description, link, dates, location, inStore } =
    details
  const { city, phone, email, street, province } = inStore ? location : details
  const flexDirection = index % 2 ? 'row-reverse' : 'row'
  const bg = index % 2 ? 'white' : 'bbBackground'

  return (
    <Box px={[5, 6]} py={[7, 8]} bg={bg}>
      <Flex
        sx={{
          maxWidth: 1100,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: ['column', 'column', flexDirection],
        }}
        mx="auto"
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: 675,
            'h3, strong': {
              margin: 0,
              fontSize: 1,
              textTransform: 'uppercase',
              lineHeight: 2,
            },
            'span, li, a': {
              textTransform: 'lowercase',
              textDecoration: 'none',
              color: 'primary',
              fontSize: 1,
              letterSpacing: 'wider',
              lineHeight: 2,
            },
          }}
          px={5}
        >
          <Heading as="h2" variant="h2" mb={5}>
            {title}
          </Heading>
          <span>{description}</span>
          <Grid
            gap={4}
            sx={{
              gridTemplateColumns: 'max-content 1fr',
              ol: { listStyleType: 'none', margin: 0, padding: 0 },
            }}
            my={5}
          >
            <h3>location:</h3>
            <span>
              {street} <br /> {`${city}, ${province}`}
            </span>
            <h3>date &amp; time:</h3>
            <ol>
              {dates.map((dateAndTimes, i) => (
                <EventDateTime dateAndTimes={dateAndTimes} key={`time-${i}`} />
              ))}
            </ol>
          </Grid>
          <h3>for more information</h3>
          <Flex
            sx={{
              flexDirection: ['column', 'row'],
              a: { marginRight: 4 },
            }}
          >
            <span>
              <strong>call:</strong> <a href={`tel:+1${phone}`}>{phone}</a>
            </span>
            <span>
              <strong>email:</strong> <a href={`mailto:${email}`}>{email}</a>
            </span>
          </Flex>
          <Button
            sx={{ minWidth: 230, minHeight: 45, fontSize: 1 }}
            as={Link}
            href={link.path}
            variant="inverted"
            mt={6}
          >
            {link.text}
          </Button>
        </Box>
        <Flex
          sx={{
            width: ['100%', '100%', 350],
            justifyContent: 'stretch',
            flexDirection: 'column',
            marginBottom: '-75px',
          }}
          mt={[7, 7, 0]}
        >
          <Flex sx={{ flex: 1 }} px={5}>
            <GatsbyImage image={image.asset.gatsbyImageData} alt="" />
          </Flex>
          <Flex
            sx={{
              justifyContent: 'flex-end',
              transform: 'translateY(-45px)',
              height: 80,
            }}
          >
            <GatsbyImage
              id="badge"
              image={badge?.image.asset.gatsbyImageData}
              alt=""
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

const CommunityEventsPage = ({ data }) => (
  <Layout
    title="upcoming in-store events | discover bluboho refined jewelry"
    description="discover upcoming events and workshops at bluboho. be the first to preview new collections, celebrate special moments, and engage in hands-on experiences. join the bluboho community for a day of creativity, inspiration, and connection. discover the latest in fine jewelry and immerse yourself in the magic of bluboho."
  >
    <Banner height={450}>
      <StaticImage
        className="desktop"
        src="../images/events/header-lg.webp"
        alt=""
        placeholder="blurred"
      />
      <StaticImage
        className="mobile"
        src="../images/events/header-sm.webp"
        alt=""
        placeholder="blurred"
      />
    </Banner>
    <Heading
      as="h1"
      variant="h2"
      sx={{
        textAlign: 'center',
        fontSize: [6, 7],
        color: 'white',
        transform: 'translateY(-285px)',
        height: 0,
      }}
    >
      community
      <br /> events
    </Heading>
    <Box sx={{ minHeight: '50vh' }}>
      {data.allSanityEvent.nodes.map((details, i) => (
        <Event details={details} index={i} key={`event-${i}`} />
      ))}
    </Box>
  </Layout>
)

export default CommunityEventsPage

export const query = graphql`
  query ($today: Date!) {
    allSanityEvent(
      filter: { dates: { elemMatch: { date: { gte: $today } } } }
      sort: { fields: dates___date, order: ASC }
    ) {
      nodes {
        badge {
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 75)
            }
          }
        }
        city
        dates {
          date
          endTime
          startTime
        }
        description
        email
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, height: 430)
          }
        }
        inStore
        link {
          path
          text
        }
        location {
          city
          province
          phone
          email
          street
        }
        phone
        province
        street
        title
      }
    }
  }
`
