const { Quadstore } = require('quadstore');
const { newEngine } = require('quadstore-comunica');
const { getSolidDataset, saveSolidDatasetInContainer } = require('@inrupt/solid-client');

const quadstoreInstance = new Quadstore();
const comunicaEngine = newEngine();

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
  console.log('Querying RDF data...');
  try {
    const results = await comunicaEngine.query(query, { sources: [quadstoreInstance] });
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