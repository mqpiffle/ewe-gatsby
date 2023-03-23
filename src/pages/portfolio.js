import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from '../components/Header'
import ProjectCards from '../components/ProjectCards'

// TODO:
// links to github, linkedin
// links to deployed projects
// contact form

const PortfolioPage = props => {
    const data = useStaticQuery(graphql`
        query {
            strapiPortfolio {
                main_heading
                sub_heading
            }
        }
    `)
    return (
        <div>
            <Header />
            <main className='main'>
                <div className='info'>
                    <h2>{data.strapiPortfolio.main_heading}</h2>
                    <h3>{data.strapiPortfolio.sub_heading}</h3>
                </div>
                <ProjectCards />
            </main>
        </div>
    )
}

export default PortfolioPage
