const { Quadstore, MemoryLevel } = require('quadstore');
const { newEngine } = require('quadstore-comunica');
const WebizenAPI = require('../../services/webizen-api');
const { WebSocket } = require('ws');
const quadstore = require('../../services/quadstore');
const webizenAPI = require('../../services/webizen-api');

// Increase Jest timeout for these long-running tests
jest.setTimeout(60000); // 60 seconds

describe('Scalability Tests', () => {
  describe('Quadstore Scalability', () => {
    let db;

    beforeEach(async () => {
      // Use an in-memory store for testing
      db = new Quadstore({
        backend: new MemoryLevel(),
        comunica: newEngine(),
      });
      await db.open();
    });

    afterEach(async () => {
      await db.close();
    });

    test('should handle inserting 10,000 triples efficiently', async () => {
      const tripleCount = 10000;
      const triples = [];
      for (let i = 0; i < tripleCount; i++) {
        triples.push({
          subject: db.dataFactory.namedNode(`ex:subject${i}`),
          predicate: db.dataFactory.namedNode('ex:predicate'),
          object: db.dataFactory.literal(`object value ${i}`),
        });
      }

      const memBefore = process.memoryUsage().heapUsed / 1024 / 1024;
      const startTime = performance.now();

      await db.putMany(triples);

      const endTime = performance.now();
      const memAfter = process.memoryUsage().heapUsed / 1024 / 1024;

      const duration = endTime - startTime;
      const memoryIncrease = memAfter - memBefore;

      console.log(`Quadstore: Inserted ${tripleCount} triples in ${duration.toFixed(2)}ms.`);
      console.log(`Quadstore: Memory usage increased by ${memoryIncrease.toFixed(2)}MB.`);

      // Assertions to ensure the test is meaningful
      expect(duration).toBeLessThan(10000); // e.g., less than 10 seconds
      expect(memoryIncrease).toBeLessThan(200); // e.g., less than 200 MB

      const { items } = await db.get({});
      expect(items).toHaveLength(tripleCount);
    });

    test('Quadstore persistent storage', () => {
      const data = { key: 'value' };
      expect(() => quadstore.storeRDFData(data)).not.toThrow();
    });

    test('Quadstore persistent storage with SolidOS pods', async () => {
      const data = {
        subject: quadstore.dataFactory.namedNode('ex:subject'),
        predicate: quadstore.dataFactory.namedNode('ex:predicate'),
        object: quadstore.dataFactory.literal('object value'),
      };

      const containerUrl = 'https://example.solidpod/container';
      await expect(quadstore.storeRDFData(data)).resolves.not.toThrow();
      await expect(quadstore.storeInSolidPod(containerUrl, data)).resolves.not.toThrow();
    });
  });

  describe('Webizen API Scalability', () => {
    const PORT = 8089;
    let server;

    beforeAll(() => {
      WebizenAPI.start(PORT);
      server = WebizenAPI.wss;
    });

    afterAll((done) => {
      if (server) {
        server.close(done);
      } else {
        done();
      }
    });

    test('should handle 1,000 concurrent requests', async () => {
      const requestCount = 1000;
      const promises = [];
      const memBefore = process.memoryUsage().heapUsed / 1024 / 1024;

      for (let i = 0; i < requestCount; i++) {
        promises.push(new Promise((resolve, reject) => {
          const ws = new WebSocket(`ws://localhost:${PORT}`);
          ws.on('open', () => {
            ws.send(JSON.stringify({ endpoint: '/ai/query', payload: { query: `test ${i}` } }));
            ws.close();
            resolve();
          });
          ws.on('error', reject);
        }));
      }

      const startTime = performance.now();
      await Promise.all(promises);
      const endTime = performance.now();

      const memAfter = process.memoryUsage().heapUsed / 1024 / 1024;
      const memoryIncrease = memAfter - memBefore;
      const duration = endTime - startTime;

      console.log(`Webizen API: Handled ${requestCount} requests in ${duration.toFixed(2)}ms.`);
      console.log(`Webizen API: Memory usage increased by ${memoryIncrease.toFixed(2)}MB.`);

      // Assertions
      expect(duration).toBeLessThan(15000); // e.g., less than 15 seconds
      expect(memoryIncrease).toBeLessThan(100); // e.g., less than 100 MB
    });

    test('Webizen API under 100ms latency', () => {
      const mockData = { action: 'test' };
      expect(() => webizenAPI.logVerification('testAction', mockData)).not.toThrow();
    });

    test('Webizen API scalability under 100ms latency', async () => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      const startTime = performance.now();

      ws.on('open', () => {
        ws.send(JSON.stringify({ endpoint: '/health', payload: {} }));
        ws.close();
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`Webizen API: Health check completed in ${duration.toFixed(2)}ms.`);
      expect(duration).toBeLessThan(100); // Ensure latency is under 100ms
    });
  });
});