import React from "react"

import Header from "./Header"
import Footer from "./Footer"

import "../../styles/index.css"

const Layout = ({ children }) => {
	return (
		<div className='body'>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
