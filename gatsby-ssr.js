/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
//
import React from 'react'

export const onRenderBody = ({ setHeadComponents }) => {
  const tidioId = process.env.GATSBY_TIDIO_KEY
  const source = `//code.tidio.co/${tidioId}.js`

  //   if (process.env.NODE_ENV === 'development') {
  //     console.log(
  //       '"development" is set to false - gatsby-tidio-chat will not load in development mode'
  //     )
  //     return null
  //   }

  if (!tidioId) {
    console.log(
      'No Tidio key provided! gatsby-tidio-chat will not load. Please add tidioId to environment'
    )
    return null
  }

  return setHeadComponents([
    <script defer key="gatsby-plugin-tidio" src={source} />,
  ])
}
