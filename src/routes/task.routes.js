import express from "express";
import TaskController from "../controllers/task.controller.js";

const router = express.Router();
const taskController = new TaskController(); 


router.get("/", taskController.getTasks); 
router.get("/:id", taskController.getTasksById); 
router.post("/", taskController.create); 
router.patch("/:id", taskController.update); 
router.delete("/:id", taskController.delete); 

export default router;
