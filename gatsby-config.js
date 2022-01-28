module.exports = {
    siteMetadata: {
      title: `simpleradio`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
      `gatsby-plugin-preact`,
      `gatsby-plugin-postcss`,
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-transformer-json`,
      {
        resolve: `gatsby-source-filesystem`,
        name: "data",
        options: {
          path: `./src/data/`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        name: "images",
        options: {
          path: `./src/images/`,
        },
      },
    ]
}