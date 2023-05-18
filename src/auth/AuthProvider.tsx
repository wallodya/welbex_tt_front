import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { User, UserContextValue, isUserType } from "./user.types"
import JWT from "jwt-client"

const initialContext: UserContextValue = {
    user: {
        uuid: "",
        email: "",
        login: "",
        createdAt: 0
    },
    isLoggedIn: false,
    setCurrentUser: (userData: User) => {
        console.log("set user: ", userData)
    },
    removeUser: () => {
        console.log("removeUser")
    }
}

const AuthContext = createContext(initialContext)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const userToken = JWT.get()
        if (!userToken || !JWT.validate(JWT.read(userToken))) {
            JWT.forget()
            return
        }
        const savedUser = JWT.read(userToken)?.claim?.sub
        if (isUserType(savedUser)) {
            setUser(savedUser)
        }
    },[])

    const removeUser = () => {
        JWT.forget()
        setUser(null)
    }

    const setCurrentUser = (userData: User) => {
        setUser(prevState =>
			prevState ? { ...prevState, ...userData } : { ...userData }
		)
    }

    const contextValue: UserContextValue = {
        user,
        isLoggedIn: !!user,
        setCurrentUser,
        removeUser
    }

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider