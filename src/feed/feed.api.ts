import { fetchData } from "../utils/baseFetch"
import { PostSchema } from "./Post/Form/post.schema"
import { PostType, isPageAmountData, isPost } from "./feed.types"

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

export const savePost = async (postData: PostSchema & {authorId: string}) => {
    const post = await fetchData(`/forum`, {
		method: "POST",
		body: JSON.stringify(postData),
	})
    
    if (!isPost(post)) {
        throw new Error("Invalid post data")
    }
    
    return post
}

export const updatePost = async (postData: PostSchema & {authorId: string, postId: string}) => {
    const post = await fetchData(`/forum`, {
		method: "PUT",
		body: JSON.stringify(postData),
	})
    
    if (!isPost(post)) {
        throw new Error("Invalid post data")
    }
    
    return post
}
export const deletePost = async (postId: string) => {
    const post = await fetchData(`/forum?postid=${postId}`, { method: "DELETE" })
    
    if (!isPost(post)) {
        throw new Error("Invalid post data")
    }
    
    return post
}
