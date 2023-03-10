import React, { useState } from 'react'
import { Image, Grid, Box, Flex, Heading } from 'theme-ui'
import ThemeLink from '../../app/ThemeLink'
import BelovedSignupModal from './BelovedSignupModal'

const FeatureImage = ({ gatsbyImageData, alt, path = null, min = 0 }) => {
  if (!gatsbyImageData) return <></>
  const Img = (
    <Image
      {...gatsbyImageData.images.fallback}
      sx={{
        objectFit: 'cover',
        flex: 1,
        height: '100%',
        maxHeight: '280px',
        minWidth: min,
      }}
      alt={alt}
    />
  )
  if (!path)
    return <Box sx={{ display: 'flex', alignItems: 'stretch' }}>{Img}</Box>
  return (
    <ThemeLink to={path} sx={{ display: 'flex', alignItems: 'stretch' }}>
      {Img}
    </ThemeLink>
  )
}

const FeatureBox = ({ title, feature1, feature2, hoverImage }) => {
  if (feature2) {
    return (
      <Grid
        sx={{
          alignSelf: 'stretch',
          gap: 5,
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          maxWidth: '75%',
          maxHeight: '300px',
          alignItems: 'stretch',
        }}
        ml="auto"
      >
        {hoverImage ? (
          <FeatureImage gatsbyImageData={hoverImage.src} alt={hoverImage.alt} />
        ) : (
          <FeatureImage
            path={feature2.link?.path}
            gatsbyImageData={feature2.image?.asset.gatsbyImageData}
            alt={feature2.title || `${title} Feature #2`}
            min="50%"
          />
        )}
        <FeatureImage
          path={feature1?.link?.path}
          gatsbyImageData={feature1?.image?.asset.gatsbyImageData}
          alt={feature1?.title || `${title} Feature #1`}
          min="50%"
        />
      </Grid>
    )
  }
  return (
    <Flex
      sx={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        height: '280px',
      }}
    >
      {hoverImage ? (
        <FeatureImage gatsbyImageData={hoverImage.src} alt={hoverImage.alt} />
      ) : (
        <FeatureImage
          path={feature1?.link?.path}
          gatsbyImageData={feature1?.image?.asset.gatsbyImageData}
          alt={feature1?.title || `${title} Feature #1`}
        />
      )}
    </Flex>
  )
}

export const SubMenu = ({ menu }) => {
  const [hoverImage, setHoverImage] = useState(null)
  return (
    <Flex>
      {menu.subGroup.map(list => (
        <Box
          as="nav"
          mr={7}
          aria-expanded
          key={`${list.title}-box`}
          sx={{ minWidth: '100px' }}
        >
          <Heading
            variant="caps"
            as="h4"
            pb={4}
            sx={{ fontSize: 0, fontFamily: 'body' /* whiteSpace: 'nowrap' */ }}
          >
            {list.title}
          </Heading>
          <Box
            as="ul"
            sx={{
              listStyleType: 'none',
              padding: 0,
              'li > *': {
                fontSize: 0,
                letterSpacing: 'wider',
                whiteSpace: 'nowrap',
                display: 'block',
                paddingTop: 2,
                paddingBottom: 2,
              },
            }}
          >
            {list.links.map(link => (
              <Box
                as="li"
                key={`dropdown-link-${link.path}-${link.text}`}
                onMouseEnter={() => {
                  if (!link.image) return
                  setHoverImage({ src: link.image, alt: link.text })
                }}
                onMouseLeave={() => setHoverImage(null)}
              >
                <ThemeLink to={link.path} variant="nav">
                  {link.text}
                </ThemeLink>
              </Box>
            ))}
            {list.title.trim() === 'how to buy an engagement ring' && (
              <Box as="li">
                <BelovedSignupModal />
              </Box>
            )}
          </Box>
        </Box>
      ))}
      <FeatureBox
        title={menu.title}
        feature1={menu.navFeature}
        feature2={menu.navFeature2}
        hoverImage={hoverImage}
      />
    </Flex>
  )
}
