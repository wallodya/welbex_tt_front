import Pagination from './Pagination'
import Post, { PostProps } from './Post'

const posts: PostProps[] = [
    {
        text: "hello",
        mediaURL: "",
        author: "user1",
        createdAt: Date.now()
    },
    {
        text: "hello",
        mediaURL: "",
        author: "user1",
        createdAt: Date.now()
    },
    {
        text: "hello",
        mediaURL: "",
        author: "user1",
        createdAt: Date.now()
    },
]

const Feed = () => {
  return (
    <div className='min-h-screen flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {posts.map(post => <Post {...post}/>)}
        <div className='flex justify-center items-center mt-12'>
            <Pagination/>
        </div>
    </div>
  )
}

export default Feed