import { graphql } from 'gatsby'
import React, { useEffect, useMemo, useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Box, Button, Container, Flex, Grid, Text } from 'theme-ui'
import { useLatestCollection } from '../hooks/collection'
import CollectionPageHeader from '../components/CollectionPageHeader'
import Layout from '../components/layout'
import { Breadcrumbs } from '../components/Breadcrumbs'
import CustomSetChoice from '../components/CustomSetChoice'
import { ThumbnailImage } from '../components/product/ListItem'
import FormattedPrice from '../components/FormattedPrice'

const CustomSetPage = ({ data }) => {
  const LIMIT = 7
  const [customSet, setCustomSet] = useState([])
  const { products, handle } = data.shopifyCollection
  const { collectionProducts } = useLatestCollection(handle, products)

  const availableProducts = useMemo(
    () =>
      collectionProducts.filter(({ availableForSale, tags }) => {
        const isMixable = !tags.some(tag => tag.match(/no-mixing/gi))
        return availableForSale && isMixable
      }),
    [collectionProducts]
  )
  const addToSet = product => {
    if (customSet.length === LIMIT) return
    setCustomSet(set => [...set, product])
  }

  // update customSet prices to reflect site currency
  useEffect(() => {
    if (!customSet.length) return
    const customSetWithUpdatedPrice = customSet.map(product => {
      const { thumb, metafields } = product
      const updateProduct = collectionProducts.find(
        ({ id }) => id === product.id
      )
      return {
        ...updateProduct,
        thumb,
        metafields,
      }
    })
    setCustomSet(customSetWithUpdatedPrice)
  }, [collectionProducts])

  return (
    <Layout
      title="earring mix &amp; match"
      description="experience the magic of mix & match earring pairs, where you can effortlessly transform your look and create enchanting combinations that reflect your one-of-a-kind charm"
    >
      <CollectionPageHeader
        title="mix &amp; match"
        // title="custom set"
        description="discover the art of mix & match earrings, where you can unleash your creativity and create unique pairings that express your individual style effortlessly"
      >
        <StaticImage
          src="../images/earring-mix-match-header.webp"
          alt=""
          placeholder="blurred"
          width={1000}
        />
      </CollectionPageHeader>
      <Breadcrumbs
        as={Container}
        mx="auto"
        links={[{ path: '/collections/earrings', text: 'earrings' }]}
        currentPage={{
          path: `/custom-set`,
          text: 'build a custom set',
        }}
      />
      <Box
        sx={{ textAlign: 'center', width: '100%', bg: 'prodBackground' }}
        py={3}
      >
        {/* <Heading as="h1" variant="h2" sx={{ fontSize: 3 }} my={3}>
          mix &amp; match
        </Heading> */}
        <Text sx={{ fontFamily: 'heading', letterSpacing: 'widest' }}>
          select to make your own set
        </Text>
      </Box>
      <CustomSetChoice customSet={customSet} setCustomSet={setCustomSet} />
      <Container pt={0}>
        <Grid
          as="section"
          sx={{
            gap: 3,
            gridTemplateColumns: [
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
              'repeat(6, 1fr)',
            ],
            // gridAutoRows: 'minmax(250px, auto)',
          }}
          pt={4}
        >
          {availableProducts.map(product => {
            const { metafields, priceRangeV2, title } = product
            const { images } = products.find(({ id }) => id === product.id)
            const thumb = images[images.length - 1] // last img is single piece
            const singleEarring = {
              ...product,
              metafields: metafields.filter(
                ({ key }) => key !== 'offers_pairs'
              ),
              thumb,
            }
            if (title.toUpperCase().includes('WISHBONE EARRINGS'))
              console.log(product.tags)
            singleEarring.priceRangeV2.maxVariantPrice.amount =
              singleEarring.priceRangeV2.minVariantPrice.amount

            const isSelected = customSet.some(({ id }) => id === product.id)

            return (
              <Box
                key={product.id}
                sx={{
                  '.gatsby-image-wrapper': {
                    border: '2px solid',
                    borderBottom: 'none',
                    borderColor: isSelected ? 'cream' : 'prodBackground',
                  },
                }}
                onClick={() => addToSet(singleEarring)}
              >
                <Box
                  as="article"
                  sx={{ position: 'relative', zIndex: 1 }}
                  pb={[5, 6]}
                >
                  <Flex
                    sx={{
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <ThumbnailImage image={thumb} fallbackAlt="" />
                    <Button
                      aria-label={`add ${product.title} to set`}
                      variant="inverted"
                      sx={{
                        width: '100%',
                        bg: 'cream',
                        cursor: 'pointer',
                        zIndex: 3,
                        position: 'relative',
                        border: 'none',
                      }}
                      py={1}
                      mx="auto"
                    >
                      add
                    </Button>
                    <Flex
                      pt={2}
                      sx={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'space-between',
                      }}
                    >
                      <Flex pt={2} sx={{ justifyContent: 'center' }}>
                        <Text
                          as="p"
                          variant="caps"
                          sx={{
                            fontWeight: 600,
                            color: '#454545',
                          }}
                        >
                          <FormattedPrice
                            priceV2={priceRangeV2.minVariantPrice}
                          />
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            )
          })}
        </Grid>
      </Container>
    </Layout>
  )
}

export default CustomSetPage

export const query = graphql`
  {
    shopifyCollection(handle: { eq: "earrings" }) {
      handle
      products {
        # availableForSale ADDED TO VARIANTS
        id: shopifyId
        handle
        title
        vendor
        #images {
        #  gatsbyImageData(placeholder: BLURRED, width: 360)
        #}
        media {
          ... on ShopifyMediaImage {
            image {
              gatsbyImageData(placeholder: BLURRED, width: 360)
            }
          }
        }
        tags
        metafields {
          key
          value
          updatedAt
        }
        variants {
          id
          availableForSale
          price
        }
        priceRangeV2 {
          minVariantPrice {
            currencyCode
            amount
          }
          maxVariantPrice {
            currencyCode
            amount
          }
        }
      }
    }
  }
`
