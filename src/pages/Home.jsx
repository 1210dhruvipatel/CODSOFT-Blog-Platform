import React, { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const {setId, isAuth, setEdit, setTitle, setPost} = props;
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, 'posts')
  const navigate = useNavigate('');
  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollectionRef)
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPost();
  });
  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
  }
  const editPost = async (id,title,post) =>{
    setEdit(true);
    setId(id);
    setTitle(title);
    setPost(post);
    navigate('/post');
  }
  return (
    <>
      <div className="homepage">
      
        {
          postList.map((post) => {
            return (
              <>
                <div className="card">
                  <div className='heading'>
                    <h2>{post.title}</h2>
                    {isAuth && post.author.id === auth.currentUser.uid ?
                    ( <div>
                    <button onClick={() => { editPost(post.id,post.title,post.post) }}> <MdEdit /> </button>
                    <button onClick={() => { deletePost(post.id) }}> <MdDelete /> </button>
                    </div>
                     )
                    : null}
                  </div>
                  <p>{post.post}</p>
                  <div className='auth'>@ {post.author.name}</div>
                </div>
              </>)
          })
        }
      </div>
    </>
  )
}

export default Home
