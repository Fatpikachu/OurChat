import React, { useState } from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Redirect,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AuthService from './AuthService.js'
import Unauthorized from './components/Unauthorized';
import axios from 'axios';
import { ContactsProvider } from './contexts/ContactsProvider'
import { ConversationsProvider } from './contexts/ConversationsProvider'
import useLocalStorage from './hooks/useLocalStorage'
import { SocketProvider } from './contexts/SocketProvider';


function App() {
  // const [user, setUser] = useState(() => {
  //   return false
  // });
  const[id, setId] = useLocalStorage('id')
  // const id = localStorage.getItem('id')
  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      AuthService.loggedIn() === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );

  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      AuthService.loggedIn() === true
        ? <Redirect to='/home' />
        : <Component {...props} />
    )} />
  );

  return (
    <>
      {/* <SocketProvider id={id}> */}
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <div className="App">
            <HashRouter>
              <PublicRoute exact path='/' component={Login} />
              <PublicRoute exact path='/register' component={Register} />
              <ProtectedRoute exact path='/home' component={Home} />
              <Route exact path='/unauthorized' component={Unauthorized} />
            </HashRouter>
            </div>
          </ConversationsProvider>
        </ContactsProvider>
      {/* </SocketProvider> */}
    </>
  );
}

export default App;
