import React, { useState, useEffect, useRef } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import '../../styles/header.css'

const Header = () => {
    const data = useStaticQuery(graphql`
        query {
            strapiHeader {
                brand
            }
        }
    `)

    const headerData = data.strapiHeader

    return (
        <>
            <header className='flex'>
                <nav>
                    <h1>
                        <Link
                            to='/'
                            id='brand'
                        >
                            {headerData.brand}
                        </Link>
                    </h1>
                </nav>
            </header>
        </>
    )
}

export default Header
