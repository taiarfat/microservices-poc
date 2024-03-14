import axios from 'axios'
import { useState } from 'react'

const CommentCreate = ({postId}) => {
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    await axios.post(`http://posts.com/posts/${postId}/comments`, {content})
    setContent('')
  }

  return (
    <div className='mt-6'>
      <form onSubmit={onSubmit}>
        <div className="form-group flex gap-4 items-center">
          <label>New comment</label>
          <input className="form-control" value={content} onChange={e => setContent(e.target.value)}/>
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  )
}

export default CommentCreate