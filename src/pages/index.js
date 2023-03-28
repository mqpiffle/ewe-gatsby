import React from 'react'
import Header from '../components/Header'
import { Link } from 'gatsby'
import Icon from '@mdi/react'
import { mdiCodeJson, mdiMusic } from '@mdi/js'

import '../styles/index.css'
import '../styles/event-calendar.css'

const IndexPage = () => {
    return (
        <div>
            <Header />
            <main className='main'>
                <div className='info'>
                    <h2>Welcome to my internet domain.</h2>
                    <h3>Please choose your destination:</h3>
                    <ul className='link-list'>
                        <li>
                            <Link
                                to='/portfolio'
                                className='link-list-item'
                            >
                                <Icon
                                    path={mdiCodeJson}
                                    size={1}
                                />
                                my coding portfolio.
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/music'
                                className='link-list-item'
                            >
                                {' '}
                                <Icon
                                    path={mdiMusic}
                                    size={1}
                                />
                                my music showcase (coming soon...)
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    )
}
export default IndexPage
