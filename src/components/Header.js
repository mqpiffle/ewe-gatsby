import React, { useState, useEffect, useRef } from 'react'
import ContactFormModal from './ContactFormModal'
import { Link } from 'gatsby'
import Icon from '@mdi/react'
import { mdiGithub, mdiLinkedin, mdiEmail, mdiClose } from '@mdi/js'

import '../styles/header.css'

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false)
    // console.log('modalOpen', modalOpen)

    const handleModal = event => {
        event.preventDefault()
        // console.log('MODAL CLICK')
        setModalOpen(prev => !prev)
    }

    const dialogRef = useRef(null)
    // const lastActiveElement = useRef(null)

    useEffect(() => {
        const node = dialogRef.current
        if (modalOpen) {
            // lastActiveElement.current = document.activeElement
            node.showModal()
        } else {
            node?.close()
            // lastActiveElement.current.focus()
        }
    }, [modalOpen])

    return (
        <>
            <header className='flex'>
                <nav>
                    <h1>
                        <Link
                            to='/'
                            id='brand'
                        >
                            ericelsner.com
                        </Link>
                    </h1>
                    <div className='external-links'>
                        <a href=''>
                            <Icon
                                path={mdiGithub}
                                size={2.5}
                                className='icon'
                            />
                        </a>
                        <a href=''>
                            <Icon
                                path={mdiLinkedin}
                                size={2.5}
                                className='icon'
                            />
                        </a>
                        <div className='contact'>
                            <Icon
                                path={mdiEmail}
                                size={2.5}
                                className='icon'
                                onClick={handleModal}
                            />
                        </div>
                    </div>
                </nav>
            </header>
            {modalOpen && (
                <ContactFormModal
                    dialogRef={dialogRef}
                    closeModal={handleModal}
                />
            )}
        </>
    )
}

export default Header
