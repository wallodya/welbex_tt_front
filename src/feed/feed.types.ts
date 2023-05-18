export type PostType = {
    uniqueMessageId: string,
    text: string,
    mediaURL: string,
    createdAt: number,
    author: {
        login: string,
        uuid: string
    }
}

export type PostContextValue = {
    post: PostType,
    editPost: (postData: InitialFormValues) => void,
    currentPage: number
}

export type PageAmountData = {
    messagesAmount: number
}

export type InitialFormValues = {
	authorId: string
	text: string
	postId: string
}

export type PostFormContext = {
    isOpen: boolean,
    closeForm: () => void,
    toggleForm: (open: boolean) => void,
    openForm: () => void,
    action: "edit" | "new",
    initialValues: InitialFormValues| null
}

export const isPost = (obj: unknown): obj is PostType => {
    return (
		typeof obj === "object" &&
		obj !== null &&
		"uniqueMessageId" in obj &&
		typeof obj.uniqueMessageId === "string" &&
        "text" in obj &&
        (typeof obj.text === "string" || obj.text === null) &&
        "mediaURL" in obj &&
        (typeof obj.mediaURL === "string" || obj.mediaURL === null)&&
        "createdAt" in obj &&
        typeof obj.createdAt === "number" &&
        "author" in obj &&
        typeof obj.author === "object" &&
        obj.author !== null &&
        "uuid" in obj.author &&
        typeof obj.author.uuid === "string" &&
        "login" in obj.author &&
        typeof obj.author.login === "string"
	)
}

export const isPageAmountData = (obj: unknown): obj is PageAmountData => {
    return (
		typeof obj === "object" &&
		obj !== null &&
		"messagesAmount" in obj &&
		typeof obj.messagesAmount === "number" &&
		obj.messagesAmount >= 0
	)
}
