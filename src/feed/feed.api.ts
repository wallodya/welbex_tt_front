import { fetchData } from "../utils/baseFetch"
import { PostSchema } from "./Post/Form/post.schema"
import { PostType, isPageAmountData, isPost } from "./feed.types"
import JWT from "jwt-client"

export const getPostsForPage = async (page: number): Promise<PostType[]> => {
    const posts = await fetchData(`/forum?page=${page}`, { method: "GET" })
    if (!Array.isArray(posts) || posts.some(post => !isPost(post))) {
        throw new Error("Invalid posts data")
    }
    return posts
}

export const getPostsAmount = async (): Promise<number> => {
    const data = await fetchData(`/forum/amount`, { method: "GET" })

    if (!isPageAmountData(data)) {
        throw new Error("Invalid page amount data")
    }

    return data.messagesAmount
}

export const savePost = async (postData: PostSchema) => {
    const accessToken = JWT.get()?.replace("Bearer ", "")
    const postRes = await fetch(`${import.meta.env.VITE_API_URL}/forum`, {
		method: "POST",
		body: JSON.stringify(postData),
		headers: {  
            "Content-Type": "application/json",
            "authorization": accessToken
        },
	})

    const post = await postRes.json()
    
    if (!isPost(post)) {
        throw new Error("Invalid post data")
    }

    // if (postData.media) {
    //     const mediaData = new FormData()
    //     mediaData.append("media", postData.media)
    //     mediaData.append("postId", post.uniqueMessageId)
    //     await fetch(`${import.meta.env.VITE_API_URL}/forum/file`, {
    //         method: "POST",
    //         body: JSON.stringify(mediaData),
    //         headers: {  
    //             "Content-Type": "multipart/form-data",
    //             "authorization": accessToken
    //         },
    //     })
    // }
    
    return post
}

export const updatePost = async (postData: PostSchema & { authorId: string, postId: string }) => {
    const post = await fetchData(`/forum`, {
		method: "PATCH",
		body: JSON.stringify(postData),
	})
    
    if (!isPost(post)) {
        throw new Error("Invalid post data")
    }
    
    return post
}
export const deletePost = async (postId: string) => {
    const post = await fetchData(`/forum?postid=${postId}`, { method: "DELETE" })
    
    return post
}
