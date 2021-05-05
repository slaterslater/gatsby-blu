import dotenv from 'dotenv'

dotenv.config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `bluboho fine jewelry`,
    description: `tell your story with our handcrafted jewelry. raw and refined pieces to mark every moment. international shipping. free shipping within Canada and the US. gift cards available.`,
    author: `@bluboho`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://bluboho.com`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GA_TRACKING_ID, process.env.AW_CONVERSION_ID],
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.FACEBOOK_PIXEL_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `bluboho fine jewelry`,
        short_name: `bluboho`,
        start_url: `/`,
        background_color: `#040404`,
        theme_color: `#040404`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-yotpo-product`,
      options: {
        shopName: process.env.SHOPIFY_SHOP_NAME,
        shopifyAccessToken: process.env.SHOPIFY_STOREFRONT_KEY,
        yotpoAppKey: process.env.YOTPO_APP_KEY,
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop.
        shopName: process.env.SHOPIFY_SHOP_NAME,
        // The storefront access token
        accessToken: process.env.SHOPIFY_STOREFRONT_KEY,
        paginationSize: 80,
        collections: ['shop'],
        downloadImages: false,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Sorts Mill Goudy`,
          `Montserrat\:300,400,500,700`, // you can also specify font weights and styles
        ],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/account/*`] },
    },
    // {
    //   // resolve: `gatsby-source-instagram`,
    //   options: {
    //     username: `54085446`,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
