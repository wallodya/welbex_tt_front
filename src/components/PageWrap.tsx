import { ReactNode } from 'react'
import Layout from './Layout'
import Header from './nav/Header'

const PageWrap = ({children}: { children: ReactNode }) => {
	return (
		<Layout>
				<Header />
				<main className="mt-20">{children}</main>   
		</Layout>
	)
}

export default PageWrap