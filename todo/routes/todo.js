const router = require('express').Router();
const Todo = require('../models/Todo');


//routes
router.post('/add/todo',(req,res)=>{//새로운 Todo 추가
    const {todo} = req.body;
    const newTodo = new Todo({
        todo:todo
    })
    //save Todo
    newTodo.save()
    .then(()=>{
        console.log('successfully added todo')
        res.redirect('/')
    })
    .catch((err)=>{
        res.render('error.ejs');
        console.log(err);
    })
})

.get("/delete/todo/:_id",(req,res)=>{
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(() =>{
        console.log("deleted!")
        res.redirect('/')
    })
    .catch((err)=>{
        res.render('error.ejs');
        console.log(err);
    })
})

.get('/update/todo/:_id',(req,res)=>{
    Todo.findOne({_id:req.params._id},(err,todo)=>{
        if(err) return res.json(err);
        res.render('update.ejs',{todo:todo});
    });
})

.post('/update/todo/:_id',(req,res)=>{
    Todo.updateOne({_id:req.params._id},
        { $set: {
            todo:req.body.todo
        }},
        (err,todo)=>{
            if(err) return res.json(err);

            res.redirect('/')
        });
})

.post('/update/isCompleted/:_id',(req,res)=>{
    Todo.updateOne({_id:req.params._id},
        { $set: {
            isCompleted:true
        }},
        (err,todo)=>{
            if(err) return res.json(err);

            res.redirect('/')
        });
})


module.exports = router;