import { useEffect } from 'react'

export const usePinEvent = (name, payload) => {
  if (window.pintrk) {
    return () => window.pintrk(name, payload)
  }
  return false
}

export const usePinEffect = (eventName, payload) => {
  useEffect(() => {
    if (window.pintrk) {
      window.pintrk('event', eventName, payload)
    }
  }, [])
}
