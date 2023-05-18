import { useState } from "react"
import { useAuth } from "../auth/AuthProvider"
import PaginationControls from "./PaginationControls"
import PostFormDialog from "./Post/Form/PostFormDialog"
import PostFormProvider from "./Post/Form/PostFormProvider"
import Post from "./Post/Post"
import PostProvider from "./Post/PostProvider"
import { usePagination, usePostsForPage } from "./feed.hooks"
import { InitialFormValues } from "./feed.types"

const usePostFormControls = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
	const [postFormActionType, setPostFormActionType] = useState<
		"new" | "edit"
	>("new")
	const [initialFormValues, setInitialFormValues] =
		useState<InitialFormValues | null>(null)

	const closeForm = () => {
		setIsFormOpen(false)
		setPostFormActionType("new")
	}

	const openForm = () => {
		setIsFormOpen(true)
	}

	const toggleForm = (open: boolean) => {
		setPostFormActionType("new")
		setIsFormOpen(open)
	}

    const editPost = (postData: InitialFormValues) => {
		openForm()
		setPostFormActionType("edit")
		setInitialFormValues(postData)
	}

    return {
        isOpen: isFormOpen,
		closeForm,
		openForm,
		toggleForm,
		action: postFormActionType,
		initialValues: initialFormValues,
        editPost
    }
}

const Feed = () => {
	const paginationControl = usePagination()
	const posts = usePostsForPage(paginationControl.currentPage)

    const {editPost, ...postFormContextValue} = usePostFormControls()

    const { user } = useAuth()

	return (
		<div>
			<div className="min-h-fit flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{user && (
					<PostFormProvider contextValue={postFormContextValue}>
						<PostFormDialog />
					</PostFormProvider>
				)}
				{posts.map((post) => (
					<PostProvider
						key={`post-context-${post.uniqueMessageId}`}
						contextValue={{
							post,
							editPost,
							currentPage: paginationControl.currentPage,
						}}
					>
						<Post key={`post-${post.uniqueMessageId}`} />
					</PostProvider>
				))}
			</div>
			<div className="flex w-full justify-center items-center mt-12">
				<PaginationControls {...paginationControl} />
			</div>
		</div>
	)
}

export default Feed
