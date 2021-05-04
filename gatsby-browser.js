import UrqlProvider from './src/lib/urqlProvider'
import StoreProvider from './src/contexts/StoreContext'
import AuthProvider from './src/contexts/AuthContext'
import CurrencyProvider from './src/contexts/CurrencyContext'

export const wrapRootElement = ({ element }) => (
  <UrqlProvider>
    <CurrencyProvider>
      <StoreProvider>
        <AuthProvider>{element}</AuthProvider>
      </StoreProvider>
    </CurrencyProvider>
  </UrqlProvider>
)
