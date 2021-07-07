import { useEffect } from 'react'

export const usePinEvent = (name, payload) => () => {
  if (window.pintrk) {
    window.pintrk(name, payload)
  }
}

export const usePinEffect = (eventName, payload) => {
  useEffect(() => {
    if (window.pintrk) {
      window.pintrk('event', eventName, payload)
    }
  }, [])
}
