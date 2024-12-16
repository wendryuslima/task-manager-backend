import express from "express";
import TaskController from "../controllers/task.controller.js";
import TaskModel from "../models/task.models.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
  return new TaskController(req, res).getTasksById();
});

router.post("/", async (req, res) => {
  return new TaskController(req, res).create();
});

router.patch("/:id", async (req, res) => {
  return new TaskController(req, res).update();
});

router.delete("/:id", async (req, res) => {
  return new TaskController(req, res).delete();
});

export default router;
