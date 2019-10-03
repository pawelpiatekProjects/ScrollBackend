const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        important:{
            type: Boolean,
            required: true
        },
        completed:{
            type: Boolean,
            required: true
        },
        creator:{
            type:Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model('Task',taskSchema);