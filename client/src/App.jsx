import './App.css'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

function App() {

  return (
    <>
      
      <h1 className='font-bold h1 text-xl'>Create a post</h1>
      <PostCreate />
      <PostList />
    </>
  )
}

export default App
