import UrqlProvider from './src/lib/urqlProvider'
import StoreProvider from './src/contexts/StoreContext'
import AuthProvider from './src/contexts/AuthContext'

export const wrapRootElement = ({ element }) => (
  <StoreProvider>
    <UrqlProvider>
      <AuthProvider>{element}</AuthProvider>
    </UrqlProvider>
  </StoreProvider>
)
