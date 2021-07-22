import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import Hero from './content/Hero'
import CollectionRow from './content/CollectionRow'

const serializers = {
  types: {
    collectionRow: props => <CollectionRow {...props} />,
    hero: props => <Hero {...props} />,
  },
}

const SanityContent = ({ rawContent }) => (
  <BlockContent blocks={rawContent} serializers={serializers} />
)
// rawContent.map(object => (
//   <React.Fragment key={object._key}>{renderContent(object)}</React.Fragment>
// ))

export default SanityContent
