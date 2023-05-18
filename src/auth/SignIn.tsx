import * as Form from "@radix-ui/react-form"
import Button from "../components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema, signInSchema } from "./signIn.schema"
import { useMutation } from "react-query"
import { signIn } from "./auth.api"
import { useAuth } from "./AuthProvider"

const SignIn = ({closeForm}: {closeForm: () => void}) => {
    const { setCurrentUser } = useAuth()
    const {
		register,
		formState: {
			isValid,
			errors: { login: loginFieldError, password: passwordFieldError },
		},
		handleSubmit,
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		mode: "onChange",
	})

    const signInMutation = useMutation(signIn, {
        onSuccess: (data) => {
            setCurrentUser(data)
            closeForm()
        },
        onError: (err) => {
            console.log("mutatoin err: ", err)
        }
    })

    const onSubmit = (data: SignInSchema) => {
        signInMutation.mutate(data)
    }

	return (
        <Form.Root autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<Form.Field name="login">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">Login</Form.Label>
					{loginFieldError && (
						<Form.Message className="text-xs text-red-500/80">
							{loginFieldError.message}
						</Form.Message>
					)}
				</div>
				<Form.Control asChild>
					<input
						{...register("login")}
						type="text"
						className="w-full p-2 mt-2 bg-gray-700 rounded-lg border border-gray-600"
					/>
				</Form.Control>
			</Form.Field>
			<Form.Field name="password" className="mt-4">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">Password</Form.Label>
                    {
                        passwordFieldError &&
                            <Form.Message className="text-xs text-red-500/80">
                                {passwordFieldError.message}
                            </Form.Message>
                    }
				</div>
				<Form.Control asChild>
					<input
						{...register("password")}
						type="password"
						className="w-full p-2 mt-2 bg-gray-700 rounded-lg border border-gray-600"
					/>
				</Form.Control>
			</Form.Field>
			<Form.Submit asChild>
				<div className="mt-8 w-full">
					<Button disabled={!isValid}>Sign in</Button>
				</div>
			</Form.Submit>
		</Form.Root>
	)
}

export default SignIn
