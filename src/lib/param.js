// https://stackoverflow.com/questions/25224887/plain-javascript-equivalent-of-jquery-param
//
export function getObjectAsParam(obj) {
  return Object.entries(obj)
    .map(pair =>
      Array.isArray(pair[1])
        ? pair[1]
            .map(
              x => `${encodeURIComponent(pair[0])}[]=${encodeURIComponent(x)}`
            )
            .join('&')
        : typeof pair[1] === 'object'
        ? Object.entries(pair[1])
            .map(
              x =>
                `${encodeURIComponent(pair[0])}[${x[0]}]=${encodeURIComponent(
                  x[1]
                )}`
            )
            .join('&')
        : pair.map(encodeURIComponent).join('=')
    )
    .join('&')
}
