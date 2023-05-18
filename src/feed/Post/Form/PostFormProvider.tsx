import { ReactNode, createContext, useContext } from "react"
import type { PostFormContext } from "../../feed.types"

const initialContext: PostFormContext = {
	isOpen: false,
	closeForm: () => {
		console.log("close form")
	},
	openForm: () => {
		console.log("open form")
	},
    toggleForm: (open: boolean) => {
        console.log("toggle form", open)
    },
	action: "new",
    initialValues: null
}

const PostFormContext = createContext(initialContext)

export const usePostForm = () => useContext(PostFormContext)

const PostFormProvider = ({
	children,
    contextValue,
}: { children: ReactNode, contextValue: PostFormContext }) => {

	return (
		<PostFormContext.Provider value={contextValue}>{children}</PostFormContext.Provider>
	)
}

export default PostFormProvider
