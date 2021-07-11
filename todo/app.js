const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const indexRoute = require('./routes/index')
const todoRoute = require('./routes/todo');


const app = express();
var uri = 'mongodb://localhost:27017/todo';

//mongodb connect
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//middleware
app.use(express.urlencoded({extends:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

//server
app.use(indexRoute);
app.use(todoRoute);
app.use(methodOverride('_method'));

app.get('*',(req,res)=>{
    res.send("Invalid Page");
})

app.listen(3000,()=>{
    console.log('ready on 3000')
})