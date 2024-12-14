const express = require("express");
const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.models");
dotenv.config();

const app = express();
app.use(express.json());
connectToDataBase();

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/tasks:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).send("Essa tarefa não foi encontrada");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    const taskData = req.body;

    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestUpdates = Object.keys(req.body);

    for (update of requestUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update];
      }
    }

    await taskToUpdate.save();
    return res.status(200).send(taskToUpdate);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const taskToDelete = await TaskModel.findById(taskId);
    if (!taskToDelete) {
      return res.status(500).send("Essa tarefa não foi encontrada");
    }
    const deleteTask = await TaskModel.findByIdAndDelete(taskId);

    res.status(200).send(deleteTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(8000, () => console.log("Listening on port 8000"));
