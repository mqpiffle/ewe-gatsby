import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const NavMenu = () => {
	const data = useStaticQuery(graphql`
		query {
			strapiHeader {
				nav {
					display
					linkTo
					visible
					id
				}
			}
		}
	`)

	const navLinks = data.strapiHeader.nav.map(
		(navLink) =>
			navLink.visible && (
				<li key={navLink.id}>
					<Link to={navLink.linkTo}>navLink.display</Link>
				</li>
			)
	)
	return { navLinks }
}

export default NavMenu
