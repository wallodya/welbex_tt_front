import { UseFormRegister } from "react-hook-form"
import { PostSchema } from "./post.schema"

const FileUpload = ({
    register,
    removeFile
}: {
    register: UseFormRegister<PostSchema>
    removeFile: () => void
}) => {
	return (
		<div>
			<label
				className="block mb-2 text-sm font-medium text-gray-100"
				htmlFor="post_media"
			>
				Upload file
			</label>
			<input
				className="w-full text-sm text-gray-100 border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none"
				id="post_media"
				type="file"
				// ref={inputRef}
				// onChange={handleAddFile}
                {...register("media")}
			/>
			<button onClick={removeFile} type="button" className="px-4 py-1 mt-2 rounded-lg text-sm bg-gray-500 text-gray-100 hover:bg-gray-600 transition">
				Remove file
			</button>
		</div>
	)
}

export default FileUpload
