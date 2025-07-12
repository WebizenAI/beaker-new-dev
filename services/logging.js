/**
 * Logging Service
 *
 * Handles structured logging for errors, warnings, and general information
 * across all modules. Provides functionality to export logs to Quadstore
 * for semantic querying and to IPFS for persistent, decentralized storage.
 */

const quadstoreService = require('./quadstore');
const ipfsService = require('./ipfs');
const { DataFactory } = require('n3');
const { namedNode, literal, quad } = DataFactory;
const { getSolidDataset, saveSolidDatasetInContainer } = require('@inrupt/solid-client');

class LoggingService {
  constructor() {
    console.log('LoggingService initialized');
    // A potential namespace for logging ontology
    this.logNs = 'http://webizen.org/v1/log#';
  }

  /**
   * Logs a message with a given level and data payload.
   * @param {string} level - The log level (e.g., 'info', 'warn', 'error').
   * @param {object} data - The log data, containing a message and any other relevant details.
   */
  async log(level, data, containerUrl) {
    const logEntry = {
      level,
      timestamp: new Date().toISOString(),
      ...data,
    };

    // 1. Log to console for immediate feedback during development
    this.logToConsole(logEntry);

    // 2. Export to Quadstore for structured querying
    await this.exportToQuadstore(logEntry);

    // 3. Export to IPFS for persistence
    await this.exportToIpfs(logEntry);

    // 4. Export to Solid Pod for decentralized storage
    await this.exportToSolidPod(logEntry, containerUrl);
  }

  logToConsole(logEntry) {
    const { level, message, ...details } = logEntry;
    const detailsString = Object.keys(details).length ? JSON.stringify(details) : '';

    switch (level) {
      case 'error':
        console.error(`[ERROR] ${message}`, detailsString);
        break;
      case 'warn':
        console.warn(`[WARN] ${message}`, detailsString);
        break;
      case 'info':
      default:
        console.log(`[INFO] ${message}`, detailsString);
        break;
    }
  }

  /**
   * Converts a JSON log entry to RDF triples and saves it to Quadstore.
   * @param {object} logEntry - The log entry object.
   */

  async exportToQuadstore(logEntry) {
    console.log('Exporting log to Quadstore...');
    // Convert logEntry to RDF and store using quadstoreService
    const rdfData = this.convertLogEntryToRDF(logEntry);
    await quadstoreService.storeRDFData(rdfData);
  }

  /**
   * Saves the raw log entry to IPFS.
   * @param {object} logEntry - The log entry object.
   */

  async exportToIpfs(logEntry) {
    console.log('Exporting log to IPFS...');
    // Store logEntry in IPFS using ipfsService
    if (ipfsService.storeBackup) {
      const ipfsHash = await ipfsService.storeBackup(JSON.stringify(logEntry));
      console.log(`Log exported to IPFS with hash: ${ipfsHash}`);
    } else {
      console.warn('ipfsService.storeBackup not available. Skipping IPFS log export.');
    }
  }
  // Placeholder for log rotation (to be implemented)
  rotateLogs() {
    console.log('Log rotation not yet implemented.');
  }

  /**
   * Exports the log entry to a Solid Pod.
   * @param {object} logEntry - The log entry object.
   * @param {string} containerUrl - The URL of the Solid Pod container.
   */
  async exportToSolidPod(logEntry, containerUrl) {
    console.log('Exporting log to Solid Pod...');
    try {
      const dataset = await getSolidDataset(containerUrl);
      const updatedDataset = saveSolidDatasetInContainer(containerUrl, dataset);
      console.log('Log exported to Solid Pod successfully.');
      return updatedDataset;
    } catch (error) {
      console.error('Failed to export log to Solid Pod:', error.message);
      throw error;
    }
  }

  /**
   * Converts a log entry to RDF format.
   * @param {object} logEntry - The log entry object.
   * @returns {string} - The RDF data as a string.
   */
  convertLogEntryToRDF(logEntry) {
    // Example conversion to RDF using N3 DataFactory
    const { level, message, timestamp, ...details } = logEntry;
    const triples = [
      quad(namedNode(this.logNs + 'LogEntry' + Math.random()), namedNode(this.logNs + 'level'), literal(level)),
      quad(namedNode(this.logNs + 'LogEntry' + Math.random()), namedNode(this.logNs + 'message'), literal(message)),
      quad(namedNode(this.logNs + 'LogEntry' + Math.random()), namedNode(this.logNs + 'timestamp'), literal(timestamp)),
    ];

    // Add detail properties
    for (const [key, value] of Object.entries(details)) {
      triples.push(quad(namedNode(this.logNs + 'LogEntry' + Math.random()), namedNode(this.logNs + key), literal(value)));
    }

    return triples;
  }
}

module.exports = new LoggingService();