const { Project, Task } = require('../models');

class ProjectFacade {
  static async getAllProjects() {
    return await Project.findAll({
      include: [{ model: Task, as: 'tasks' }]
    });
  }

  static async getProjectById(id) {
    const project = await Project.findByPk(id, {
      include: [{ model: Task, as: 'tasks' }]
    });
    return project;
  }

  static async createProject(data) {
    return await Project.create(data);
  }

  static async updateProject(id, data) {
    const project = await Project.findByPk(id);
    if (!project) return null;
    return await project.update(data);
  }

  static async deleteProject(id) {
    const project = await Project.findByPk(id);
    if (!project) return null;
    await project.destroy();
    return true;
  }
}

module.exports = ProjectFacade;
