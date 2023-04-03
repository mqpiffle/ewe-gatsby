import React, { useState, useRef, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Icon from '@mdi/react'
import {
    mdiGithub,
    mdiLinkedin,
    mdiEmail,
    mdiClose,
    mdiAccountCircleOutline,
} from '@mdi/js'

import Layout from '../components/shared/Layout'
import ProjectCards from '../components/portfolio/ProjectCards'
import ContactFormModal from '../components/portfolio/ContactFormModal'

const PortfolioPage = props => {
    const data = useStaticQuery(graphql`
        query {
            strapiPortfolio {
                main_heading
                sub_heading
                github_url
                linkedin_url
            }
        }
    `)

    const [modalOpen, setModalOpen] = useState(false)
    // console.log('modalOpen', modalOpen)

    const handleModal = event => {
        event.preventDefault()
        // console.log('MODAL CLICK')
        setModalOpen(prev => !prev)
    }

    const portfolioData = data.strapiPortfolio
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
        <Layout>
            <div className='info'>
                <h2>{portfolioData.main_heading}</h2>
                <h3>{portfolioData.sub_heading}</h3>
                <div className='external-links'>
                    <a
                        href={portfolioData.github_url}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <Icon
                            path={mdiGithub}
                            size={2.5}
                            className='icon'
                        />
                    </a>
                    <a
                        href={portfolioData.linkedin_url}
                        target='_blank'
                        rel='noreferrer'
                    >
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
            </div>
            <ProjectCards />
            {modalOpen && (
                <ContactFormModal
                    dialogRef={dialogRef}
                    closeModal={handleModal}
                />
            )}
        </Layout>
    )
}

export default PortfolioPage
