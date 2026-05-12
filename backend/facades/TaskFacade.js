const { Task, Project } = require('../models');

class TaskFacade {
  static async getAllTasks(projectId) {
    const filter = projectId ? { where: { projectId } } : {};
    return await Task.findAll({
      ...filter,
      include: [{ model: Project, as: 'project' }]
    });
  }

  static async createTask(data) {
    return await Task.create(data);
  }

  static async updateTask(id, data) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return await task.update(data);
  }

  static async deleteTask(id) {
    const task = await Task.findByPk(id);
    if (!task) return null;
    await task.destroy();
    return true;
  }
}

module.exports = TaskFacade;
