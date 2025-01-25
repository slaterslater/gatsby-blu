import {
  getImageData,
  IGetImageDataArgs,
  IUrlBuilderArgs,
} from "gatsby-plugin-image"

const validFormats = new Set(["jpg", "png", "webp", "auto"])

export interface ShopifyImage {
  width: number
  height: number
  url: string
}
export interface IGetShopifyImageArgs
  extends Omit<
    IGetImageDataArgs,
    "urlBuilder" | "baseUrl" | "formats" | "sourceWidth" | "sourceHeight"
  > {
  image: ShopifyImage
}

// URL builder for Shopify CDN images
export function urlBuilder({
  width,
  height,
  baseUrl,
  format,
}: IUrlBuilderArgs<unknown>): string {
  if (!validFormats.has(format)) {
    console.warn(
      `${format} is not a valid format. Valid formats are: ${[
        ...validFormats,
      ].join(", ")}`,
    )
    format = "auto"
  }

  // Extract base URL and version from Shopify URL
  let [basename, version] = baseUrl.split("?")
  const dot = basename.lastIndexOf(".")
  let ext = ""
  if (dot !== -1) {
    ext = basename.slice(dot + 1)
    basename = basename.slice(0, dot)
  }

  // Append width, height, and format to the URL
  const suffix =
    format === ext || format === "auto" ? `.${ext}` : `.${ext}.${format}`
  return `${basename}_${width}x${height}_crop_center${suffix}?${version}`
}

// Main function to transform Shopify image data to GatsbyImageData
export function getShopifyImage({ image, ...args }: IGetShopifyImageArgs) {
  const { url: baseUrl, width: sourceWidth, height: sourceHeight } = image

  // Ensure necessary fields are present
  if (!baseUrl || !sourceWidth || !sourceHeight) {
    console.error("Missing required image data fields for Shopify image.")
    return null
  }

  // Generate GatsbyImageData using getImageData
  return getImageData({
    ...args,
    baseUrl,
    sourceWidth,
    sourceHeight,
    urlBuilder, // Custom URL builder for Shopify images
    formats: ["auto", "webp"], // You can specify additional formats if needed
  })
}
