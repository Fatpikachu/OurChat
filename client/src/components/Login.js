import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthService from '../AuthService';
import decode from 'jwt-decode';


const Login = props => {
  const [state , setState] = useState({
    screenName: '',
    password: '',
    error: false
  })

  const handleChange = (e) => {
      const {name, value} = e.target
      setState(prevState => ({
          ...prevState,
          [name]: value
      }))     
  }

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(state.screenName, state.password)
      .then((token) => {
        let decoded = decode(token);
        localStorage.setItem('screenName', decoded.screenName);
        localStorage.setItem('contacts', decoded.contacts);
        localStorage.setItem('chatID', decoded.chatID);
        setState(prevState => ({
          ...prevState,
          error: false
        }))
      }).then(()=>{
          props.history.push('/home')
        })
      .catch(err => {
        setState(prevState => ({
          ...prevState,
          error: true
      }))
    })
  }

  return (
    <div>     
        <h1>Login</h1>
        <div>
          <label htmlFor="screenName">Username</label>
          <input onChange={handleChange} type="text" id="screenName" name="screenName" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} type="password" id="password" name="password" required />
        </div>
        <button type="submit" onClick={handleLogin}>Login</button>
        <p><NavLink to='/register'> Register </NavLink></p> 
        {
        state.error
        ? <div>Email/password invalid</div>
        : <div></div>
        }  
    </div>
  )
};


export default Login;