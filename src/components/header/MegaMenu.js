import React, { useState } from 'react'
import { Flex, Button, Text, Box, Grid, Heading } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeLink from '../app/ThemeLink'

const MotionBox = motion(Box)

const HeaderLink = props => (
  <Button
    type="button"
    p={0}
    {...props}
    sx={{
      bg: 'transparent',
      color: 'gray',
      textTransform: 'uppercase',
      letterSpacing: 'caps',
      fontSize: 1,
      ...(props.sx || {}),
    }}
  />
)

export const megaMenu = {
  Shop: [
    {
      title: 'latest',
      links: [
        { path: '/collections/newarrivals', text: 'new arrivals' },
        { path: '/collections/best-sellers-1', text: 'best sellers' },
        {
          path: '/collections/maggies-favourite-pieces',
          text: "maggie's picks",
        },
        { path: '/collections/engraveables', text: 'engravables' },
      ],
    },
    {
      title: 'categories',
      links: [
        { path: '/collections/rings', text: 'rings' },
        { path: '/collections/necklaces', text: 'necklaces' },
        { path: '/collections/earrings', text: 'earrings' },
        { path: '/collections/bracelets', text: 'bracelets' },
        { path: '/all', text: 'Shop All' },
      ],
    },
    {
      title: 'collections',
      links: [
        { path: '/collections/stacking-rings', text: 'stacking rings' },
        { path: '/collections/amulets', text: 'amulets' },
        { path: '/collections/oceana-collection', text: 'oceana' },
        {
          path: '/collections/tree-of-life-collection-1',
          text: 'tree of life',
        },
        { path: '/collections/wanderess', text: 'wanderess' },
        { path: '/collections/tie-dye-collection-2', text: 'tie dye' },
        { path: '/collections/sweetness-collection', text: 'sweetness' },
        { path: '/collections/flower', text: 'flower' },
        { path: '/collections/the-revival-collection', text: 'revival' },
        { path: '/collections/littles-collection', text: 'littles' },
        {
          path: '/collections/one-of-a-kind-beloved-engagement-rings',
          text: 'one of a kind',
        },
      ],
    },
    {
      title: 'meaning',
      links: [
        { path: '/collections/strength', text: 'strength' },
        { path: '/collections/love', text: 'love' },
        { path: '/collections/achievement', text: 'achievement' },
        { path: '/collections/growth', text: 'growth' },
        { path: '/collections/wisdom', text: 'wisdom' },
      ],
    },
  ],
  Gifts: [
    {
      title: 'gift guides',
      links: [
        {
          path: '/collections/gifts-to-personalize',
          text: 'gifts to personalize',
        },
        { path: '/collections/gifts-under-1000', text: 'gifts under 1000$' },
        { path: '/collections/gifts-under-500', text: 'gifts under 500$' },
        { path: '/collections/gifts-under-300', text: 'gifts under 300$' },
        { path: '/collections/libra', text: 'libra' },
        { path: '/products/gift-card', text: 'gift cards' },
      ],
    },
  ],
  Engagement: [
    {
      title: 'engagement',
      links: [
        {
          path: '/collections/one-of-a-kind-beloved-engagement-rings',
          text: 'one of a kind engagement rings',
        },
        {
          path: '/collections/endless-beloved-engagement-rings',
          text: 'special occasion - endless beloved rings',
        },
        {
          path: '/collections/wedding-bands',
          text: 'wedding & celebrations bands',
        },
        {
          path: '/collections/bridal-jewelry',
          text: 'bridal jewelry',
        },
        {
          path: '/collections/bridesmaids-gifts',
          text: 'bridesmaid gifts',
        },
        { path: '/pages/bluboho-brides', text: 'testimonials' },
        { path: '/collections/bridal', text: 'view all' },
        { path: '/book-a-consultation', text: 'book a consultation' },
      ],
    },
  ],
  About: [
    {
      title: 'everything blu',
      links: [
        { path: '/pages/the-bluboho-origin-story', text: 'origin story' },
        { path: '/blogs/news', text: 'blog' },
        { path: '/pages/locations-and-hours', text: 'contact & locations' },
        {
          path: '/one-percent-for-the-planet',
          text: '1% for the Planet',
        },
      ],
    },
  ],
}

const MegaMenuLink = ({ children, path, ...props }) => (
  <HeaderLink to={path} sx={{ position: 'relative' }} {...props}>
    <Text
      as="span"
      variant="caps"
      sx={{
        color: 'black',
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
        fontSize: 0,
      }}
    >
      {children}
    </Text>
  </HeaderLink>
)

const MegaMenu = props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('')

  return (
    <Box
      sx={{
        position: 'relative',
        display: ['none', 'none', 'flex'],
        alignSelf: 'stretch',
      }}
      onMouseOver={() => setMenuOpen(true)}
      onMouseLeave={() => {
        setCurrentMenu(null)
        setMenuOpen(false)
      }}
    >
      <Grid
        pl={6}
        sx={{
          alignSelf: 'stretch',
          gap: 5,
          gridTemplateColumns: 'repeat(4, max-content)',
          alignItems: 'stretch',
        }}
      >
        {Object.keys(megaMenu).map(name => (
          <MegaMenuLink
            aria-haspopup
            key={`${name}-top-link`}
            onMouseOver={() => setCurrentMenu(name)}
          >
            {name}
          </MegaMenuLink>
        ))}
      </Grid>
      <AnimatePresence>
        {menuOpen && (
          <MotionBox
            initial={{ opacity: 0, x: -2 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -2 }}
            p={6}
            sx={{
              bg: 'white',
              position: 'absolute',
              left: 0,
              top: '100%',
              width: '100vw',
              borderBottom: '1px solid',
              borderColor: 'border',
            }}
          >
            <Flex>
              {currentMenu &&
                megaMenu[currentMenu].map(list => (
                  <Box mr={7} aria-expanded key={`${list.title}-box`}>
                    <Heading variant="h1" as="h4" pb={2} sx={{ fontSize: 1 }}>
                      {list.title}
                    </Heading>
                    {list.links.map(link => (
                      <Box
                        key={`dropdown-link-${link.path}-${link.text}`}
                        py={1}
                      >
                        <ThemeLink
                          to={link.path}
                          variant="nav"
                          sx={{ fontSize: 0, letterSpacing: 'wider' }}
                        >
                          {link.text}
                        </ThemeLink>
                      </Box>
                    ))}
                  </Box>
                ))}
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default MegaMenu
