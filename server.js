if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({ path: './.env' });
}
// require('dotenv').config();
require('dotenv').config({ path: './.env' });
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const indexRouter = require('./routes/index')
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

io.on('connection', socket => {
  console.log('new websocket connection!!...')
  const id = socket.handshake.query.id
  socket.join(id)
  console.log('the socket inside server: ', socket)
  socket.on('send-message', ({ recipients, text}) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r =>
      r !== recipient)
      newRecipients.push(id)
      console.log('emiting:  ', {
        recipients: newRecipients, sender: id, text
      })
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })

  // socket.on('logout', () => {
  //   console.log('we will disconnect from server now')
  //   socket.disconnect();
  //   console.log('the socket is now: ', socket)
  // })
})

// app.post('/logout', async(req, res) => {
//   console.log('got into logout');

// })


app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose!'))


app.use('/', indexRouter)

server.listen(process.env.PORT || 3000)
