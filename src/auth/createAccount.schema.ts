import { z } from "zod"

export const createAccountSchema = z
	.object({
		login: z
			.string()
			.min(4, { message: "Too short" })
			.max(20, { message: "Too long" }),
		email: z.string().email(),
		password: z
			.string()
			.min(4, { message: "Too short" })
			.max(20, { message: "Too long" }),
		confirmPassword: z
			.string()
			.min(4, { message: "Too short" })
			.max(20, { message: "Too long" }),
	})
	.refine(
		data => {
			if (data.password !== data.confirmPassword) {
				return false
			}
			return true
		},
		{ message: "Passwords don't match" }
	)

export type CreateAccountSchema = z.infer<typeof createAccountSchema>