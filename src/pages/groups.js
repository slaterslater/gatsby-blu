import React from 'react'
import { graphql } from 'gatsby'

const ComponentName = ({ data }) => (
  <div>
    {data.allShopifyProduct.group.map(group => (
      <div>
        <div>{group.fieldValue}</div>
        <div>{group.totalCount}</div>

        <pre>{group.nodes.map(node => node.handle).toString()}</pre>
      </div>
    ))}
  </div>
)

export const query = graphql`
  {
    allShopifyProduct(filter: { availableForSale: { eq: false } }) {
      group(field: productType) {
        totalCount
        fieldValue
        nodes {
          handle
        }
      }
    }
  }
`

export default ComponentName
