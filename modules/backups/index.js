const ipfsClient = require('ipfs-http-client');
const { SolidClient } = require('@inrupt/solid-client');

class BackupManager {
  constructor() {
    this.ipfs = ipfsClient();
    this.solidClient = new SolidClient();
  }

  async createIncrementalBackup(data, backupId) {
    try {
      // Store backup in IPFS
      const ipfsResult = await this.ipfs.add(JSON.stringify(data));
      console.log('Backup stored in IPFS:', ipfsResult.path);

      // Store backup metadata in Solid Pod
      const metadata = {
        backupId,
        ipfsPath: ipfsResult.path,
        timestamp: new Date().toISOString(),
      };
      await this.solidClient.saveData(`https://example.solidpod.com/backups/${backupId}.json`, metadata);
      console.log('Backup metadata stored in Solid Pod:', metadata);

      return metadata;
    } catch (error) {
      console.error('Error creating incremental backup:', error);
      throw error;
    }
  }

  async retrieveBackup(backupId) {
    try {
      // Retrieve backup metadata from Solid Pod
      const metadata = await this.solidClient.getData(`https://example.solidpod.com/backups/${backupId}.json`);
      console.log('Retrieved backup metadata:', metadata);

      // Retrieve backup data from IPFS
      const ipfsData = await this.ipfs.cat(metadata.ipfsPath);
      console.log('Retrieved backup data from IPFS:', ipfsData.toString());

      return JSON.parse(ipfsData.toString());
    } catch (error) {
      console.error('Error retrieving backup:', error);
      throw error;
    }
  }
}

module.exports = BackupManager;