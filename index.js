const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const Port = process.env.Port || 8080;

const schemaData = mongoose.Schema(
  {
    username: String,
    email: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("curdoperation", schemaData);

// read
//http://localhost:8080
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// create data || save data
//http://localhost:8080/create
app.post("/create", async (req, res) => {
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data save successfully" });
});

// update data
// http://localhost:8080/update
app.put("/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  await userModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "data update successfully" });
});

//delete data
//http://localhost:8080/delete/id
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data deleted successfully" });
});

mongoose
  .connect(
    `mongodb+srv://nikhilcallsmaster12:nikhil817@cluster0.ny6ax3o.mongodb.net/callsmaster`
  )
  .then(() => {
    console.log("connect successfully");
    app.listen(Port, () => {
      console.log(`Server running on http://localhost:${Port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
