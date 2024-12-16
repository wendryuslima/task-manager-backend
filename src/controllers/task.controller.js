class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getTasks() {
    try {
      const tasks = await TaskModel.find();
      this.res.status(200).json(tasks);
    } catch (error) {
      this.res.status(500).json({ error: error.message });
    }
  }

  async getTasksById() {
    try {
      const taskId = this.req.params.id;
      const task = await TaskModel.findById(taskId);

      if (!task) {
        return this.res.status(404).send("Essa tarefa não foi encontrada");
      }
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async create() {
    try {
      const newTask = new TaskModel(req.body);
      await newTask.save();
      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;
      const taskToUpdate = await TaskModel.findById(taskId);

      const allowedUpdates = ["isCompleted"];
      const requestUpdates = Object.keys(req.body);

      for (const update of requestUpdates) {
        if (allowedUpdates.includes(update)) {
          taskToUpdate[update] = taskData[update];
        }
      }

      await taskToUpdate.save();
      return this.res.status(200).send(taskToUpdate);
    } catch (error) {
      return this.res.status(500).send(error.message);
    }
  }

  async delete() {
    const taskId = this.req.params.id;
    try {
      const taskToDelete = await TaskModel.findById(taskId);
      if (!taskToDelete) {
        return this.res.status(500).send("Essa tarefa não foi encontrada");
      }
      const deleteTask = await TaskModel.findByIdAndDelete(taskId);
      this.res.status(200).send(deleteTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

export default TaskController;
