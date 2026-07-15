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
    (error)=>{
        console.log(error)
    })

// ----- Leave Schema ----- //
const Leave = mongoose.model(
  "leaves",
  new mongoose.Schema({
    leaveRequestId: String,
    studentId: String,
    studentName: String,
    hostelBlock: String,
    roomNumber: String,
    department: String,
    yearOfStudy: String,
    fromDate: String,
    toDate: String,
    reasonForLeave: String,
    parentContactNumber: String,
    leaveStatus: String
  })
);

app.post("/add-leave", async (req, res) => {
    await Leave.create(req.body);
    res.json({
        Status: "Success"
    });
});



app.listen(3000,()=>{
    console.log("server started")
})
