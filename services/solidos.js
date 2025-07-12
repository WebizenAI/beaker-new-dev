// Minimal SolidOS service stub for health checks
module.exports = {
  async isReady() {
    // In a real implementation, check SolidOS pod connectivity
    return true;
  }
};
