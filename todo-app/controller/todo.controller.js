const Todo= require('../models/todo.model')

const index = (req,res)=>{
    res.send('Blank page was hit -> /todo')
}

const addTodo = async (req, res) =>{
    const {title, status} = req.body
    const todoObj = new Todo({title, status})
    const result= await todoObj.save()
    res.status(201).json({body: todoObj.toObject()})
}


const getTodos = async (req, res) =>{
    const todos= await Todo.find();
    res.status(201).json({body : {todos}})
}

const getPending = async (req, res) =>{
    const pending= await Todo.find({status: 'pending'})
    res.status(201).json({body: {pending}})
}

const getInprogress = async (req, res) =>{
    const inProgress= await Todo.find({status: 'inProgress'})
    res.status(201).json({body: {inProgress}})
}

const getCompleted = async (req, res) =>{
    const completed= await Todo.find({status: 'completed'})
    res.status(201).json({body: {completed}})
}

const changeStatus = async (req, res) =>{
    const {todoId , status} = req.body
    const todo= await Todo.findById(todoId)
    const updateStatus= await Todo.findByIdAndUpdate(todo, {status})
    res.status(200).send("Updated the todo Status")
}

module.exports = {index, addTodo, getTodos, getPending, getInprogress, getCompleted, changeStatus}
