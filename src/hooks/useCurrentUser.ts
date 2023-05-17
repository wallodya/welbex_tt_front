import { useEffect, useState } from "react"
import { User, isUserType } from "../auth/user.types"
import JWT from "jwt-client"

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const userToken = JWT.get()
        if (!userToken) {
            return
        }
        const savedUser = JWT.read(userToken)?.claim?.sub
        console.log("user in LS: ", savedUser)
        if (isUserType(savedUser)) {
            setUser(savedUser)
        }
    },[])

    const removeUser = () => {
        JWT.forget()
        setUser(null)
    }

    const setCurrentUser = (userData: User) => {
        // console.log("new user: ", isUserType(userData))
        console.log("new user: ", isLoggedIn)
        setUser(prevState =>
			prevState ? { ...prevState, ...userData } : { ...userData }
		)
        setIsLoggedIn(true)
        console.log("remember: ", isLoggedIn)
    }

    return { user, removeUser, setUser:  setCurrentUser }
}