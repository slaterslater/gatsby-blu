const validFormats = new Set(['jpg', 'png', 'webp', 'auto'])

export function urlBuilder({ width, height, baseUrl, format = 'auto' }) {
  if (!validFormats.has(format)) {
    console.warn(
      `${format} is not a valid format. Valid formats are: ${[
        ...validFormats,
      ].join(', ')}`
    )
  }

  let [basename, version] = baseUrl.split('?')

  const dot = basename.lastIndexOf('.')
  let ext = ''
  if (dot !== -1) {
    ext = basename.slice(dot + 1)
    basename = basename.slice(0, dot)
  }
  let suffix = ''
  if (format === ext || format === 'auto') {
    suffix = `.${ext}`
  } else {
    suffix = `.${ext}.${format}`
  }

  return `${basename}_${width}x${height}_crop_center${suffix}?${version}`
}

export const getIdFromHash = hash => {
  const buff = Buffer.from(hash, 'base64')
  const adminId = buff.toString('ascii')
  const [id] = adminId.split('/').slice(-1)
  return id
}

// const urlBuilder = ({ baseUrl }) => baseUrl
