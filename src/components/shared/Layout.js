import React from 'react'

import Header from './Header'
import Footer from './Footer'

import '../../styles/index.css'

const Layout = ({ children }) => {
    return (
        <body>
            <Header />
            <main className='main'>{children}</main>
            <Footer />
        </body>
    )
}

export default Layout
