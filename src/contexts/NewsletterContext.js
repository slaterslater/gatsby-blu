import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  createContext,
} from 'react'
import { useQuery } from 'urql'
import { CUSTOMER_QUERY } from '../queries/customer'
import { AuthContext } from './AuthContext'

const STORAGE_IS_SUBSCRIBED = 'isSubscribed'
const STORAGE_DISMISSED_NEWSLETTER_PROMPT = 'dismissedPrompt'

const initialValues = {
  isSubscribed: false,
  subscribe: () => {},
  shouldPrompt: undefined,
  dismissPrompt: () => {},
}

export const NewsletterContext = createContext(initialValues)

const NewsletterProvider = props => {
  const { customerAccessToken } = useContext(AuthContext)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [hasDismissed, setHasDismissed] = useState()

  const [{ data }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken },
    pause: !!customerAccessToken,
  })

  const subscribed = localStorage.getItem(STORAGE_IS_SUBSCRIBED)
  const { acceptsMarketing } = data?.customer || {}

  useEffect(() => {
    if ((acceptsMarketing || subscribed) && !isSubscribed) {
      setIsSubscribed(true)
    }
  }, [acceptsMarketing, subscribed, isSubscribed])

  const subscribe = useCallback(() => {
    setIsSubscribed(true)
    localStorage.setItem(STORAGE_IS_SUBSCRIBED, true)
  }, [setIsSubscribed])

  const dismissPrompt = useCallback(() => {
    localStorage.setItem(STORAGE_DISMISSED_NEWSLETTER_PROMPT, true)
    setHasDismissed(true)
  }, [setHasDismissed])

  useEffect(() => {
    setHasDismissed(!!localStorage.getItem(STORAGE_DISMISSED_NEWSLETTER_PROMPT))
  }, [])

  return (
    <NewsletterContext.Provider
      value={{
        isSubscribed,
        subscribe,
        shouldPrompt: !hasDismissed,
        dismissPrompt,
      }}
      {...props}
    />
  )
}

export default NewsletterProvider
