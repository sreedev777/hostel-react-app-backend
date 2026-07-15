const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://sree:sree123@ac-u3sw13b-shard-00-00.ckegugb.mongodb.net:27017,ac-u3sw13b-shard-00-01.ckegugb.mongodb.net:27017,ac-u3sw13b-shard-00-02.ckegugb.mongodb.net:27017/hosteldb?ssl=true&replicaSet=atlas-3xyrxx-shard-0&authSource=admin&appName=Cluster0").then(
    (response)=>{
        console.log("mongodb connected")
    }
).catch(
    (error)=>{
        console.log(error)
    })

    app.listen(3000,()=>{
        console.log("server started")
    })
