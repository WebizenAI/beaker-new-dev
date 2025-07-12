const { lazyLoadTasks } = require('./utils');

/**
 * Generate a Gantt chart for a project with lazy loading.
 * @param {Array<Object>} tasks - The list of tasks for the project.
 * @param {number} batchSize - The number of tasks to load per batch.
 * @returns {Array<Object>} - The Gantt chart data.
 */
function generateGanttChart(tasks, batchSize = 100) {
  const chartData = [];

  lazyLoadTasks(tasks, batchSize, (batch) => {
    console.log('Loading batch:', batch);
    chartData.push(...batch.map((task) => ({
      id: task.id,
      name: task.name,
      start: task.startDate,
      end: task.endDate,
      status: task.status,
    })));
  });

  return chartData;
}

/**
 * Render the Gantt chart using work_ui components.
 * @param {Array<Object>} chartData - The Gantt chart data.
 */
function renderGanttChart(chartData) {
  console.log('Rendering Gantt chart with work_ui components:', chartData);
  // Example: Use work_ui components to render the chart
}

module.exports = {
  generateGanttChart,
  renderGanttChart,
};
