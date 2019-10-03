const Task = require('../models/task');
const User = require('../models/user');

exports.createTask = (req,res,next)=>{
    const title = req.body.title;
    const deadline = req.body.deadline;
    const content = req.body.content;
    let creator;
    const task = new Task({
        title: title,
        deadline: deadline,
        content: content,
        important: false,
        completed: false,
        creator: req.userId
    });
    task.save()
        .then(result=> {
           return User.findById(req.userId);
        })
        .then(user=> {
            creator = user;
            user.tasks.push(task);
            return user.save()
        })
        .then(result=>{
            res.status(201)
                .json({
                    message: 'Task created successfully',
                    task: task,
                    creator: {
                        _id: creator._id,
                        name: creator.name
                    }
                })
        })
        .catch(err=>console.log(err))
};

exports.fetchTasks = (req,res,next)=>{
    Task.find({creator: req.userId.toString()})
        .then(tasks=>{
            res.status(200)
                .json({
                    tasks:tasks
                })
        })
        .catch(err=>console.log(err))
};

exports.fetchTask = (req,res,next)=>{
    const taskId = req.params.taskId;

    Task.findById(taskId)
        .then(task=>{

            console.log(task);
            return task.updateOne({important: true});
        })
        .then(result=>{
            console.log(result);
            res.status(200)
                .json({
                    task: result,
                    message: 'Changed importance'
                })
        })
        .catch(err=>console.log(err));
};

exports.removeImportances = (req,res,next)=>{
    const taskId = req.params.taskId;

    Task.findById(taskId)
        .then(task=>{

            console.log(task);
            return task.updateOne({important: false});
        })
        .then(result=>{
            console.log(result);
            res.status(200)
                .json({
                    task: result,
                    message: 'Changed importance'
                })
        })
        .catch(err=>console.log(err));
}

exports.addToComplete = (req,res,next)=>{
    const taskId = req.params.taskId;
    Task.findById(taskId)
        .then(task=>{

            return task.updateOne({completed: true});
        })
        .then(result=>{
            console.log(result);
            res.status(200)
                .json({
                    message: 'Deleted post'
                })
        })
        .catch(err=>console.log(err));
};

exports.deleteTask = (req,res,next)=>{
    const taskId = req.params.taskId;
    Task.findOne
}