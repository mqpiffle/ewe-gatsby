import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Icon from '@mdi/react'
import { mdiGithub, mdiOpenInNew } from '@mdi/js'

import '../styles/projects.css'

const ProjectCards = props => {
    const data = useStaticQuery(graphql`
        query {
            allStrapiProject {
                nodes {
                    image {
                        localFile {
                            childImageSharp {
                                gatsbyImageData(layout: CONSTRAINED)
                            }
                        }
                    }
                    id
                    name
                    short_desc
                    long_desc
                    github_link
                    deployed_link
                    tech {
                        id
                        name
                    }
                }
            }
        }
    `)

    const project = data.allStrapiProject.nodes

    const cards = project.map(node => (
        <div
            className='project-card'
            key={node.id}
        >
            <GatsbyImage
                image={getImage(node.image.localFile)}
                alt={node.short_desc}
                className='project-card__image'
            />
            <div className='project-card__body'>
                <h4 className='project-card__name'>{node.name}</h4>
                <div className='project-card__links'>
                    <a
                        href={node.github_link}
                        target='_blank'
                        rel='noreferrer'
                        className='project-card__link'
                    >
                        <Icon
                            path={mdiGithub}
                            size={1.5}
                            title='link to github repository'
                            color='var(--clr-text)'
                        />
                        <span className='project-card__link-text'>
                            view GitHub repo
                        </span>
                    </a>
                    <a
                        href={node.deployed_link}
                        target='_blank'
                        rel='noreferrer'
                        className='project-card__link'
                    >
                        <Icon
                            path={mdiOpenInNew}
                            size={1.5}
                            title='link to deployed project'
                            color='var(--clr-text)'
                        />
                        <span className='project-card__link-text'>
                            view deployed project
                        </span>
                    </a>
                </div>
                <p className='project-card__desc'>{node.long_desc}</p>
                <div className='project-card__techs'>
                    {node.tech.map(t => (
                        <h6
                            className='project-card__tech'
                            key={t.id}
                        >
                            {t.name}
                        </h6>
                    ))}
                </div>
            </div>
        </div>
    ))
    console.log(cards)
    return <div className='project-card__container'>{cards}</div>
}

export default ProjectCards
