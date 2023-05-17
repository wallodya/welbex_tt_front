import PaginationControls from './PaginationControls'
import PostFormDialog from './Post/Form/PostFormDialog'
import Post from './Post/Post'
import { usePagination, usePostsForPage } from './feed.hooks'

const Feed = () => {
    const paginationControl = usePagination()
    const posts = usePostsForPage(paginationControl.currentPage)

	return (
		<div className="min-h-screen flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<PostFormDialog />
			{posts.map((post, index) => (
				<Post key={index} {...post} />
			))}
			<div className="flex justify-center items-center mt-12">
				<PaginationControls {...paginationControl}/>
			</div>
		</div>
	)
}

export default Feed