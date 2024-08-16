const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
const Todo = model("todoSchema", todoSchema);
module.exports = Todo;
