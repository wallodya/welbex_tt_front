import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-screen min-h-screen text-gray-100 bg-gray-800 dark">
			<div className="grid grid-cols-main">
				<div className="col-start-2">{children}</div>
			</div>
		</div>
	)
}

export default Layout
