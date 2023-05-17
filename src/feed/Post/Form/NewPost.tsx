import { zodResolver } from "@hookform/resolvers/zod"
import * as Form from "@radix-ui/react-form"
import { useForm } from "react-hook-form"
import { PostSchema, postSchema } from "./post.schema"
import Button from "../../../components/ui/Button"
import { useMutation, useQueryClient } from "react-query"
import { savePost } from "../../feed.api"
import { useCurrentUser } from "../../../hooks/useCurrentUser"

const NewPost = ({ closeForm }: { closeForm: () => void }) => {
	const {
		handleSubmit,
		register,
		formState: {
			isValid,
			errors: { text: textFieldError, mediaUrl: mediaURLFieldError },
		},
	} = useForm<PostSchema>({ resolver: zodResolver(postSchema) })

	const queryClient = useQueryClient()

	const savePostMuatation = useMutation(savePost, {
		onSuccess: data => {
			queryClient.invalidateQueries(["feed-page", 0])
			closeForm()
		},
	})

	const { user } = useCurrentUser()

	const onSubmit = (data: PostSchema) => {
		if (!user) {
			return
		}

		savePostMuatation.mutate({ ...data, authorId: user.uuid })
	}

	return (
		<div className="p-6 realative min-w-fit border rounded-lg shadow bg-gray-800 border-gray-700">
			<Form.Root autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Form.Field name="text">
					<div className="flex justify-between items-baseline">
						<Form.Label className="text-sm mr-8">
							Enter message
						</Form.Label>
						{textFieldError && (
							<Form.Message className="text-xs text-red-500/80">
								{textFieldError && textFieldError.message}
							</Form.Message>
						)}
					</div>
					<Form.Control asChild>
						<textarea
							{...register("text")}
							className="w-full p-2 mt-2 bg-gray-700 rounded-lg border border-gray-600"
						/>
					</Form.Control>
				</Form.Field>
				<Form.Field name="mediaUrl" className="mt-4">
					<div className="flex justify-between items-baseline">
						<Form.Label className="text-sm">media url</Form.Label>
						{mediaURLFieldError && (
							<Form.Message className="text-xs text-red-500/80">
								{mediaURLFieldError.message}
							</Form.Message>
						)}
					</div>
					<Form.Control asChild>
						<input
							{...register("mediaUrl")}
							type="text"
							className="w-full p-2 mt-2 bg-gray-700 rounded-lg border border-gray-600"
						/>
					</Form.Control>
				</Form.Field>
				<Form.Submit asChild>
					<div className="mt-8 w-full">
						<Button disabled={!isValid}>Save post</Button>
					</div>
				</Form.Submit>
			</Form.Root>
		</div>
	)
}

export default NewPost
