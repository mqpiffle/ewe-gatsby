require('dotenv').config({
  path:`.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `ewe-gatsby`,
    siteUrl: `https://ericelsner.com`
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-mdx", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    { resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.STRAPI_API_URL,
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: ['event'],
        singleTypes: [],
      },
    },
  ]
};