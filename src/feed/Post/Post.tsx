import moment from "moment"
import { useEffect, useState } from "react"
import PencilIcon from "../../components/icons/PencilIcon"
import TrashIcon from "../../components/icons/TrashIcon"
import { useMutation, useQueryClient } from "react-query"
import { deletePost } from "../feed.api"
import { usePost } from "./PostProvider"
import { useAuth } from "../../auth/AuthProvider"

const PostActions = () => {
    const {
		currentPage,
		post: { uniqueMessageId: postId, text, author: {uuid: authorId} },
        editPost
	} = usePost()

	const queryClient = useQueryClient()
	const deletePostMutation = useMutation(deletePost, {
		onSuccess: () => {
			queryClient.invalidateQueries(["feed-page", currentPage])
		},
	})

	const onDelete = () => {
		deletePostMutation.mutate(postId)
	}

	return (
		<div className="flex gap-4 items-center">
			<button className="px-2 py-1 text-sm font-bold flex gap-1 rounded-lg border border-gray-400 items-center text-gray-400 hover:bg-gray-600"
                onClick={() => editPost({postId, text, authorId})}
            >
				<PencilIcon size="sm" />
				Edit
			</button>
			<button
				className="px-2 py-1 text-sm font-bold flex gap-1 rounded-lg border border-red-500/70 items-center text-red-500/70 hover:bg-gray-600"
				onClick={onDelete}
			>
				<TrashIcon size="sm" />
				Delete
			</button>
		</div>
	)
}

const Post = () => {
	const [isOwner, setIsOwner] = useState(false)
    const { post: {author, createdAt, text, mediaURL}} = usePost()

	const { user } = useAuth()

	useEffect(() => {
		if (!user) {
			setIsOwner(false)
			return
		}

		if (user.uuid === author.uuid) {
			setIsOwner(true)
		}
	}, [user, author.uuid])

	return (
		<div className="p-3 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<span
				className={`font-bold ${
					isOwner ? "text-blue-600" : "text-gray-100"
				}`}
			>
				{author.login}
			</span>
            {
                mediaURL && <img src={`${import.meta.env.VITE_API_URL}/${mediaURL}`}/>
            }
			<p>{text}</p>
			<div className="w-full mt-4 flex justify-between items-center">
				{isOwner && (
					<PostActions/>
				)}
				<span className="ml-auto text-xs font-md text-gray-500">
					{moment(createdAt).fromNow()}
				</span>
			</div>
		</div>
	)
}

export default Post
