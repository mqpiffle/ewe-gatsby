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
                apiURL: 'http://localhost:1337' || process.env.STRPI_API_URL,
                accessToken: `4a74b415370359334c4d29c0b63dceed923b7dc6fac1fb7d8f73266a1405511f83fb89a3b61d6e90c7d4bfe0ad78e12385e801880d9d692782eaaa31c0f7afcfa1201358cacd71add8fb39df6152c4f941fbeb485ac80478532d3f8722ecb8bbc3097b509d16dcc6e6785a2dc62182db3601322b27015397c1c74c49b8ef305c`,
                collectionTypes: ['event', 'project'],
                singleTypes: ['portfolio'],
            },
        },
    ],
}
