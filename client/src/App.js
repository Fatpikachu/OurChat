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


function App() {
  // const [user, setUser] = useState(() => {
  //   return false
  // });
  

  const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      AuthService.loggedIn() === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );
  return (
    <div className="App">
    <HashRouter>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <ProtectedRoute exact path='/home' component={Home} />
      <Route exact path='/unauthorized' component={Unauthorized} />
    </HashRouter>
    </div>
  );
}

export default App;
