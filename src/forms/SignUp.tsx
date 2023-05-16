import * as Form from "@radix-ui/react-form"
import Button from "../components/ui/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createAccountSchema } from "./createAccount.schema"


const SignUp = () => {
	const { register } = useForm({ resolver: zodResolver(createAccountSchema) })

	return (
		<Form.Root>
			<Form.Field name="login">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">Login</Form.Label>
					<Form.Message className="text-xs text-red-500/80">
						Required
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
			<Form.Field name="email" className="mt-4">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">Password</Form.Label>
					<Form.Message className="text-xs text-red-500/80">
						Required
					</Form.Message>
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
					<Form.Message className="text-xs text-red-500/80">
						Required
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
			<Form.Field name="confirmPassword" className="mt-4">
				<div className="flex justify-between items-baseline">
					<Form.Label className="text-sm">Password</Form.Label>
					<Form.Message className="text-xs text-red-500/80">
						Required
					</Form.Message>
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
					<Button>Sign in</Button>
				</div>
			</Form.Submit>
		</Form.Root>
	)
}

export default SignUp
