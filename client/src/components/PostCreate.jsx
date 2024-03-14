import { useState } from "react"
import axios from 'axios'
const PostCreate = () => {
  const [title, setTitle] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()

    await axios.post('http://posts.com/posts/create', {
      title
    })

    setTitle('')
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="flex items-baseline justify-center gap-8">
        <div className="form-group flex gap-4 items-center">
          <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="form-control rounded-lg p-2" />
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate