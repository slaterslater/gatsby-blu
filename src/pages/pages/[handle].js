import React from 'react'
import { useQuery } from 'urql'
import { graphql } from 'gatsby'
import { useMatch } from '@reach/router'
import { useAnalytics } from '../../lib/useAnalytics'
import PageView from '../../views/PageView'
import { PAGE_QUERY } from '../../queries/page'
import Layout from '../../components/layout'

const PageTemplate = ({ path }) => {
  const { handle } = useMatch('/pages/:handle')
  const [{ data }] = useQuery({
    query: PAGE_QUERY,
    variables: { handle },
  })

  const { page } = data || {}

  useAnalytics('viewPage')
  if (!page) return <Layout />
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

// export const query = graphql`
//   query Page($handle: String!) {
//     shopifyPage(handle: { eq: $handle }) {
//       title
//       body
//       handle
//       bodySummary
//     }
//   }
// `
