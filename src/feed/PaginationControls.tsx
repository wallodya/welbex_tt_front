import { POSTS_PER_PAGE } from "./feed.hooks"

type PaginationControlsProps = {
	currentPage: number
	pageCount: number
	postsCount: number
	forward: () => void
	back: () => void
	isFirst: boolean
	isLast: boolean
}

const PaginationInfo = ({
	currentPage,
	postsCount,
}: {
	currentPage: number
	postsCount: number
}) => {
	const firstPost = currentPage * POSTS_PER_PAGE
	const lastPost = currentPage * POSTS_PER_PAGE + 20

	if (postsCount >= 20) {
		return (
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Showing{" "}
				<span className="font-semibold text-gray-900 dark:text-white">
					{firstPost}
				</span>{" "}
				to{" "}
				<span className="font-semibold text-gray-900 dark:text-white">
					{lastPost > postsCount ? postsCount : lastPost}
				</span>{" "}
				of{" "}
				<span className="font-semibold text-gray-900 dark:text-white">
					{postsCount}
				</span>{" "}
				posts
			</span>
		)
	} else {
		return (
			<span className="text-sm text-gray-700 dark:text-gray-400">
				Showing all{" "}
				<span className="font-semibold text-gray-900 dark:text-white">
					{postsCount}
				</span>{" "}
				posts
			</span>
		)
	}
}

const PaginationControls = ({
	currentPage,
	postsCount,
	isLast,
	isFirst,
	forward,
	back,
}: PaginationControlsProps) => {
	return (
		<div className="flex flex-col items-center">
			<div className="mt-2">
				<PaginationInfo
					currentPage={currentPage}
					postsCount={postsCount}
				/>
			</div>
			<div className="mt-4 mb-16 grid grid-cols-2">
				{!isFirst && (
					<button
						className="col-start-1 px-4 py-2 text-sm font-medium text-gray-100 bg-gray-700 rounded-l hover:bg-gray-600 "
						onClick={back}
					>
						Prev
					</button>
				)}
				{!isLast && (
					<button
						className="col-start-2 px-4 py-2 text-sm font-medium text-gray-100 bg-gray-700 rounded-r hover:bg-gray-600"
						onClick={forward}
					>
						Next
					</button>
				)}
			</div>
		</div>
	)
}

export default PaginationControls
