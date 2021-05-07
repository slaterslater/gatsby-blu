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
