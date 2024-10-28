const express = require('express')
const router = express.Router()
const tasks = require('./dataBase/task')
const mongoose = require('mongoose')


main().catch(err => console.log(err.message))

async function main() {
    await mongoose.connect("mongodb://localhost/todorb")
}

router.route('/')
    .get(async(req,res)=>{
        const demo = await tasks.find()
        res.json(demo)
       
    })
    .post(async(req,res)=>{
        const newObj = {
            id : req.body.id,
            task : req.body.task,
            checked :req.body.checked
        }
        if(!newObj.id || !newObj.task ){
            return res.status(500).send('id,task,checked must be required in  body')
        }
        const create = await tasks.create(newObj)

        const demo = await tasks.find()
        res.status(200).json(demo)
    })
    .patch(async(req,res)=>{
        const checkedval = req.body.checked
        const id = req.body._id
        const strid = String(id)
        const obj = await tasks.findById(strid)
        obj.checked = checkedval
        obj.save()
        console.log(obj)
        res.status(200)
    })
    .put(async(req,res)=>{
        const obj = req.body;
        const task = obj.task;
        if(!task){
            return res.status(500).send('task not recieved')
        }
        const id = obj._id;
        const getObj = await tasks.findById(id)
        getObj.task = task
        getObj.save()
    })
    .delete(async(req,res)=>{
        const id = req.body._id
        await tasks.deleteOne({_id:id})
        res.status(200)
    })


    module.exports = router