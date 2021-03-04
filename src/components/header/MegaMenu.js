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
      { path: '/shop/new-arrivals', text: 'New Arrivals' },
      { path: '/shop/best-sellers', text: 'Best Sellers' },
      { path: '/shop/last-chance', text: 'Last Chance' },
      { path: '/shop/revival', text: 'Revival' },
      { path: '/shop/imprint', text: 'Imprint' },
      { path: '/shop/tashi', text: 'Tashi Silver Jewelry' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { path: '/shop/all', text: 'Shop All' },
      { path: '/shop/rings', text: 'Rings' },
      { path: '/shop/earrings', text: 'Earrings' },
      { path: '/shop/necklaces', text: 'Necklaces' },
      { path: '/shop/bracelets', text: 'Bracelets' },
      { path: '/shop/engagement', text: 'Engagement' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { path: '/shop/wanderess', text: 'Wandress' },
      { path: '/shop/tie-dye', text: 'Tie Dye' },
      { path: '/shop/littles', text: 'Littles' },
      { path: '/shop/inseparable', text: 'Inseparable' },
      { path: '/shop/seedling', text: 'Seedling' },
      { path: '/shop/dhalia', text: 'Dhalia' },
    ],
  },
]

const giftMenus = [
  {
    title: 'Gift Guides',
    links: [
      { path: '/gift-guides/pisces-gift-guide', text: 'Pisces Gift Guide' },
      { path: '/gift-guides/gifts-under-1000', text: 'Gifts Under 1000$' },
      { path: '/gift-guides/gifts-under-500', text: 'Gifts Under 500$' },
      { path: '/gift-guides/gifts-under-300', text: 'Gifts Under 300$' },
      {
        path: '/gift-guides/gifts-to-personalize',
        text: 'Gifts To Personalize',
      },
      { path: '/products/gift-card', text: 'Gift Cards' },
    ],
  },
]

const storiesMenu = [
  {
    title: 'Stories',
    links: [
      { path: '/bride-stories', text: 'Bride Stories' },
      { path: '/blog', text: 'Style Blog' },
    ],
  },
]

const bluMenu = [
  {
    title: 'Everything Blu',
    links: [
      { path: '/info/about-us', text: 'Our Story' },
      { path: '/info/locations', text: 'Locations' },
    ],
  },
]

const menus = {
  shop: shopMenus,
  'gift-guides': giftMenus,
  'stories-menu': storiesMenu,
  'everything-blu-menu': bluMenu,
}

const MegaMenuLink = ({ children, path, menu }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(prev => !prev)
  const triggerRef = useRef()
  const rect = useRect(triggerRef, { observe: false })

  return (
    <HeaderLink
      to={path}
      sx={{ position: 'relative' }}
      onMouseEnter={toggleMenu}
      onMouseLeave={toggleMenu}
    >
      <Text
        as="span"
        ref={triggerRef}
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
      <AnimatePresence>
        {menuOpen && (
          <MotionBox
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            p={6}
            sx={{
              bg: 'white',
              position: 'absolute',
              left: rect ? -rect.x : 0,
              width: '100vw',
              borderBottom: '1px solid',
              borderColor: 'border',
            }}
          >
            <Flex>
              {menus[menu].map(list => (
                <Box mr={7}>
                  <Heading as="h4" pb={1}>
                    {list.title}
                  </Heading>
                  {list.links.map(link => (
                    <Box key={`dropdown-link-${link.path}-${link.text}`} py={1}>
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
    </HeaderLink>
  )
}

const MegaMenu = props => (
  <Grid
    pl={4}
    sx={{
      alignSelf: 'stretch',
      display: ['none', 'none', 'grid'],
      gap: 5,
      gridTemplateColumns: 'repeat(4, max-content)',
      alignItems: 'stretch',
    }}
  >
    <MegaMenuLink path="/shop/all" menu="shop">
      Shop
    </MegaMenuLink>
    <MegaMenuLink path="/gift-guides" menu="gift-guides">
      Gifts
    </MegaMenuLink>
    <MegaMenuLink path="/blog" menu="stories-menu">
      Stories
    </MegaMenuLink>
    <MegaMenuLink path="/about-us" menu="everything-blu-menu">
      Everything Blu
    </MegaMenuLink>
  </Grid>
)

export default MegaMenu
