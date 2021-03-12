import Provider from './src/lib/urqlProvider'
import StoreProvider from './src/contexts/StoreContext'

export const wrapRootElement = ({ element }) => (
  <StoreProvider>
    <Provider element={element} />
  </StoreProvider>
)
