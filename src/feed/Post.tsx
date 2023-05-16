import moment from "moment"

export type PostProps = {
    text: string,
    mediaURL: string,
    author: string,
    createdAt: number
}

const Post = ({ text, author, createdAt }: PostProps) => {
	return (
		<div className="p-3 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<span className="font-bold text-gray-100">{author}</span>
			<p>{text}</p>
			<div className="w-full flex justify-end">
				<span className="text-xs font-md text-gray-500">
					{moment(createdAt).fromNow()}
				</span>
			</div>
		</div>
	)
}

export default Post