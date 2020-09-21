import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import logo from '../mechatlogo.png';
import $ from 'jquery';

const Register = () => {
  const [state , setState] = useState({
    screenName: '',
    email: '',
    password: '',
    passwordCheck: '',
    registered: false,
    error: false
  })

  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const pwRef = React.createRef();
  const pw2Ref = React.createRef();

  const handleChange = e => {
      const {name , value} = e.target
      setState( prevState => ({
          ...prevState,
          [name]: value
      }))
  }

  const formValidate = () => {
    const { screenName, email, password, passwordCheck } = state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = re.test(String(email).toLowerCase());
    if(screenName === ''){
      setErrorFor(nameRef.current, 'Username cannot be blank');
    } else {
      setSuccessFor(nameRef.current);
    }
    
    if(email === '') {
      setErrorFor(emailRef.current, 'Email required');
    } else if(!validEmail) {
      setErrorFor(emailRef.current, 'Email is invalid');
    } else {
      setSuccessFor(emailRef.current)
    }

    if(password === '') {
      setErrorFor(pwRef.current, 'Password required');
    } else if(password.length < 6) {
      setErrorFor(pwRef.current, 'Must contain at least 6 characters');
    } else {
      setSuccessFor(pwRef.current)
    }

    if(passwordCheck === '') {
      setErrorFor(pw2Ref.current, 'Check required');
    } else if(password.length < 6) {
      setErrorFor(pw2Ref.current, 'Must contain at least 6 characters');
    } else if(password !== passwordCheck) {
      setErrorFor(pw2Ref.current, "Passwords don't match");
    } else {
      setSuccessFor(pw2Ref.current)
    }

    const refs = [nameRef, emailRef, pwRef, pw2Ref];
    return refs.every((ref) => {
      const parent = ref.current.parentNode;
      return $(parent).attr('class') === 'formcontrol success';
    })
  }

   const setErrorFor = (ref, message) => {
      const formControl = ref.parentNode;
      const small = formControl.querySelector('small');
      small.innerText = message;
      $(formControl).attr('class', 'formcontrol error');
   }

   const setSuccessFor = (ref) => {
     const formControl = ref.parentNode;
     $(formControl).attr('class', 'formcontrol success');
   }

  const register = (e) => {
    e.preventDefault();
    const valid = formValidate();
    if(!valid) return;
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
      <div className='register-wrap'>
      <div className='register-container'> 
        <div className='mechat-header'><img className='logo' src={logo} />MeChat</div>
        <div className='header'>
          <h3>Register</h3>
        </div>
        <form className='form' id='form'>
          <div className="formcontrol">
            <label htmlFor="name">Username</label>
            <input type="text" 
                    id="screenName" 
                    name="screenName" 
                    onChange={handleChange} 
                    placeholder="Unique name"
                    ref={nameRef}
                    required />
                <i><FontAwesomeIcon className='fa-check-circle' icon={faCheckCircle} /></i>
                <i><FontAwesomeIcon className='fa-exclamation-circle' icon={faExclamationCircle} /></i>
            <small>Error message</small>
          </div>

          <div className="formcontrol">
            <label htmlFor="name">Email</label>
            <input type="email" 
                    id="email" 
                    name="email" 
                    onChange={handleChange} 
                    placeholder="Your email"
                    ref={emailRef}
                    required />
                <i><FontAwesomeIcon icon={faCheckCircle} /></i>
                <i><FontAwesomeIcon icon={faExclamationCircle} /></i>
            <small>Error message</small>
          </div>

          <div className="formcontrol">
            <label htmlFor="name">Password</label>
            <input type="password" 
                    id="password" 
                    name="password" 
                    onChange={handleChange} 
                    placeholder="Keep it a secret"
                    ref={pwRef}
                    required />
                <i><FontAwesomeIcon icon={faCheckCircle} /></i>
                <i><FontAwesomeIcon icon={faExclamationCircle} /></i>
            <small>Error message</small>
          </div>

          <div className="formcontrol">
            <label htmlFor="name">Password Check</label>
            <input type="password" 
                    id="passwordCheck" 
                    name="passwordCheck" 
                    onChange={handleChange} 
                    placeholder="Confirm password"
                    ref={pw2Ref}
                    required />
                <i><FontAwesomeIcon icon={faCheckCircle} /></i>
                <i><FontAwesomeIcon icon={faExclamationCircle} /></i>
            <small>Error message</small>
          </div>
          {
          state.error === true ?
          <div>Username is already taken</div>
          :
          <div></div>
          }
        </form>
        <button className='register-btn' type="submit" onClick={register}>Submit</button>
        <p className='go-login'><Link to='/'>Login</Link></p>
      </div>
      </div>
      :
      <div className='register-wrap'>
        <div className='registered-container'> 
          <div className='register-done'>
            Successfully registered
            <p><Link to='/home'>To Login</Link></p>
          </div>
        </div>
      </div>
      }
    </React.Fragment>
  )
};


export default Register;