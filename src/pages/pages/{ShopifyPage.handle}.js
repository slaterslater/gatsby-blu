import React from 'react'
import { useQuery } from 'urql'
import { graphql } from 'gatsby'
import { useAnalytics } from '../../lib/useAnalytics'
import PageView from '../../views/PageView'
import { PAGE_QUERY } from '../../queries/page'

const PageTemplate = ({ data, path, pageContext: { handle } }) => {
  const [{ data: latestData }] = useQuery({
    query: PAGE_QUERY,
    variables: { handle },
  })

  const page = latestData?.pageByHandle || data.shopifyPage

  useAnalytics('viewPage')
  return (
    <PageView
      title={page.title}
      summary={page.bodySummary}
      body={page.body}
      currentPath={path}
    />
  )
}

export default PageTemplate

export const query = graphql`
  query Page($handle: String!) {
    shopifyPage(handle: { eq: $handle }) {
      title
      body
      handle
      bodySummary
    }
  }
`
