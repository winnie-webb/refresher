const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
const ConnectToDB = require("./models/ConnectToDB");
ConnectToDB();
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`../my-react-app/dist`));
app.use(express.json());
const Todo = require("./models/Todo");

app.get("/", (req, res) => {
  res.sendFile("../my-react-app/dist/index.html");
});
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});
app.post("/api/todos", express.json(), async (req, res) => {
  console.log(req.body);
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error adding new todo");
  }
});
app.get("/api/todos", (req, res, next) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(todos);
    console.log(todos);
  });
});
app.delete("/api/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  await Todo.deleteOne({ _id: todoId });
  res.status(200).json({ isDeleted: true });
});
app.put("/api/todos/:id", async (req, res) => {
  try {
    const todoId = new mongoose.Types.ObjectId(req.params.id);
    // console.log(req.body);
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
      name: req.body.name,
    });
    if (!updatedTodo) {
      return res.status(404).send("Todo not found");
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});
app.listen(3000);
