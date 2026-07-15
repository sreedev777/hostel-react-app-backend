const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://sree:sree123@ac-u3sw13b-shard-00-00.ckegugb.mongodb.net:27017,ac-u3sw13b-shard-00-01.ckegugb.mongodb.net:27017,ac-u3sw13b-shard-00-02.ckegugb.mongodb.net:27017/hosteldb?ssl=true&replicaSet=atlas-3xyrxx-shard-0&authSource=admin&appName=Cluster0",
  )
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((error) => {
    console.log(error);
  });

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
    leaveStatus: String,
  }),
);

app.post("/add-leave", async (req, res) => {
  await Leave.create(req.body);
  res.json({
    Status: "Success",
  });
});

app.post("/view-leave", async (req, res) => {
    const leaves = await Leave.find();
    res.json(leaves);
});

//----- Add Students ------ //
const student = mongoose.model(
  "Students",
  new mongoose.Schema({
    admissionId: String,
    studentID: String,
    name: String,
    gender: String,
    dept: String,
    year: String,
    hostelBlock: String,
    roomNo: String,
    parentName: String,
    parentNo: String,
    date: String,
    wardenName: String,
  }),
);

app.post("/add-student", async (req, res) => {
  await student.create(req.body);
  res.json({ status: "success" });
});

app.post("/view-students", async (req, res) => {
  const students = await student.find();
  res.json(students);
});

//-----LogIn-----//
const HostelLogin = mongoose.model(
  "logins",
  new mongoose.Schema({
    loginId: String,
    studentId: String,
    studentName: String,
    hostelBlock: String,
    roomNumber: String,
    department: String,
    yearOfStudy: String,
    loginDate: String,
    loginTime: String,
    attendanceStatus: String,
  }),
);
app.post("/login-add", async (req, res) => {
  await HostelLogin.create(req.body);
  res.json({ status: "success" });
});
app.get("/login-view", async (req, res) => {
  const logins = await HostelLogin.find();
  res.json(logins);
});

//-----LogOut-----//
const logout = mongoose.model(
  "Logout",
  new mongoose.Schema({
    logoutId: String,
    studentID: String,
    name: String,
    block: String,
    roomNo: String,
    dept: String,
    year: String,
    logoutTime: String,
    logoutDate: String,
    purpose: String,
    returnTime: String,
  }),
);

app.post("/logout", async (req, res) => {
  await logout.create(req.body);
  res.json({ status: "success" });
});

app.post("/view-logout", async (req, res) => {
  const logouts = await logout.find();
  res.json(logouts);
});

app.listen(3000, () => {
    console.log("Server Started");
});
