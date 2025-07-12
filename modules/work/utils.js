/**
 * Utility function to lazy load tasks in batches.
 * @param {Array<Object>} tasks - The list of tasks to load.
 * @param {number} batchSize - The number of tasks to load per batch.
 * @param {Function} callback - The callback to execute for each batch.
 */
function lazyLoadTasks(tasks, batchSize, callback) {
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    callback(batch);
  }
}

module.exports = {
  lazyLoadTasks,
};
