import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import "../../styles/header.css"

const Header = () => {
	const data = useStaticQuery(graphql`
		query {
			strapiHeader {
				brand
				nav {
					display
					linkTo
					visible
					id
				}
			}
		}
	`)

	const headerData = data.strapiHeader
	const navItem = headerData.nav

	const navLinks = navItem.map((navLink) => {
		console.log(navLink.visible)
		if (navLink.visible) {
			return (
				<li key={navLink.id}>
					<Link to={navLink.linkTo}>{navLink.display}</Link>
				</li>
			)
		}
	})

	console.log(navLinks)

	return (
		<header className='flex sb'>
			<nav>
				<h1>
					<Link to='/' id='brand'>
						{headerData.brand}
					</Link>
				</h1>
				<ul className='flex c g1'>{navLinks}</ul>
			</nav>
		</header>
	)
}

export default Header
