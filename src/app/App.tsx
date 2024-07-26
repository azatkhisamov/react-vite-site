import { Route, Routes } from 'react-router-dom'
import Users from '../features/Users/Users'
import './App.css'
import UserPage from '../features/Users/UserPage'
import PostPage from '../features/Posts/PostPage'

function App() {

  return (
    <>
      Hello world
      <Routes>
        <Route path='users' element={<Users />} />
        <Route path='users/:userId' element={<UserPage />} />
        <Route path='posts/:postId' element={<PostPage />} />
      </Routes>

    </>
  )
}

export default App
