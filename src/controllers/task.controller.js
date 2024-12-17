import TaskModel from '../models/task.models.js';

class TaskController {
  async getTasks(req, res) {
    try {
      const tasks = await TaskModel.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTasksById(req, res) {
    try {
      const taskId = req.params.id;
      const task = await TaskModel.findById(taskId);

      if (!task) {
        return res.status(404).send("Essa tarefa não foi encontrada");
      }
      res.status(200).json(task); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    try {
      const newTask = new TaskModel(req.body);
      await newTask.save();
      res.status(201).json(newTask); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const taskId = req.params.id;
      const taskData = req.body;
      const taskToUpdate = await TaskModel.findById(taskId);

      if (!taskToUpdate) {
        return res.status(404).send("Tarefa não encontrada");
      }

      const allowedUpdates = ["isCompleted"];
      const requestUpdates = Object.keys(req.body);

      for (const update of requestUpdates) {
        if (allowedUpdates.includes(update)) {
          taskToUpdate[update] = taskData[update];
        }
      }

      await taskToUpdate.save();
      res.status(200).json(taskToUpdate); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async delete(req, res) {
    const taskId = req.params.id;
    try {
      const taskToDelete = await TaskModel.findById(taskId);
      if (!taskToDelete) {
        return res.status(404).send("Essa tarefa não foi encontrada");
      }
      const deleteTask = await TaskModel.findByIdAndDelete(taskId);
      res.status(200).json(deleteTask); 
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default TaskController;

