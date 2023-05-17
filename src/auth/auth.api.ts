import { fetchData } from "../utils/baseFetch";
import { CreateAccountSchema } from "./createAccount.schema";
import { SignInSchema } from "./signIn.schema";
import { isUserType } from "./user.types";

export const signIn = async (userData: SignInSchema) => {
    const res = await fetchData("/auth/login", {
		method: "POST",
		body: JSON.stringify(userData),
	})

    if (!isUserType(res)) {
        throw new Error("User object is invalid")
    }

    return res
}

export const signUp = async (userData: CreateAccountSchema) => {
    const res = await fetchData("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    })

    if (!isUserType(res)) {
        throw new Error("User object is invalid")
    }

    return res
}

export const signOut = async () => {
    await fetchData("/auth/sign-out", { method: "DELETE" })
    return
}
