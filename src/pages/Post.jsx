import React, { useEffect } from 'react';
import { addDoc, collection, updateDoc, doc} from 'firebase/firestore'
import { db,auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Post = (props) => {
  const {username,google, isAuth, edit, id, setEdit, title, post, setTitle, setPost} = props

  useEffect(()=>{
    if(!isAuth){
      navigate('/login');
    }
  })
  
  let navigate = useNavigate('')

  const postCollectionRef = collection(db,'posts')
  const createPost = async()=>{
    const name = auth.currentUser.displayName
    await addDoc(postCollectionRef, {title,post, author:{name: google? name : username, id:auth.currentUser.uid}})
    navigate('/')
  }
  const updatePost = async()=>{
    const editDoc = doc(db, 'posts', id)
    updateDoc(editDoc,{title,post})
    setEdit(false)
    navigate('/')
  }

  return (
    <>
      <div className="create">
        <div className="cpContener">
          <h1>Create a Post</h1>
          <div className="inputGrp">
            <input className='input'
              type="text"
              placeholder='Title'
              value={title}
              onChange={(e) => { setTitle(e.target.value) }} />
            <textarea
              className='input textarea'
              placeholder='Post'
              rows='7'
              value={post}
              onChange={(e) => { setPost(e.target.value) }} />
          </div>
          {edit? <button className='subBtn' onClick={updatePost}>Edit Post</button> : <button className='subBtn' onClick={createPost}>Submit Post</button>}
        </div>
      </div>
    </>
  )
}

export default Post
