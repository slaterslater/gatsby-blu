export function useGAEvent({
  category = '',
  action = '',
  label = '',
  value = '',
  fields = {},
}) {
  return () => {
    if (window.gtag) {
      window.gtag('send', 'event', category, action, label, value, fields)
    }
  }
}
