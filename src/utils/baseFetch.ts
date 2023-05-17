import JWT from "jwt-client"

const BASE_URL = import.meta.env.VITE_API_URL
const AUTH_HEADER_NAME = "authorization"


export const fetchData = async (path: string, options?: RequestInit) => {
	const accessToken = JWT.get()?.replace("Bearer ", "")
	const data = await fetch(`${BASE_URL}${path}`, {
		...options,
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			[AUTH_HEADER_NAME]: accessToken,
		},
	})

    
	const newAccessToken = data.headers.get(AUTH_HEADER_NAME)
    
	if (newAccessToken) {
        JWT.keep(JWT.read(newAccessToken))
	}

    const contentType = data.headers.get("content-type");
    if (!contentType || contentType.indexOf("application/json") === -1) {
        return data
    }

	return await data.json()
}