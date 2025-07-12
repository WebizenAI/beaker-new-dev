import React, { useState } from 'react';
// In a real Electron/Node.js environment, this import would likely be handled
// via a preload script to expose necessary backend modules to the frontend.
import testSuite from '../modules/testsuite';

const TestSuite = () => {
  const [results, setResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);
    try {
      // The testSuite.run() method is async and returns a promise
      const testResults = await testSuite.run();
      setResults(testResults);
    } catch (error) {
      console.error("Test suite failed to run:", error);
      setResults([{
        testName: 'Test Suite Runner',
        status: 'failed',
        error: 'Could not execute test suite: ' + error.message,
        duration: '0ms'
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  function displayCalendarTestResults(results) {
    console.log('Displaying calendar test results:', results);
    // Example: Render test results with ARIA attributes
  }

  return (
    <div className="p-4 font-sans" role="main">
      <h1 className="text-2xl font-bold mb-4">Webizen Test Suite</h1>
      <button
        onClick={runTests}
        disabled={isRunning}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        aria-busy={isRunning}
      >
        {isRunning ? 'Running...' : 'Run All Tests'}
      </button>

      <div id="test-results" className="mt-4" aria-live="polite" aria-atomic="true">
        {results.length > 0 && (
          <ul role="list" className="space-y-2">
            {results.map((result, index) => (
              <li
                key={index}
                role="listitem"
                className={`p-3 rounded border ${
                  result.status === 'passed' ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    <span aria-hidden="true" className={result.status === 'passed' ? 'text-green-600 mr-2' : 'text-red-600 mr-2'}>
                      {result.status === 'passed' ? '✔' : '✖'}
                    </span>
                    {result.testName}
                  </span>
                  <span className="text-sm text-gray-500">{result.duration}</span>
                </div>
                {result.status === 'failed' && result.error && (
                  <div role="alert" className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">
                    <strong>Error:</strong> {result.error}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestSuite;
export { displayCalendarTestResults };