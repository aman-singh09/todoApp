const express = require('express')
const router = express.Router()
const todoController = require('../controller/todo.controller')

router.get('/',todoController.index)
router.post('/addTodo',todoController.addTodo)

router.get('/getTodos',todoController.getTodos)
router.get('/getPending',todoController.getPending)
router.get('/getInprogress',todoController.getInprogress)
router.get('/getCompleted',todoController.getCompleted)

router.post('/changeStatus',todoController.changeStatus)

module.exports = router;