import { useMemo } from 'react'

export function useShopifyAdminId(hashedId = '') {
  return useMemo(() => atob(hashedId), [hashedId])
}

export function useShopifyAdminIdNumber(hashedId = '') {
  const adminId = useShopifyAdminId(hashedId)
  return useMemo(() => {
    const [adminNumber] = adminId.split('/').slice(-1)
    return adminNumber
  }, [adminId])
}
