if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config({ path: '../.env' });
}
// require('dotenv').config();
require('dotenv').config({ path: '../.env' });
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const indexRouter = require('./routes/index')


app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose!'))




app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
