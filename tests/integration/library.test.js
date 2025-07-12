const libraryManager = require('../../modules/library');

describe('Library Integration Tests', () => {
  test('should add a new resource', () => {
    const name = 'Test Resource';
    const metadata = 'Example metadata';

    const resource = libraryManager.addResource(name, metadata);
    expect(resource).toBeDefined();
    expect(resource.name).toBe(name);
    expect(resource.metadata).toBe(metadata);
  });

  test('should search resources successfully', () => {
    const name = 'Test Resource';
    const metadata = 'Example metadata';

    libraryManager.addResource(name, metadata);
    const results = libraryManager.searchResources('Test');

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name).toBe(name);
  });

  test('should retrieve all resources', () => {
    const name = 'Test Resource';
    const metadata = 'Example metadata';

    libraryManager.addResource(name, metadata);
    const resources = libraryManager.getResources();

    expect(resources).toBeDefined();
    expect(resources.length).toBeGreaterThan(0);
  });
});
