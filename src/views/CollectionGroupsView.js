import React, { useMemo } from 'react'
import { useLocation } from '@reach/router'
import { Container, Grid, Box } from 'theme-ui'
import { parse } from 'qs'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import CollectionProductGroup from '../components/CollectionProductGroup'
import { sortProducts } from '../components/collection/CollectionProductGrid'
import CollectionProduct from '../components/CollectionProduct'
import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'
import CollectionPageHeader from '../components/CollectionPageHeader'
import SEO from '../components/seo'
import { useLatestCollection } from '../hooks/collection'
import { useShopifyImage } from '../hooks/shopifyImage'

const sortCollections = (nodes, arr) =>
  nodes.sort((a, b) => arr.indexOf(a.handle) - arr.indexOf(b.handle))

const CollectionImage = ({ image, height }) => {
  const imageData = useShopifyImage({
    image,
    width: 715,
    height,
  })
  return <GatsbyImage image={imageData} alt="" />
}

// there's likely a better way...
const collectionImageOrder = (index, i) => {
  const base = i * 5
  let n
  if (index % 2) {
    n = (i + 1) % 4
    return base + n
  }
  n = i % 4
  const x = n ? n + 1 : 5
  return base + x - 2
}

const CollectionGroup = ({
  pagePath,
  pageTitle,
  handle,
  title,
  description,
  consultation,
  products,
  index = 0,
  ...props
}) => {
  const { collectionProducts, collectionImages } = useLatestCollection(
    handle,
    products
  )

  // product length minus 2 because of the title/description/button
  const prodLen = collectionProducts - 2
  // determine max num of images to show based on sortedProducts length
  // calculate order to insert images into product grid
  const orderedImages = useMemo(() => {
    const colImgLen = collectionImages?.length
    if (!colImgLen) return []
    let imageNum = Math.floor(prodLen / 10) * 2
    if ([8, 9].some(n => n === prodLen % 10)) imageNum += 1
    imageNum = colImgLen > imageNum ? imageNum : colImgLen
    return Array.from({ length: imageNum }).map((_, i) => ({
      ...collectionImages[i],
      order: collectionImageOrder(index, i),
    }))
  }, [prodLen, collectionImages, index])

  return (
    <CollectionProductGroup
      title={title}
      description={description}
      consultation={consultation}
      products={products}
      pt={6}
      pb={6}
      {...props}
    >
      {collectionProducts.map((product, i) => (
        <Box key={product.id} sx={{ order: i }}>
          <CollectionProduct
            product={product}
            images={product.images}
            collectionTitle={pageTitle}
            collectionPath={pagePath}
          />
        </Box>
      ))}
      {orderedImages.map((image, i) => (
        <Box
          key={`collection-image-${i}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            order: image.order,
            gridColumn: 'span 2',
            gridRow: i % 2 ? '' : 'span 2',
            flexGrow: 0,
          }}
        >
          <CollectionImage image={image} height={i % 2 ? 445 : 900} />
        </Box>
      ))}
    </CollectionProductGroup>
  )
}

const CollectionGroupsView = ({
  pageTitle,
  pageDescription,
  consultation,
  pagePath,
  collectionOrder,
  collections,
  seoGatsbyImage,
  headerImage,
}) => {
  const location = useLocation()
  const currentParams = parse(location.search.replace('?', ''))

  const sortedCollections = sortCollections(collections, collectionOrder)
  const allProducts = collections.flatMap(node => node.products)

  const sortedProducts = currentParams.sort
    ? sortProducts({ products: allProducts, sort: currentParams.sort })
    : null

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        gatsbyImage={seoGatsbyImage}
      />
      <CollectionPageHeader
        title={pageTitle}
        description={pageDescription}
        image={headerImage}
      />
      <Container pt={0} as="main">
        <CollectionFilterAndSort
          title={pageTitle}
          productCount={allProducts.length}
        />
        <Grid>
          {!sortedProducts &&
            sortedCollections.map((collection, i) => (
              <CollectionGroup
                key={collection.title}
                pageTitle={pageTitle}
                pagePath={pagePath}
                index={i}
                consultation={consultation}
                {...collection}
              />
            ))}
          {sortedProducts && (
            <CollectionGroup
              pageTitle={pageTitle}
              pagePath={pagePath}
              title=""
              description=""
              products={sortedProducts}
            />
          )}
        </Grid>
      </Container>
    </Layout>
  )
}

export default CollectionGroupsView
