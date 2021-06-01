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
      title: 'Latest',
      links: [
        { path: '/collections/newarrivals', text: 'New Arrivals' },
        { path: '/collections/best-sellers-1', text: 'Best Sellers' },
        {
          path: '/collections/maggies-favourite-pieces',
          text: "Maggie's Picks",
        },
        { path: '/collections/engraveables', text: 'Engravables' },
      ],
    },
    {
      title: 'Categories',
      links: [
        { path: '/collections/rings', text: 'Rings' },
        { path: '/collections/necklaces', text: 'Necklaces' },
        { path: '/collections/earrings', text: 'Earrings' },
        { path: '/collections/bracelets', text: 'Bracelets' },
        { path: '/all', text: 'Shop All' },
      ],
    },
    {
      title: 'Collections',
      links: [
        {
          path: '/collections/tree-of-life-collection-1',
          text: 'Tree of Life',
        },
        { path: '/collections/wanderess', text: 'Wanderess' },
        { path: '/collections/tie-dye-collection-2', text: 'Tie Dye' },
        { path: '/collections/sweetness-collection', text: 'Sweetness' },
        { path: '/collections/the-revival-collection', text: 'Revival' },
        { path: '/collections/littles-collection', text: 'Littles' },
        { path: '/collections/inseparable-collection', text: 'Inseparable' },
      ],
    },
    {
      title: 'Meaning',
      links: [
        { path: '/collections/strength', text: 'Strength' },
        { path: '/collections/love', text: 'Love' },
        { path: '/collections/achievement', text: 'Achievement' },
        { path: '/collections/growth', text: 'Growth' },
        { path: '/collections/wisdom', text: 'Wisdom' },
      ],
    },
  ],
  Gifts: [
    {
      title: 'Gift Guides',
      links: [
        {
          path: '/collections/gifts-to-personalize',
          text: 'Gifts To Personalize',
        },
        { path: '/collections/gifts-under-1000', text: 'Gifts Under 1000$' },
        { path: '/collections/gifts-under-500', text: 'Gifts Under 500$' },
        { path: '/collections/gifts-under-300', text: 'Gifts Under 300$' },
        { path: '/products/gift-card', text: 'Gift Cards' },
      ],
    },
  ],
  Engagement: [
    {
      title: 'Engagement',
      links: [
        {
          path: '/collections/one-of-a-kind-engagement-rings',
          text: 'One of a Kind Engagement Rings',
        },
        {
          path: '/collections/endless-beloved-engagement-rings',
          text: 'Special Occasion - Endless Beloved Rings',
        },
        {
          path: '/collections/wedding-bands',
          text: 'Wedding & Celebrations Bands',
        },
        { path: '/pages/bluboho-brides', text: 'Testimonials' },
        { path: '/collections/bridal', text: 'View All' },
        { path: '/book-a-consultation', text: 'Book a Virtual Visit' },
      ],
    },
  ],
  About: [
    {
      title: 'Everything Blu',
      links: [
        { path: '/pages/the-bluboho-origin-story', text: 'Origin Story' },
        { path: '/blogs/news', text: 'Blog' },
        { path: '/pages/locations-and-hours', label: 'contact & locations' },
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
        display: 'inline-flex',
        alignItems: 'center',
        height: '100%',
        color: 'gray',
        fontSize: 1,
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
        pl={4}
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
                    <Heading as="h4" pb={1} sx={{ textTransform: 'lowercase' }}>
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
                          sx={{ fontSize: 1, textTransform: 'lowercase' }}
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
