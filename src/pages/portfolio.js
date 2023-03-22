import React from 'react'
import Header from '../components/Header'
import ProjectCards from '../components/ProjectCards'

// TODO:
// links to github, linkedin
// links to deployed projects
// contact form

const PortfolioPage = props => {
    return (
        <div>
            <Header />
            <main className='main'>
                <div className='info'>
                    <h2>Welcome to my coding portfolio.</h2>
                    <h3>Here are some examples of my work.</h3>
                </div>
                <ProjectCards />
            </main>
        </div>
    )
}

export default PortfolioPage
