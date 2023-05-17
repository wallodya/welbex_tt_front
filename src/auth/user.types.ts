export type UserToken = {
    login: string,
    uuid: string
}

export type User = {
    uuid: string;
    email: string;
    login: string;
    createdAt: number;
}

export const isUserType = (obj: unknown): obj is User => {
    return (
		typeof obj === "object" &&
		obj !== null &&
		"uuid" in obj &&
		typeof obj.uuid === "string" &&
		"email" in obj &&
		typeof obj.email === "string" &&
		"login" in obj &&
		typeof obj.login === "string" &&
		"createdAt" in obj &&
		typeof obj.createdAt === "number"
	)
}