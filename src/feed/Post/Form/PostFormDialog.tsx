import * as Dialog from "@radix-ui/react-dialog"
import NewPost from "./NewPost"
import PencilIcon from "../../../components/icons/PencilIcon"

const PostFormDialog = () => {
  return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="w-full p-6 flex items-center justify-center text-lg font-bold text-gray-400 rounded-lg border-2 border-dashed border-gray-400 hover:text-gray-300 hover:border-gray-300 transition">
					<PencilIcon size="md" />
					<span className="ml-2">New Post</span>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed h-screen w-screen top-0 left-0 bg-gray-900/70" />
				<Dialog.Content className="absolute inset-0 m-auto w-fit h-fit">
					<NewPost />
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
  )
}

export default PostFormDialog