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

app.post("/delete-leave", async (req, res) => {
    try {
        const { _id } = req.body;
        await Leave.findByIdAndDelete(_id);
        res.json({
            status: "success",
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete leave",
        });
    }
});

app.post("/update-leave", async (req, res) => {
    try {
        const updatedLeave = req.body;
        await Leave.findByIdAndUpdate(updatedLeave._id, updatedLeave);
        res.json({
            status: "success",
            message: "Updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to update leave",
        });
    }
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

app.post("/delete-student", async (req, res) => {
    try {
        const { _id } = req.body;
        await student.findByIdAndDelete(_id);
        res.json({
            status: "success",
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete student",
        });
    }
});

app.post("/update-student", async (req, res) => {
    try {
        const updatedStudent = req.body;
        await student.findByIdAndUpdate(updatedStudent._id, updatedStudent);
        res.json({
            status: "success",
            message: "Updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to update student",
        });
    }
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

app.post("/delete-login", async (req, res) => {
    try {
        const { _id } = req.body;
        await HostelLogin.findByIdAndDelete(_id);
        res.json({
            status: "success",
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete login",
        });
    }
});

app.post("/update-login", async (req, res) => {
    try {
        const updatedLogin = req.body;
        await HostelLogin.findByIdAndUpdate(updatedLogin._id, updatedLogin);
        res.json({
            status: "success",
            message: "Updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to update login",
        });
    }
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

app.post("/delete-logout", async (req, res) => {
    try {
        const { _id } = req.body;
        await logout.findByIdAndDelete(_id);
        res.json({
            status: "success",
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete logout",
        });
    }
});

app.post("/update-logout", async (req, res) => {
    try {
        const updatedLogout = req.body;
        await logout.findByIdAndUpdate(updatedLogout._id, updatedLogout);
        res.json({
            status: "success",
            message: "Updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to update logout",
        });
    }
});

app.listen(3000, () => {
    console.log("Server Started");
});
