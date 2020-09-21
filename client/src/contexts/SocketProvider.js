import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()
const localEndpoint = 'http://localhost:3000'
const heroku = 'https://mechat-fatkid.herokuapp.com'

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }){
  const [socket, setSocket] = useState()

  useEffect(() => {
    if(id){
      const newSocket = io(heroku, { query: { id } })
      setSocket(newSocket)
      return () => newSocket.close()
    }
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}