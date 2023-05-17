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

const PaginationInfo = ({currentPage, postsCount}:{currentPage: number, postsCount: number}) => {
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
                    {lastPost}
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

const PaginationControls = ({ currentPage, postsCount, isLast, isFirst}:PaginationControlsProps) => {



	return (
		<div className="flex flex-col items-center">

			<div className="inline-flex mt-2 xs:mt-0">
                <PaginationInfo currentPage={currentPage} postsCount={postsCount}/>
				{!isFirst && (
					<button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Prev
					</button>
				)}
				{!isLast && (
					<button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						Next
					</button>
				)}
			</div>
		</div>
	)
}

export default PaginationControls
