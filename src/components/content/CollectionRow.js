import { GatsbyImage } from 'gatsby-plugin-image'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import React from 'react'
import CollectionSlider from '../CollectionSlider'
import { getGastbyImageDataWithOptions } from '../../lib/useGatsbySanityImageData'

const CollectionRow = ({ node: { collections } }) => (
  <CollectionSlider
    title="Modern Fine Jewelry"
    subtitle="handcrafted + ethically sourced"
    slides={collections.map(collection => {
      const image = getGastbyImageDataWithOptions(collection.image, { q: 85 })

      return {
        title: collection.name,
        to: collection.button.path,
        buttonLabel: collection.button.text,
        image,
      }
    })}
  />
)

export default CollectionRow
