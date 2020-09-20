const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidV4 } = require('uuid');


router.post('/login', async(req, res) => {
  const { screenName, password } = req.body;
  const someone = await User.findOne({screenName: screenName})
  if(someone == null){
    return res.status(400).send('Wrong login credentials')
  }
  try {
    if(await bcrypt.compare(password, someone.password)){
      const token = jwt.sign({ id: someone._id, 
        chatID: someone.chatID,
        screenName: someone.screenName,
        contacts: someone.contacts}, 'secret', { expiresIn: 129600 });
      res.json(token);
    } else {
      res.status(400).send('Wrong login credentials')
    }
  } catch {
    res.status(500).send()
  }
})

router.post('/register', async(req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const user = new User({
    chatID: uuidV4(),
    screenName: req.body.screenName,
    email: req.body.email,
    password: hashedPassword
  })
  user.contacts.push({id: '5f5de45102b6a103f6457006', name:'OurChat Support'});
  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (err) {
    console.log(err)
    res.status(400).send({message: err})
  }
})

router.post('/contacts', async(req, res) => {
  const { id, newContact } = req.body;
  const friend = await User.findById(newContact)
    User.findByIdAndUpdate(id,
      {$push: {contacts: {id: newContact, name: friend.screenName}}},
      function(err, doc) {
          if(err){
            console.log(err);
          }else{
            res.send({doc})
          }
      }
  );
})

router.get('/contacts/:userID', async(req, res) => {
  const id = req.params.userID;
  try{
    const someone = await User.findById(id)
    res.json(someone)
  } catch(err){
    res.status(400).send({message: err})
  }
})

router.post('/logout', async(req, res) => {
  const { socket } = req.body;
  sockets.disconnectUser = function(user_id){
    sockets.socket(users[user_id]).disconnect();
  }
  sockets.disconnectUser(socket);
})

router.get("/", (req, res) => {
  res.send({response: 'server is up and running'}).status(200);
})


module.exports = router