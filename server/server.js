const express = require('express')
const app = express()
const path = require('path')
const PORT = 3500
const bodyparser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyparser.json())
app.use('/tasks',require('./apiroutes'))





app.get('/*',(req,res)=>{
    res.status(500).send('404 NOT FOUND')
})




app.listen(PORT,()=>console.log('server is running on ' + PORT))