const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidV4 } = require('uuid');


router.post('/login', async(req, res) => {
  console.log('reached login endpoint')
  const { screenName, password } = req.body;
  console.log('the data: ', screenName, password)
  const someone = await User.findOne({screenName: screenName})
  if(someone == null){
    return res.status(400).send('Wrong login credentials')
  }
  try {
    if(await bcrypt.compare(password, someone.password)){
      const token = jwt.sign({ id: someone.id, 
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
  console.log('reached register endpoint')
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const user = new User({
    chatID: uuidV4(),
    screenName: req.body.screenName,
    email: req.body.email,
    password: hashedPassword
  })
  user.contacts.push('OurChat Support');
  try {
    const savedUser = await user.save()
    console.log('the saved user:  ', savedUser)
    res.json(savedUser)
  } catch (err) {
    console.log(err)
    res.status(400).send({message: err})
  }
})



module.exports = router