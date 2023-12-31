const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  cover: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const TaskModel = model("Task", TaskSchema);

module.exports = TaskModel;
