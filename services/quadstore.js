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

module.exports = {
  storeRDFData,
  queryRDFData,
  storeInSolidPod,
};