import React from 'react';
import AuthService from '../AuthService';
import Sidebar from './Sidebar';
import { ContactsProvider } from '../contexts/ContactsProvider'

const Home = props => {
  const handleLogout = () => {
    AuthService.logout();
    props.history.replace('/');
  }
  return (
    <>  
      <ContactsProvider>
        <button className='float-right' onClick={handleLogout}>Logout! </button>
        <div className='d-flex' style={{ height: '100vh '}}>
          <Sidebar />
        </div>
      </ContactsProvider>
    </>  
  )
};


export default Home;