const WebizenAPI = require('../../services/webizen-api');
const WebSocket = require('ws');

describe('WebizenAPI Integration Tests', () => {
  const PORT = 8088; // Use a different port for each test file to avoid conflicts
  let server;

  beforeAll(() => {
    // Start the API server before all tests
    WebizenAPI.start(PORT);
    server = WebizenAPI.wss;
  });

  afterAll((done) => {
    // Close the server after all tests
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  test('should accept a WebSocket connection', (done) => {
    const ws = new WebSocket(`ws://localhost:${PORT}`);
    ws.on('open', () => {
      expect(ws.readyState).toBe(WebSocket.OPEN);
      ws.close();
      done();
    });
  });

  test('should handle a valid endpoint request', (done) => {
    const ws = new WebSocket(`ws://localhost:${PORT}`);
    const request = { endpoint: '/ai/query', payload: { query: 'test' } };

    // The API just logs to console, so we can't directly test the response.
    // We'll spy on console.log to verify it was called.
    const consoleSpy = jest.spyOn(console, 'log');

    ws.on('open', () => {
      ws.send(JSON.stringify(request));
    });

    // Give it a moment to process
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[API] AI query from'), request.payload);
      consoleSpy.mockRestore();
      ws.close();
      done();
    }, 100);
  });

  test('should respond with an error for an invalid endpoint', (done) => {
    const ws = new WebSocket(`ws://localhost:${PORT}`);
    const request = { endpoint: '/this/is/invalid', payload: {} };

    ws.on('open', () => {
      ws.send(JSON.stringify(request));
    });

    ws.on('message', (message) => {
      const response = JSON.parse(message.toString());
      expect(response.error).toBe('Unknown endpoint: /this/is/invalid');
      ws.close();
      done();
    });
  });
});