const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    status:{
        type:String,
        default: 'I am new'
    },
    tasks:[
            {
            type: Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    notes:[
        {
            type:Schema.Types.ObjectId,
            ref:'Notes'
        }
    ]
});

module.exports = mongoose.model('User',userSchema);