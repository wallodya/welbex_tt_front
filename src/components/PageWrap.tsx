import React, { ReactNode } from 'react'
import Layout from './Layout'
import Header from './nav/Header'

const PageWrap = ({children}: { children: ReactNode }) => {
	return (
		<Layout>
			<div >
				<Header />
				<main className="mt-20">{children}</main>
			</div>
		</Layout>
	)
}

export default PageWrap