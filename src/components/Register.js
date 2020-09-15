import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../AuthService';

const Register = () => {
  const [state , setState] = useState({
    screenName: '',
    email: '',
    password: '',
    registered: false,
    error: false
  })

  const handleChange = e => {
      const {name , value} = e.target
      setState( prevState => ({
          ...prevState,
          [name]: value
      }))
  }

  const register = (e) => {
    e.preventDefault();
    const { screenName, email, password } = state;
    AuthService.register(screenName, email, password)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          error: false,
          registered: true
        }))
      }).catch(err => {
        console.log('error registering: ', err)
        setState(prevState => ({
          ...prevState,
          error: true
        }))
        console.error(err)
      });
    }

  return (
    <React.Fragment>
      {
        state.registered === false ?
      <div> 
        <h1>Register</h1>
        <div>
          <label htmlFor="name">Username</label>
          <input type="text" id="screenName" name="screenName" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="name">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} required />
        </div>
        <button type="submit" onClick={register}>Register</button>
        {
          state.error === true ?
          <div>Username is already taken</div>
          :
          <div></div>
        }
        <p><Link to='/'>Login</Link></p>
      </div>
      :
      <div>
        Successfully registered
        <p><Link to='/'>Go Login</Link></p>
      </div>
      }
    </React.Fragment>
  )
};


export default Register;