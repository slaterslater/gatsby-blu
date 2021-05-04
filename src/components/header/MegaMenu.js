import React, { useState, useRef } from 'react'
import { Flex, Button, Text, Box, Image, Link, Grid, Heading } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { AnimatePresence } from 'framer-motion'
import { useRect } from '@reach/rect'
import MotionBox from '../util/MotionBox'

const HeaderLink = props => (
  <Link
    variant="nav"
    as={GatsbyLink}
    sx={{
      color: 'gray',
      textTransform: 'uppercase',
      letterSpacing: 'caps',
      fontSize: 1,
      ...(props.sx || {}),
    }}
    {...props}
  />
)

const shopMenus = [
  {
    title: 'Latest',
    links: [
      { path: '/collections/newarrivals', text: 'New Arrivals' },
      { path: '/collections/best-sellers', text: 'Best Sellers' },
      { path: '/collections/last-chance', text: 'Last Chance' },
      { path: '/collections/the-revival-collection', text: 'Revival' },
      { path: '/collections/imprint-collection', text: 'Imprint' },
      { path: '/collections/tashi', text: 'Tashi Silver Jewelry' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { path: '/collections/all', text: 'Shop All' },
      { path: '/collections/rings', text: 'Rings' },
      { path: '/collections/earrings', text: 'Earrings' },
      { path: '/collections/necklaces', text: 'Necklaces' },
      { path: '/collections/bracelets', text: 'Bracelets' },
      { path: '/collections/bridal', text: 'Engagement' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { path: '/collections/wanderess', text: 'Wandress' },
      { path: '/collections/tie-dye', text: 'Tie Dye' },
      { path: '/collections/littles', text: 'Littles' },
      { path: '/collections/inseparable', text: 'Inseparable' },
      { path: '/collections/seedling', text: 'Seedling' },
      { path: '/collections/dhalia', text: 'Dhalia' },
    ],
  },
]

const giftMenus = [
  {
    title: 'Gift Guides',
    links: [
      { path: '/collections/pisces-gift-guide', text: 'Pisces Gift Guide' },
      { path: '/collections/gifts-under-1000', text: 'Gifts Under 1000$' },
      { path: '/collections/gifts-under-500', text: 'Gifts Under 500$' },
      { path: '/collections/gifts-under-300', text: 'Gifts Under 300$' },
      {
        path: '/collections/gifts-to-personalize',
        text: 'Gifts To Personalize',
      },
      { path: '/products/gift-card', text: 'Gift Cards' },
    ],
  },
]

const bluMenu = [
  {
    title: 'Everything Blu',
    links: [
      { path: '/pages/about-us', text: 'Our Story' },
      { path: '/pages/locations', text: 'Locations' },
    ],
  },
  {
    title: 'Stories',
    links: [
      { path: '/bride-stories', text: 'Bride Stories' },
      { path: '/blog', text: 'Style Blog' },
    ],
  },
]

export const menus = {
  shop: shopMenus,
  'gift-guides': giftMenus,
  'everything-blu-menu': bluMenu,
}

const MegaMenuLink = ({ children, path, onSetMenu }) => (
  <HeaderLink
    to={path}
    sx={{ position: 'relative' }}
    onMouseEnter={onSetMenu}
    onMouseLeave={onSetMenu}
  >
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
      onMouseLeave={() => setMenuOpen(false)}
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
        <MegaMenuLink
          path="/collections/all"
          onSetMenu={() => setCurrentMenu('shop')}
        >
          Shop
        </MegaMenuLink>
        <MegaMenuLink
          path="/gift-guides"
          onSetMenu={() => setCurrentMenu('gift-guides')}
        >
          Gifts
        </MegaMenuLink>
        <MegaMenuLink
          path="/about-us"
          onSetMenu={() => setCurrentMenu('everything-blu-menu')}
        >
          Everything Blu
        </MegaMenuLink>
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
                menus[currentMenu].map(list => (
                  <Box mr={7}>
                    <Heading as="h4" pb={1}>
                      {list.title}
                    </Heading>
                    {list.links.map(link => (
                      <Box
                        key={`dropdown-link-${link.path}-${link.text}`}
                        py={1}
                      >
                        <Link
                          as={GatsbyLink}
                          to={link.path}
                          variant="nav"
                          sx={{ fontSize: 1 }}
                        >
                          {link.text}
                        </Link>
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
