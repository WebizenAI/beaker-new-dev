class WorkManager {
  constructor() {
    this.projects = [];
    console.log('Work Manager initialized');
  }

  /**
   * Create a new project.
   * @param {string} name - The name of the project.
   * @param {string} description - The description of the project.
   * @returns {object} - The created project.
   */
  createProject(name, description) {
    const project = {
      id: `project_${Date.now()}`,
      name,
      description,
      tasks: [],
      contributors: [],
    };
    this.projects.push(project);
    return project;
  }

  /**
   * Add a task to a project.
   * @param {string} projectId - The ID of the project.
   * @param {string} taskName - The name of the task.
   * @param {string} assignee - The person assigned to the task.
   * @returns {object|null} - The added task or null if the project is not found.
   */
  addTask(projectId, taskName, assignee) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return null;

    const task = {
      id: `task_${Date.now()}`,
      name: taskName,
      assignee,
      status: 'pending',
    };
    project.tasks.push(task);
    return task;
  }

  /**
   * Generate Kanban board for a project.
   * @param {string} projectId - The ID of the project.
   * @returns {object|null} - The Kanban board or null if the project is not found.
   */
  generateKanbanBoard(projectId) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return null;

    const board = {
      pending: project.tasks.filter((t) => t.status === 'pending'),
      inProgress: project.tasks.filter((t) => t.status === 'inProgress'),
      completed: project.tasks.filter((t) => t.status === 'completed'),
    };
    return board;
  }

  /**
   * Generate Gantt chart for a project.
   * @param {string} projectId - The ID of the project.
   * @returns {string|null} - The Gantt chart or null if the project is not found.
   */
  generateGanttChart(projectId) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project) return null;

    // Placeholder for Gantt chart generation logic
    return `Gantt chart for project: ${project.name}`;
  }
}

module.exports = new WorkManager();
