import { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
const PostList = () => {
	const [posts, setPosts] = useState({})
	const fetchPosts = async () => {  
		const { data } = await axios.get('http://posts.com/posts')
		setPosts(data)
	}
	useEffect(() => {
		fetchPosts()
	}, [])

	const renderedPosts = Object.values(posts).map(post => {
		return <div className='border rounded-lg p-3 min-w-32 mb-5' key={post.id}>
      <div className='text-lg'>{post.title}
			<CommentList comments={post.comments} />
			<CommentCreate postId={post.id}/>
			</div>
    </div>
	})
	return <div className='flex gap-9 mt-8 flex-wrap justify-between'>{renderedPosts}</div>
}

export default PostList
