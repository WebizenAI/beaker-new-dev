const { create } = require('ipfs-http-client');
const { getSolidDataset, saveSolidDatasetInContainer } = require('@inrupt/solid-client');

const ipfs = create({ url: 'https://ipfs.infura.io:5001' });

async function storeBackup(data) {
  console.log('Storing backup in IPFS...');
  try {
    const { cid } = await ipfs.add(data);
    console.log('Backup stored in IPFS with CID:', cid.toString());
    return cid.toString();
  } catch (error) {
    console.error('Failed to store backup in IPFS:', error.message);
    throw error;
  }
}

async function retrieveBackup(cid) {
  console.log('Retrieving backup from IPFS...');
  try {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    const data = Buffer.concat(chunks).toString();
    console.log('Backup retrieved from IPFS:', data);
    return data;
  } catch (error) {
    console.error('Failed to retrieve backup from IPFS:', error.message);
    throw error;
  }
}

async function storeBackupInSolidPod(containerUrl, data) {
  console.log('Storing backup in Solid Pod...');
  try {
    const dataset = await getSolidDataset(containerUrl);
    const updatedDataset = saveSolidDatasetInContainer(containerUrl, dataset);
    console.log('Backup stored in Solid Pod successfully.');
    return updatedDataset;
  } catch (error) {
    console.error('Failed to store backup in Solid Pod:', error.message);
    throw error;
  }
}

module.exports = {
  storeBackup,
  retrieveBackup,
  storeBackupInSolidPod,
};