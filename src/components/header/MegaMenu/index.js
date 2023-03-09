import React, { useMemo, useState } from 'react'
import { Box, Grid } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import { MegaMenuLink } from './links'
import { SubMenu } from './sub-menu'
import { getShopifyImage } from '../../../lib/get-shopify-image'

const MotionBox = motion(Box)

const MegaMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('')

  const data = useStaticQuery(graphql`
    {
      allSanityMegaMenu {
        nodes {
          groups {
            title
            subGroup {
              title
              links {
                text
                path
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
      allShopifyCollection(filter: { image: { src: { ne: null } } }) {
        nodes {
          handle
          image {
            src
            height
            width
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
  const megaMenu = data.allSanityMegaMenu.nodes[0].groups
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
            if (shopifyCollection) {
              const { image } = shopifyCollection
              const gatsbyImageData = getShopifyImage({
                image: {
                  ...image,
                  url: image.src,
                },
              })
              nextLink.image = gatsbyImageData
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
        display: ['none', 'none', 'flex'],
        alignSelf: 'stretch',
      }}
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
        {megaMenuWithImages.map(menu => (
          <MegaMenuLink
            aria-haspopup
            key={`${menu.title}-top-link`}
            isCurrent={menu.title === currentMenu}
            onMouseOver={() => {
              setMenuOpen(true)
              setCurrentMenu(menu.title)
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
              bg: 'white',
              position: 'absolute',
              left: 0,
              top: '100%',
              width: '100vw',
              borderBottom: '1px solid',
              borderTop: '1px solid',
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
