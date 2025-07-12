const { Quadstore } = require('quadstore');
const { newEngine } = require('quadstore-comunica');
const { getSolidDataset, saveSolidDatasetInContainer } = require('@inrupt/solid-client');

const quadstoreInstance = new Quadstore();
const comunicaEngine = newEngine();
const cache = new Map();

/**
 * Caches query results to optimize performance.
 * @param {string} query - The SPARQL query string.
 * @param {object} results - The query results to cache.
 */
function cacheQueryResults(query, results) {
  cache.set(query, results);
  console.log(`Query cached: ${query}`);
}

/**
 * Retrieves cached query results.
 * @param {string} query - The SPARQL query string.
 * @returns {object|null} The cached results or null if not found.
 */
function getCachedQueryResults(query) {
  return cache.get(query) || null;
}

async function storeRDFData(data) {
  console.log('Storing RDF data...');
  try {
    await quadstoreInstance.put(data);
    console.log('RDF data stored successfully.');
  } catch (error) {
    console.error('Failed to store RDF data:', error.message);
    throw error;
  }
}

async function queryRDFData(query) {
  console.log('Querying RDF data with cache...');
  const cachedResults = getCachedQueryResults(query);
  if (cachedResults) {
    console.log('Returning cached results.');
    return cachedResults;
  }

  try {
    const results = await comunicaEngine.query(query, { sources: [quadstoreInstance] });
    cacheQueryResults(query, results);
    console.log('Query results:', results);
    return results;
  } catch (error) {
    console.error('Failed to query RDF data:', error.message);
    throw error;
  }
}

async function storeInSolidPod(containerUrl, data) {
  console.log('Storing data in Solid Pod...');
  try {
    const dataset = await getSolidDataset(containerUrl);
    const updatedDataset = saveSolidDatasetInContainer(containerUrl, dataset);
    console.log('Data stored in Solid Pod successfully.');
    return updatedDataset;
  } catch (error) {
    console.error('Failed to store data in Solid Pod:', error.message);
    throw error;
  }
}

async function isReady() {
  // In a real implementation, check Quadstore connectivity and readiness
  return true;
}

/**
 * Fetches obligation cost history for a given walletId from Quadstore.
 * @param {string} walletId
 * @returns {Promise<Array>} Array of obligation cost entries
 */
async function fetchObligationCostHistory(walletId) {
  // Example SPARQL query for obligation costs by walletId
  const query = `
    PREFIX obligation: <http://webizen.org/v1/obligation#>
    PREFIX dc: <http://purl.org/dc/terms/>
    SELECT ?id ?serviceName ?cost ?currency ?date WHERE {
      ?id obligation:cost ?cost ;
          obligation:currency ?currency ;
          dc:date ?date .
      FILTER(STRSTARTS(STR(?id), "urn:audit:"))
    }
    ORDER BY DESC(?date)
  `;
  try {
    const results = await queryRDFData(query);
    // Map results to expected format (mocked for now)
    // In a real implementation, parse results from SPARQL engine
    return [
      { id: 'urn:audit:1', serviceName: 'initial_access', cost: 0, currency: 'XEC', date: new Date().toISOString(), description: 'Initial access' },
      { id: 'urn:audit:2', serviceName: 'grok_api', cost: 0.01, currency: 'USD', date: new Date(Date.now() - 100000).toISOString(), description: 'Grok API usage' },
    ];
  } catch (error) {
    console.error('Failed to fetch obligation cost history:', error);
    return [];
  }
}

module.exports = {
  storeRDFData,
  queryRDFData,
  storeInSolidPod,
  isReady,
  fetchObligationCostHistory,
};