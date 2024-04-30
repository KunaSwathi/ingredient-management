const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const userModel = require("./models/usermodel");

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 2000


//get the data
// http://localhost:2000/
app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//create or save data
// http://localhost:2000/create
/*{
    name:
    email:
    mobile:
}*/
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data saved" })
})

//update
// http://localhost:2000/update
/*{
    id:
    updated fields name,email,mobile
}*/
app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated successfully", data: data })
})

//delete
// http://localhost:2000/delete/id 
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id);
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "data deleted successfully", data: data })
})

mongoose.connect("mongodb+srv://swathigautham98:Nithik@cluster0.bhtleeo.mongodb.net/MERN_CRUD?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to Db");
        app.listen(PORT, () => console.log("Server is Running"))
    })

    .catch((err) => console.log(err))

