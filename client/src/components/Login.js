import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthService from '../AuthService';
import decode from 'jwt-decode';
import useLocalStorage from '../hooks/useLocalStorage';
import logo from '../mechatlogo.png';
import $ from 'jquery';



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
  const[screenName, setScreenName] = useLocalStorage('screenName')
  const[contacts, setContacts] = useLocalStorage('contacts')
  const[chatID, setChatID] = useLocalStorage('chatID')
  const[id, setId] = useLocalStorage('id')

  const nameRef = React.createRef();
  const pwRef = React.createRef();

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(state.screenName, state.password)
      .then((token) => {
        let decoded = decode(token);
        // let contacts = JSON.stringify(decoded.contacts)
        setScreenName(decoded.screenName);
        setContacts(decoded.contacts);
        setChatID(decoded.chatID);
        setId(decoded.id);
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
    <>
    <div className='login-wrap'>
      <div className='login-container'> 
        <div className='mechat-header'><img className='logo' src={logo} />MeChat</div>
        <div className='header'>
          <h3>Login</h3>
        </div>
        <form className='form' id='form'>
          <div className="formcontrol">
            <label htmlFor="name">Username</label>
            <input type="text" 
                    id="screenName" 
                    name="screenName" 
                    onChange={handleChange} 
                    placeholder="Username"
                    ref={nameRef}
                    required />
          </div>
          <div className="formcontrol">
            <label htmlFor="name">Password</label>
            <input type="password" 
                    id="password" 
                    name="password" 
                    onChange={handleChange} 
                    placeholder="Password"
                    ref={pwRef}
                    required />
          </div>
        </form>
            {
              state.error
              ? <div className='err-msg'>Invalid credentials you dum dum</div>
              : null
            }
            <button className='login-btn' type="submit" onClick={handleLogin}>Login</button>
            <p className='go-register'><NavLink to='/register'> Register </NavLink></p>
        </div>
      </div>
    </>
  )
};


export default Login;