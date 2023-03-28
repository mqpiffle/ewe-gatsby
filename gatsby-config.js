require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: `ewe-gatsby`,
        siteUrl: `https://ericelsner.com`,
    },
    plugins: [
        'gatsby-plugin-image',
        'gatsby-plugin-mdx',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './src/images/',
            },
            __key: 'images',
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: './src/pages/',
            },
            __key: 'pages',
        },
        {
            resolve: 'gatsby-source-strapi',
            options: {
                // apiURL: process.env.STRAPI_API_URL,
                apiURL: 'http://localhost:1337',
                // accessToken: process.env.STRAPI_TOKEN,
                accessToken:
                    '91d7ec24c72cc20a48d45a9aea68bb534c3de60af4a76a155a3ce5fb12a4ad569f3b22fe205b62f8c71f0da2878da511c0eea20e9fc58355105b50ceaf14bdb98c203c2fa645f9bf93389e9dce7f39adf6b9e4ec39300a2ca647851ae61a443683e41146897e460076ab1d3aae30b67ddbba998318756d25d7dc864e5d9a143d',
                collectionTypes: ['event', 'project'],
                singleTypes: ['portfolio', 'header'],
            },
        },
    ],
}
