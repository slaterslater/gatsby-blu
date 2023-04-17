import React, { createContext, useContext, useState } from 'react'

const PageContext = createContext(null)
const usePageContext = () => useContext(PageContext)

const PageProvider = props => {
  const [isBeloved, setIsBeloved] = useState(props.isBeloved || false)

  return (
    <PageContext.Provider value={{ isBeloved, setIsBeloved }}>
      {props.children}
    </PageContext.Provider>
  )
}

export { PageProvider, usePageContext }
