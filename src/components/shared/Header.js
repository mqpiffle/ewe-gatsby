import React, { useState, useEffect, useRef } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Icon from '@mdi/react'
import { mdiAccountCircleOutline } from '@mdi/js'

import '../../styles/header.css'

const Header = () => {
    const data = useStaticQuery(graphql`
        query {
            strapiHeader {
                brand
            }
        }
    `)

    const [user, setUser] = useState(null)
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
                    {!user ? (
                        <button className='btn'>Login</button>
                    ) : (
                        <>
                            <span>Welcome!</span>
                            <Icon
                                path={mdiAccountCircleOutline}
                                size={1.5}
                            />
                        </>
                    )}
                </nav>
            </header>
        </>
    )
}

export default Header
