import UrqlProvider from './src/lib/urqlProvider'
import StoreProvider from './src/contexts/StoreContext'
import AuthProvider from './src/contexts/AuthContext'
import CurrencyProvider from './src/contexts/CurrencyContext'
import NewsletterProvider from './src/contexts/NewsletterContext'

export const wrapRootElement = ({ element }) => (
  <UrqlProvider>
    <CurrencyProvider>
      <StoreProvider>
        <AuthProvider>
          <NewsletterProvider>{element}</NewsletterProvider>
        </AuthProvider>
      </StoreProvider>
    </CurrencyProvider>
  </UrqlProvider>
)

// adapted from https://github.com/gatsbyjs/gatsby/issues/18866
let nextRoute = ``

export const onPreRouteUpdate = ({ location }) => {
  nextRoute = location.pathname
}

window.addEventListener('unhandledrejection', event => {
  if (/loading chunk \d* failed./i.test(event.reason)) {
    if (nextRoute) {
      window.location.pathname = nextRoute
    }
  }
})
