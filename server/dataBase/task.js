const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    id:Number,
    task:String,
    checked:Boolean,
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("tasks",taskSchema)