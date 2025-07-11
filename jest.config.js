module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'modules/**/*.js',
    'services/**/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'modules/testsuite/index.js' // Exclude the interactive test suite
  ],
};