import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AuthService from '../AuthService'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
import { useSocket } from '../contexts/SocketProvider';
import { useHistory } from "react-router-dom";
import logo from '../mechatlogo.png';

export default function Ribbon() {
  const socket = useSocket()
  let history = useHistory()
  const handleLogout = () => {
    
    // AuthService.logout(socket.id);
    // socket.emit('logout')
    console.log('the socket before d/c  ', socket)
    socket.disconnect();
    socket.close();
    localStorage.clear()
    history.push("/")
    console.log('the socket after d/c  ', socket)
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