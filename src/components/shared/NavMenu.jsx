import React from "react"
import { Link } from "gatsby"

const NavMenu = ({ navItem }) => {
	const navLinks = navItem.map(
		(navLink) =>
			navLink.visible && (
				<li key={navLink.id} className='nav-link'>
					<Link to={navLink.linkTo}>{navLink.display}</Link>
				</li>
			)
	)

	return <ul className='flex c g2'>{navLinks}</ul>
}

export default NavMenu
