import { useMutation } from "react-query"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import AuthFormDialog from "./AuthFormDialog"
import { signOut } from "../../auth/auth.api"
import { useEffect } from "react"

const SignOutButton = ({removeUserFn}:{removeUserFn: () => void}) => {
    const mutation = useMutation(signOut, {
		onSuccess: () => {
			console.log("signed out")
            removeUserFn()
		},
	})
    return (
		<button
			onClick={() => mutation.mutate()}
			className="ml-auto text-gray-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
		>
            Sign out
        </button>
	)
}

const Header = () => {
	const { user, removeUser } = useCurrentUser()

    useEffect(() => {
        console.log("header user: ", user)
    },[user])

	return (
		<div className="fixed top-0 left-0 w-screen grid grid-cols-main shadow shadow-gray-900 py-3 bg-gray-800">
			<div className="w-full h-fit col-start-2 flex justify-end items-center">
				{user && (
					<p className="font-bold text-gray-100">{user.login}</p>
				)}
				{user ? <SignOutButton removeUserFn={removeUser}/> : <AuthFormDialog />}
			</div>
		</div>
	)
}

export default Header
