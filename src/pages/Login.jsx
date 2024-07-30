import React, { useState } from 'react'
import { auth, provider } from '../firebase-config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa'

const Login = (props) => {
  let navigate = useNavigate()
  const { setAuth, setGoogle, setUsername } = props
  const [login, setLogin] = useState(false)


  const signInWithGoogle = async () => {
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      await signInWithPopup(auth, provider)
      localStorage.setItem('auth', true)
      setAuth(true)
      navigate('/');
      setGoogle(true)
    } catch (err) {
      alert(err.message);
    }
  }
  const handalSubmit = (e, type) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    setUsername(e.target.username.value);
    if (type === 'signup') {
      createUserWithEmailAndPassword(auth, email, password).then(data => {
        console.log(data, 'authData')
        navigate('/login')
        setLogin(true)
      }).catch(err => {
        alert(err.code)
        setLogin(true)
      })
    } else {
      signInWithEmailAndPassword(auth, email, password).then(data => {
        console.log(data, 'authData')
        localStorage.setItem('auth', true)
        setAuth(true)
        navigate('/')
        setGoogle(false)
      }).catch(err => {
        alert(err.code)
        setLogin(false)
      })
    }
  }
  return (
    <>
      <div className='login_page'>
        <div className="login">
          <div className="google">
            <p>Sign In with Google to Continue</p>
            <button className='btn' onClick={signInWithGoogle}><FaGoogle />  Sign In with Google</button>
          </div>
          <div className='signup'>
            <h1>{login ? 'Sign in' : 'Sign up'}</h1>
            <form autoComplete='off' onSubmit={(e) => { handalSubmit(e, login ? 'signin' : 'signup') }}>

              <input autoComplete='off' autoCapitalize='on' type="text" name="username" placeholder='Username' id="" />
              <input autoComplete='off' type="text" name="email" placeholder='Email' id="" />
              <input autoComplete='off' type="password" name="password" placeholder='Password' id="" />
              <button className='btn'>{login ? 'sign in' : 'sign up'}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
