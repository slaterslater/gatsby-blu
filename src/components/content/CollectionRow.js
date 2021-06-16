import { GatsbyImage } from 'gatsby-plugin-image'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import React from 'react'
import CollectionSlider from '../CollectionSlider'
import sanityConfig from '../../lib/sanityConfig'

const CollectionRow = ({ node: { collections } }) => (
  <CollectionSlider
    title="Modern Fine Jewelry"
    subtitle="handcrafted + ethically sourced"
    slides={collections.map(collection => {
      // const image = getGatsbyImageData(collection.image.asset._ref)
      // debugger
      // const imageData =
      const image = getGatsbyImageData(collection.image, {}, sanityConfig)

      return {
        title: collection.collectionName,
        to: collection.button.path,
        buttonLabel: collection.button.text,
        image,
      }
    })}
  />
)

export default CollectionRow
