import React from 'react';
import AuthService from '../AuthService';
import Sidebar from './Sidebar';

const Home = props => {
  const handleLogout = () => {
    AuthService.logout();
    props.history.replace('/');
  }
  return (
    <div>     
        <button onClick={handleLogout}>Logout! </button>
        <Sidebar />
    </div>
  )
};


export default Home;