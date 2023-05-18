import { zodResolver } from "@hookform/resolvers/zod"
import * as Form from "@radix-ui/react-form"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { useAuth } from "../../../auth/AuthProvider"
import Button from "../../../components/ui/Button"
import { savePost, updatePost } from "../../feed.api"
import FileUpload from "./FileUpload"
import { usePostForm } from "./PostFormProvider"
import { PostSchema, postSchema } from "./post.schema"

const usePostFormMutation = () => {
    const { closeForm, action } = usePostForm()

    const queryClient = useQueryClient()

	const savePostMuatation = useMutation(savePost, {
		onSuccess: () => {
			queryClient.invalidateQueries(["feed-page", 0])
			closeForm()
		},
	})

	const updatePostMuatation = useMutation(updatePost, {
		onSuccess: () => {
			queryClient.invalidateQueries(["feed-page", 0])
			closeForm()
		},
	})

	const { user } = useAuth()

	const onSubmit = (data: PostSchema) => {
		if (!user) {
			return
		}
        if (action === "new") {

            savePostMuatation.mutate({...data, authorId: user.uuid})
        } 
        if (action === "edit" && data.authorId && data.postId) {
            updatePostMuatation.mutate({
				...data,
				authorId: data.authorId ?? "",
				postId: data.postId ?? "",
			})
        }
	}
    return onSubmit
}

const NewPost = () => {
	const {
		handleSubmit,
		register,
        setValue,
		formState: {
			isValid,
			errors: { text: textFieldError },
		},
	} = useForm<PostSchema>({ resolver: zodResolver(postSchema), mode: "onChange" })

	const onSubmit = usePostFormMutation()

    const { action, initialValues } = usePostForm()

    useEffect(() => {
        if (action === "edit" && initialValues) {
            setValue("authorId", initialValues.authorId)
            setValue("postId", initialValues.postId)
            setValue("text", initialValues.text)
        }
    }, [action])

    const removeFile = () => {
        setValue("media", null)
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
				{/* <Form.Field name="mediaUrl" className="mt-4 hidden">
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
				</Form.Field> */}

				{action === "new" && (
					<FileUpload
						register={register}
						removeFile={removeFile}
					/>
				)}

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
