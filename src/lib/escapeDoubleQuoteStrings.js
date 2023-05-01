export function escapeDoubleQuoteString(str = '') {
  return str.replace(/\x22/g, '\\\x22').replace(/\n/g, ' ')
}
