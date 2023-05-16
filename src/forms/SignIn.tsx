import * as Form from "@radix-ui/react-form"
import Button from "../components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema, signInSchema } from "./signIn.schema"

const SignIn = () => {

    const { register, formState, handleSubmit } = useForm<SignInSchema>({ resolver: zodResolver(signInSchema) })

    const onSubmit = (data: SignInSchema) => {
        console.log(data)
    }

	return (
		<Form.Root autoComplete="off">
			<Form.Field name="login">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">Login</Form.Label>
					<Form.Message className="text-xs text-red-500/80">
						{formState.errors.login?.message}
					</Form.Message>
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
					<Form.Message className="text-xs text-red-500/80">
						{formState.errors.password && formState.errors.password.message}
					</Form.Message>
				</div>
				<Form.Control asChild>
					<input
                        {...register("password")}
						type="password"
						className="w-full p-2 mt-2 bg-gray-700 rounded-lg border border-gray-600"
					/>
				</Form.Control>
			</Form.Field>
			<Form.Submit onSubmit={handleSubmit(onSubmit)} asChild>
				<div className="mt-8 w-full">
					<Button disabled={!formState.isValid}>Sign in</Button>
				</div>
			</Form.Submit>
		</Form.Root>
	)
}

export default SignIn
