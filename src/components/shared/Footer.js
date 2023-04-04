import React from 'react'

import Icon from '@mdi/react'
import { mdiCopyright } from '@mdi/js'

const Footer = props => {
    const date = new Date()
    const currentYear = date.getFullYear()

    return (
        <footer>
            <div className='flex'>
                <Icon
                    path={mdiCopyright}
                    size={1}
                    className='copyright__icon'
                />
                <p className='copyright__text'>
                    {currentYear} Eric Elsner, all rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer
