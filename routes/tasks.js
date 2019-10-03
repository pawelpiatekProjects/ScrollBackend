const express = require('express');
const {body} = require('express-validator/check');

const taskController = require('../controllers/task');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post('/createTask', isAuth,  taskController.createTask);

router.get('/fetchTasks', isAuth, taskController.fetchTasks);

router.get('/fetchTask/:taskId', isAuth,taskController.fetchTask);

router.get('/task/importantRemove/:taskId', isAuth,taskController.removeImportances);

router.get('/task/completed/:taskId', isAuth,taskController.addToComplete);



module.exports = router;