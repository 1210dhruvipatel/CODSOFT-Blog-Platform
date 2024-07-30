import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import Nav from './Nav';
import './index.css';

const App = () => {
  const [isAuth,setAuth] = useState(localStorage.getItem('auth'));
  const [google, setGoogle] = useState(false)
  const [username, setUsername] = useState('');
  const [edit,setEdit] = useState(false);
  const [id,setId] = useState('');
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('');
  return (
    <>
      <Router>
      <Nav isAuth={isAuth}
        setAuth={setAuth}
      />
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth} setEdit={setEdit} setId={setId} setTitle={setTitle} setPost={setPost} title={title} post={post} />} />
          <Route path='/login' element={<Login setAuth={setAuth} setGoogle={setGoogle} setUsername={setUsername} />} />
          <Route path='/post' element={<Post google={google} username={username} isAuth={isAuth} setEdit={setEdit} edit={edit} id={id} setTitle={setTitle} setPost={setPost} title={title} post={post} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
