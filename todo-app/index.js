const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index.route')
const todoRouter = require('./routes/todo.route')
const bodyParser =require('body-parser')

const URL = ''

mongoose.connect(URL).then(() =>{
    console.log('Connection Successful!');
},(err) =>{
    console.log('Connection Error',err)
})

app.listen(5000);
app.use(cors())
app.use(bodyParser.urlencoded({extended :false}));

app.use('/',indexRouter);
app.use('/todos',todoRouter);