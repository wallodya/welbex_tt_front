import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode,
}

const Button = ({ children, ...buttonAttr }: ButtonProps) => {
	return (
		<button {...buttonAttr} className="w-full text-gray-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:pointer-events-none disabled:bg-gray-500 transition">
			{children}
		</button>
	)
}

export default Button