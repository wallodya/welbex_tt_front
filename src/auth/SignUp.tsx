import * as Form from "@radix-ui/react-form"
import Button from "../components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	CreateAccountSchema,
	createAccountSchema,
} from "./createAccount.schema"
import { useMutation } from "react-query"
import { signUp } from "./auth.api"
import { useCurrentUser } from "../hooks/useCurrentUser"

const SignUp = ({closeForm}:{closeForm: () => void}) => {
    const { setUser } = useCurrentUser()
	const {
		register,
		handleSubmit,
		formState: {
			isValid,
			errors: {
				login: loginFieldError,
				password: passwordFieldError,
				confirmPassword: confirmPasswordFieldError,
				email: emailFieldError,
			},
		},
	} = useForm<CreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
	})

    const signUpMutation = useMutation(signUp, {
        onSuccess: (data) => {
            console.log("sign up success: ", data)
            setUser(data)
            closeForm()
        }
    })

	const onSubmit = (data: CreateAccountSchema) => {
		signUpMutation.mutate(data)
	}

	return (
		<Form.Root onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
			<Form.Field name="email" className="mt-4">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">E-mail</Form.Label>
					{emailFieldError && (
						<Form.Message className="text-xs text-red-500/80">
							{emailFieldError.message}
						</Form.Message>
					)}
				</div>
				<Form.Control asChild>
					<input
						{...register("email")}
						type="email"
						className="w-full p-2 mt-2 bg-gray-700 rounded-lg border border-gray-600"
					/>
				</Form.Control>
			</Form.Field>
			<Form.Field name="password" className="mt-4">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">Password</Form.Label>
					{passwordFieldError && (
						<Form.Message className="text-xs text-red-500/80">
							{passwordFieldError.message}
						</Form.Message>
					)}
				</div>
				<Form.Control asChild>
					<input
						{...register("password")}
						type="password"
						className="w-full p-2 mt-2 bg-gray-700 rounded-lg border border-gray-600"
					/>
				</Form.Control>
			</Form.Field>
			<Form.Field name="confirmPassword" className="mt-4">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">
						Confirm password
					</Form.Label>
					{confirmPasswordFieldError && (
						<Form.Message className="text-xs text-red-500/80">
							{confirmPasswordFieldError.message}
						</Form.Message>
					)}
				</div>
				<Form.Control asChild>
					<input
						{...register("confirmPassword")}
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

export default SignUp
