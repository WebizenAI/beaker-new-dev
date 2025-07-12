const workManager = require('../../modules/work');

describe('Work Management Integration Tests', () => {
  test('should create a new project', () => {
    const name = 'Test Project';
    const description = 'This is a test project.';

    const project = workManager.createProject(name, description);
    expect(project).toBeDefined();
    expect(project.name).toBe(name);
    expect(project.description).toBe(description);
  });

  test('should add a task to a project', () => {
    const project = workManager.createProject('Test Project', 'Description');
    const taskName = 'Test Task';
    const assignee = 'John Doe';

    const task = workManager.addTask(project.id, taskName, assignee);
    expect(task).toBeDefined();
    expect(task.name).toBe(taskName);
    expect(task.assignee).toBe(assignee);
  });

  test('should generate Kanban board for a project', () => {
    const project = workManager.createProject('Test Project', 'Description');
    workManager.addTask(project.id, 'Task 1', 'John Doe');
    workManager.addTask(project.id, 'Task 2', 'Jane Doe');

    const board = workManager.generateKanbanBoard(project.id);
    expect(board).toBeDefined();
    expect(board.pending.length).toBe(2);
  });

  test('should generate Gantt chart for a project', () => {
    const project = workManager.createProject('Test Project', 'Description');

    const chart = workManager.generateGanttChart(project.id);
    expect(chart).toBeDefined();
    expect(chart).toContain('Gantt chart for project: Test Project');
  });
});
