import { AnimatePresence, motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Link,
  Button,
} from 'theme-ui'
import { CgArrowLongRight, CgClose } from 'react-icons/cg'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Banner from '../components/content/Banner'

const MotionBox = motion(Box)

const Career = ({ position, isOpen, handleClick }) => {
  const { title, location, description, url, pdf } = position
  return (
    <Box
      as="li"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border',
      }}
    >
      <Grid
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          gridTemplateColumns: '1fr 16px',
          borderBottom: isOpen ? '1px solid' : null,
          borderColor: isOpen ? 'border' : null,
        }}
        py={3}
      >
        <Flex>
          <Text
            variant="caps"
            sx={{
              fontSize: 1,
              fontWeight: 'bold',
            }}
            pl={3}
          >
            {title}
          </Text>
          {!isOpen && (
            <Text
              variant="copy"
              sx={{
                display: ['none', 'block'],
                lineHeight: 'inherit',
                letterSpacing: 'widest',
              }}
            >{`: location, ${location}`}</Text>
          )}
        </Flex>
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
            <Flex
              pb={[6, 7]}
              px={3}
              sx={{
                flexDirection: 'column',
                alignItems: ['center', 'flex-start'],
              }}
            >
              {/* <Text
                as="p"
                pt={5}
                variant="copy"
                sx={{ fontWeight: 'body' }}
              >{`location: ${location}`}</Text> */}
              <Text
                variant="copy"
                as="p"
                sx={{
                  fontSize: 1,
                  width: '100%',
                  maxWidth: 595,
                  display: 'block',
                  textAlign: ['center', 'left'],
                  whiteSpace: 'pre-line',
                }}
                pt={5}
                pb={2}
              >
                {description}
              </Text>
              <Button
                as={Link}
                href={url || pdf.asset.url}
                target="_blank"
                title={`information regarding ${title}`}
                variant="link"
                sx={{
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontSize: 1,
                  fontWeight: 'bold',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                }}
                p={1}
              >
                view more
              </Button>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

Career.propTypes = {
  position: PropTypes.object,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
}

const CareersPage = () => {
  const [expanded, setExpanded] = useState(false)
  const data = useStaticQuery(graphql`
    {
      sanityCareer {
        positions {
          title
          location
          description
          url
          pdf {
            asset {
              url
            }
          }
        }
      }
    }
  `)
  const { positions } = data.sanityCareer
  return (
    <Layout
      title="careers"
      description="Come work for a high-growth company where you get to have a voice, make decisions, set goals and achieve them. We can't wait to meet you"
    >
      <Banner>
        <StaticImage
          src="../images/careers-header.webp"
          alt=""
          layout="fullWidth"
          placeholder="blurred"
        />
      </Banner>
      <Container sx={{ textAlign: 'center' }}>
        <Heading as="h1" variant="h2">
          Careers
        </Heading>
        <Text
          as="p"
          variant="copy"
          pt={[3, 6]}
          pb={[7, 8]}
          sx={{ maxWidth: 720 }}
          mx="auto"
        >
          bluboho is a growing community of collective creativity. we provide a
          space for connection, love and education. our purpose is to deliver an
          unforgettable experience through our stores, and all of our digital
          channels. we cultivate a team environment that is fun, and maximizes
          on development opportunities. we continually aspire to nurture an
          exchange where our creativity and culture coexist.
        </Text>
        {!!positions.length && (
          <>
            <Heading as="h2" variant="caps" sx={{ fontSize: 1 }} pb={[6, 6, 7]}>
              available positions
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
                textAlign: 'left',
              }}
              mx="auto"
              my={2}
            >
              {positions.map((position, i) => {
                const isOpen = i === expanded
                const handleClick = () => setExpanded(isOpen ? false : i)
                return (
                  <Career
                    key={position.id}
                    position={position}
                    isOpen={isOpen}
                    handleClick={handleClick}
                  />
                )
              })}
            </Box>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default CareersPage
