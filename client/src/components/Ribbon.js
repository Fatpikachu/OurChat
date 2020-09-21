import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AuthService from '../AuthService'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
// import { useSocket } from '../contexts/SocketProvider';
import { useHistory } from "react-router-dom";
import logo from '../mechatlogo.png';

export default function Ribbon(props) {
  let history = useHistory()
  // const socket = useSocket()
  // console.log('the socket in ribbon: ', socket)
  const handleLogout = () => {
    // AuthService.logout(socket.id);
    // socket.emit('logout')
    // socket.disconnect();
    localStorage.clear()
    // console.log('disconnected from client side')
    // props.history.replace('/');
    history.push("/")
    // console.log('the socket now is  ', socket)
  }
  return ( 
    <>
      <div className='ribbon'>
        <div className='mechat-ribbon'><img className='logo' src={logo} />MeChat</div>
          <Button className='logout float-right' variant="secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>{' '}
      </div>
    </> 
  ) 
};