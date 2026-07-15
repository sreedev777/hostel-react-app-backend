const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")



const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://sree:sree123@ac-u3sw13b-shard-00-00.ckegugb.mongodb.net:27017,ac-u3sw13b-shard-00-01.ckegugb.mongodb.net:27017,ac-u3sw13b-shard-00-02.ckegugb.mongodb.net:27017/hosteldb?ssl=true&replicaSet=atlas-3xyrxx-shard-0&authSource=admin&appName=Cluster0").then(
    () => {
        console.log("MongoDb connected")
    }
).catch(
    (error) => {
        console.log("error")
    }
)


const student =mongoose.model("Students", new mongoose.Schema(
    {
        admissionId:String,
        studentID:String,
        name:String,
        gender:String,
        dept:String,
        year:String,
        hostelBlock:String,
        roomNo:String,
        parentName:String,
        parentNo:String,
        date:String,
        wardenName:String
    }
))


app.post("/add-student",async (req,res) =>{
    await student.create(req.body)
    res.json({"status":"success"})
})

app.post("/view-students",async(req,res)=>{
    const students=await student.find()
    res.json(students)
})



const logout =mongoose.model("Logout", new mongoose.Schema(
    {
        logoutId:String,
        studentID:String,
        name:String,
        block:String,
        roomNo:String,
        dept:String,
        year:String,
        logoutTime:String,
        logoutDate:String,
        purpose:String,
        returnTime:String
    }
))


app.post("/logout",async (req,res) =>{
    await logout.create(req.body)
    res.json({"status":"success"})
})


app.listen(3000, () => {
    console.log("Server started")
})
