import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import NavMenu from "./NavMenu"

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

	return (
		<header className='flex sb'>
			<nav>
				<h1>
					<Link to='/' id='brand'>
						{headerData.brand}
					</Link>
				</h1>
				<NavMenu navItem={navItem} />
			</nav>
		</header>
	)
}

export default Header
