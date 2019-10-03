const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        creator:{
            type:Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
)

module.exports = mongoose.model('Note',notesSchema);