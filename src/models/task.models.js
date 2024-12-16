import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = model("Task", TaskSchema);

export default TaskModel;
