import { ReactNode, createContext, useContext } from "react"
import { InitialFormValues, PostContextValue } from "../feed.types"

const initialContext: PostContextValue = {
    post: {
        uniqueMessageId: "",
        text: "",
        mediaURL: "",
        createdAt: 0,
        author: {
            login: "",
            uuid: ""
        }
    },
    editPost:  (postData: InitialFormValues) => {
        console.log("edit post", postData)
    },
    currentPage: 0
}
const PostContext = createContext(initialContext)

export const usePost = () => useContext(PostContext)

const PostProvider = ({ children, contextValue }: {children: ReactNode, contextValue: PostContextValue }) => {
	return (
		<PostContext.Provider value={contextValue}>
			{children}
		</PostContext.Provider>
	)
}

export default PostProvider