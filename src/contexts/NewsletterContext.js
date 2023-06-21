import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  createContext,
} from 'react'
import { useQuery } from 'urql'
import store from 'store'
import { CUSTOMER_QUERY } from '../queries/customer'
import { AuthContext } from './AuthContext'

const STORAGE_IS_SUBSCRIBED = 'isSubscribed'
const STORAGE_DISMISSED_NEWSLETTER_PROMPT = 'dismissedPrompt'
const STORAGE_DISMISSED_BELOVED_NEWSLETTER_PROMPT = 'dismissedBelovedPrompt'

const initialValues = {
  isSubscribed: false,
  subscribe: () => {},
  shouldPrompt: undefined,
  dismissPrompt: () => {},
  dismissBelovedPrompt: () => {},
  shouldPromptBeloved: undefined,
}

export const NewsletterContext = createContext(initialValues)

const NewsletterProvider = props => {
  const { accessToken } = useContext(AuthContext)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [hasDismissed, setHasDismissed] = useState(false)
  const [hasDismissedBeloved, setHasDismissedBeloved] = useState()

  const [{ data }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
    // pause: !!customerAccessToken,
  })

  const subscribed = store.get(STORAGE_IS_SUBSCRIBED)
  const { acceptsMarketing } = data?.customer || {}

  useEffect(() => {
    if ((acceptsMarketing || subscribed) && !isSubscribed) {
      setIsSubscribed(true)
    }
  }, [acceptsMarketing, subscribed, isSubscribed])

  const subscribe = useCallback(() => {
    setIsSubscribed(true)
    store.set(STORAGE_IS_SUBSCRIBED, true)
  }, [setIsSubscribed])

  const dismissPrompt = useCallback(() => {
    store.set(STORAGE_DISMISSED_NEWSLETTER_PROMPT, true)
    setHasDismissed(true)
  }, [setHasDismissed])

  const dismissBelovedPrompt = useCallback(() => {
    store.set(STORAGE_DISMISSED_BELOVED_NEWSLETTER_PROMPT, true)
    setHasDismissedBeloved(true)
  }, [setHasDismissedBeloved])

  useEffect(() => {
    setHasDismissed(!!store.get(STORAGE_DISMISSED_NEWSLETTER_PROMPT))
    setHasDismissedBeloved(
      !!store.get(STORAGE_DISMISSED_BELOVED_NEWSLETTER_PROMPT)
    )
  }, [])

  return (
    <NewsletterContext.Provider
      value={{
        isSubscribed,
        subscribe,
        shouldPrompt: isSubscribed ? false : !hasDismissed,
        dismissPrompt,
        dismissBelovedPrompt,
        shouldPromptBeloved: isSubscribed ? false : !hasDismissedBeloved,
      }}
      {...props}
    />
  )
}

export default NewsletterProvider
