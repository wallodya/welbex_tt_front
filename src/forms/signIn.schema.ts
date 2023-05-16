import { z } from "zod"

export const signInSchema = z.object({
	login: z
		.string()
		.min(4, { message: "Too short" })
		.max(20, { message: "Too long" }),
	password: z
		.string()
		.min(4, { message: "Too short" })
		.max(20, { message: "Too long" }),
})

export type SignInSchema = z.infer<typeof signInSchema>
