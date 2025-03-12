import React, { useMemo, useState } from 'react'
import { Box, Grid } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { useStaticQuery, graphql } from 'gatsby'
import { MegaMenuLink } from './links'
import { SubMenu } from './sub-menu'
import { usePageContext } from '../../../contexts/PageContext'

const MotionBox = motion.create(Box)

const MegaMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('')
  const { isBeloved } = usePageContext()

  const data = useStaticQuery(graphql`
    {
      allSanityMegaMenu(sort: {_createdAt: ASC}) {
        nodes {
          groups {
            title
            path
            subGroup {
              title
              links {
                text
                path
                isHighlighted
              }
            }
            navFeature {
              title
              link {
                path
              }
              image {
                asset {
                  gatsbyImageData(placeholder: BLURRED, height: 280)
                }
              }
            }
            navFeature2 {
              title
              link {
                path
              }
              image {
                asset {
                  gatsbyImageData(placeholder: BLURRED, height: 280)
                }
              }
            }
          }
        }
      }
      allShopifyCollection(filter: { image: { originalSrc: { ne: null } } }) {
        nodes {
          handle
          image {
            gatsbyImageData(placeholder: BLURRED, height: 500)
          }
        }
      }
      allSanityCard {
        nodes {
          collectionHandle
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, height: 280)
            }
          }
        }
      }
      allSanityCollectionGroupPage {
        nodes {
          slug {
            current
          }
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, height: 280)
            }
          }
        }
      }
    }
  `)

  const menuOption = isBeloved ? 1 : 0 // based on date created...

  const megaMenu = data.allSanityMegaMenu.nodes[menuOption].groups
  const collections = data.allShopifyCollection.nodes
  const cards = data.allSanityCard.nodes
  const groupPages = data.allSanityCollectionGroupPage.nodes

  const megaMenuWithImages = useMemo(
    () =>
      megaMenu.map(menu => ({
        ...menu,
        subGroup: menu.subGroup.map(group => ({
          ...group,
          links: group.links.map(link => {
            const nextLink = link
            const handle = link.path?.replace(/\/|collections/g, '')
            const shopifyCollection = collections.find(
              collection => collection.handle === handle
            )
            const groupPage = groupPages.find(
              page => page.slug.current === handle
            )
            const card = cards.find(card => card.collectionHandle === handle)
            // switch?
            if (shopifyCollection) {
              nextLink.image = shopifyCollection.image.gatsbyImageData
            }
            if (groupPage) {
              nextLink.image = groupPage.image?.asset.gatsbyImageData
            }
            if (card) {
              nextLink.image = card.image.asset.gatsbyImageData
            }
            return nextLink
          }),
        })),
      })),
    [megaMenu, collections, cards, groupPages]
  )

  return (
    <Box
      sx={{
        display: ['none', 'none', 'none', 'flex'], // collapse into nav drawer because too many menus
        alignSelf: 'stretch',
      }}
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
          gridTemplateColumns: `repeat(${megaMenu.length}, max-content)`,
          alignItems: 'stretch',
        }}
      >
        {megaMenuWithImages.map(menu => (
          <MegaMenuLink
            color={isBeloved ? 'white' : 'black'}
            aria-haspopup
            key={`${menu.title}-top-link`}
            isCurrent={menu.title === currentMenu}
            path={menu.path}
            onMouseOver={() => {
              setMenuOpen(true)
              setCurrentMenu(menu.title)
              if (menu.path) setMenuOpen(false)
            }}
          >
            {menu.title}
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
              bg: isBeloved ? 'bbBackground' : 'white',
              position: 'absolute',
              left: 0,
              top: '100%',
              width: '100vw',
              borderBottom: '1px solid',
              borderTop: '1px solid',
              // borderColor: 'black',
              borderColor: 'border',
            }}
          >
            {currentMenu &&
              megaMenu.map(menu => {
                if (menu.title !== currentMenu) return false
                return <SubMenu key={`${menu.title}-menu`} menu={menu} />
              })}
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default MegaMenu
