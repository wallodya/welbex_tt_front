import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { getPostsAmount, getPostsForPage } from "./feed.api"
import { PostType } from "./feed.types"

export const POSTS_PER_PAGE = 20
const PAGE_LS_NAME = "page"

const usePageAmount = () => {
    const [pageCount, setPageCount] = useState<number>(0)
    const [postsCount, setPostsCount] = useState<number>(0)

    useQuery("page-count", getPostsAmount, {
        onError: () => {
            setPageCount(0)
        },
        onSuccess: (data) => {
            setPageCount(Math.ceil(data / POSTS_PER_PAGE))
            setPostsCount(data)
        }
    })

    return { postsCount, pageCount }
}

export const usePostsForPage = (page: number): PostType[] => {
    const [posts, setPosts] = useState<PostType[]>([])
    useQuery(["feed-page", page], () => getPostsForPage(page), {
        onSuccess: (data) => {
            setPosts([...data])
        }
    })
    return posts
}

export const usePagination = () => {
    const { pageCount, postsCount } = usePageAmount()

    const [page, setPage] = useState(0)
    const [isFirst, setIsFirst] = useState(true)
    const [isLast, setIsLast] = useState(true)

    const forward = () => {
        if (page === pageCount - 1) {
            return
        }

        setPage(page + 1)
        localStorage.setItem(PAGE_LS_NAME, String(page + 1))
    }
    
    const back = () => {
        if (page === 0) {
            return
        }
        
        setPage(page - 1)
        localStorage.setItem(PAGE_LS_NAME, String(page - 1))
    }

    useEffect(() => {
        if (page === 0) {
            setIsFirst(true)
        } else {
            setIsFirst(false)
        }

        if (page === pageCount - 1) {
            setIsLast(true)
        } else {
            setIsLast(false)
        }

        if (page < 0) {
            setPage(0)
        }
    },[page, pageCount])

    useEffect(() => {
        const savedPage = Number(localStorage.getItem("page"))
        if (savedPage) {
            setPage((savedPage))
        }
    },[])

    return {
        currentPage: page,
        pageCount,
        postsCount,
        forward,
        back,
        isFirst,
        isLast
    }
}
