const Note = require('../models/notes');
const User = require('../models/user');

exports.createNote=(req,res,next)=>{
    const title=req.body.title;
    const content=req.body.content;
    let creator;
    const note = new Note({
        title:title,
        content:content,
        creator: req.userId
    });
    note.save()
        .then(result=> {
            return User.findById(req.userId);
        })
        .then(user=> {
            creator = user;
            user.notes.push(note);
            return user.save()
        })
        .then(result=>{
            res.status(200)
                .json({
                    message: 'Added note',
                    note:note,
                    creator: {
                        _id: creator._id,
                        name: creator.name
                    }
                })
        })
        .catch(err=>console.log(err))
};

exports.fetchNotes = (req,res,next)=>{
    Note.find({creator: req.userId.toString()})
        .then(result=>{
            res.status(200)
                .json({
                    message:'Fetched notes',
                    notes: result
                })
        })
        .catch(err=>console.log(err));
};

exports.deleteNote = (req,res,next)=>{
    const noteId = req.params.taskId;

    Note.findOneAndDelete(noteId)
        .then(result=>{
            res.status(200)
                .json({
                    message: 'deleted note'
                })
        })
        .catch(err=>console.log(err));
}