export function truncateString(str = '', num = 150) {
  if (str.length < num) return str
  return `${str.slice(0, num)}...`
}
