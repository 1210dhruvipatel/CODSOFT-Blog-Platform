import React from 'react'
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config'

const Nav = (props) => {
    const {isAuth,setAuth} = props;
    const logout = () =>{
        signOut(auth).then(()=>{
            localStorage.clear();
            setAuth(false);
            window.location.pathname='/login'
        }).catch(err=>{
            console.log(err.code);
            console.log('logout error')
        })
    }
    return (
        <>
            <nav className='navb'>
                <div>Blog Point</div>
                <div>
                <Link to='/'>Home</Link>
                {isAuth ? <Link to='/post'>Create Post</Link> : null }
                </div>
                {!isAuth ? <Link to='/login'>Login</Link> : <div onClick={logout}>Log Out</div>}
            </nav>
        </>
    )
}

export default Nav
