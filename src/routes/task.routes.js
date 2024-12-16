import express from "express";
import TaskController from "../controllers/task.controller.js";
import TaskModel from "../models/task.models.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestUpdates = Object.keys(req.body);

    for (const update of requestUpdates) {
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

router.delete("/:id", async (req, res) => {
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

export default router;
