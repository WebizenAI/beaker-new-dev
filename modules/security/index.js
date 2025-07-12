/**
 * @module modules/security
 * @description Manages all cryptographic operations for Webizen.
 * This module provides a unified interface for various cryptographic schemes,
 * including SPHINCS+, ECDSA, RSA, AES, and Ed25519, used for different
 * application purposes like signing, encryption, and verification.
 */

const crypto = require('crypto');
const sphincs = require('sphincs');
const walletLib = require('@cashtab/wallet-lib');
const NodeRSA = require('node-rsa');
const CryptoJS = require('crypto-js');
const ed25519 = require('ed25519');
const quadstore = require('../../services/quadstore');
const solidClient = require('@inrupt/solid-client');

// SPHINCS+ Implementation
function sphincsPlusSign(data, privateKey) {
  const signature = sphincs.sign(data, privateKey);
  return signature;
}

function sphincsPlusVerify(data, signature, publicKey) {
  return sphincs.verify(data, signature, publicKey);
}

// ECDSA Implementation
function ecdsaSign(data, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  sign.end();
  return sign.sign(privateKey, 'hex');
}

function ecdsaVerify(data, signature, publicKey) {
  const verify = crypto.createVerify('SHA256');
  verify.update(data);
  verify.end();
  return verify.verify(publicKey, signature, 'hex');
}

// RSA Implementation
function rsaEncrypt(data, publicKey) {
  const key = new NodeRSA(publicKey);
  return key.encrypt(data, 'base64');
}

function rsaDecrypt(encryptedData, privateKey) {
  const key = new NodeRSA(privateKey);
  return key.decrypt(encryptedData, 'utf8');
}

// AES Implementation
function aesEncrypt(data, key) {
  return CryptoJS.AES.encrypt(data, key).toString();
}

function aesDecrypt(encryptedData, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Ed25519 Implementation
function ed25519Sign(data, privateKey) {
  return ed25519.Sign(Buffer.from(data), privateKey);
}

function ed25519Verify(data, signature, publicKey) {
  return ed25519.Verify(Buffer.from(data), signature, publicKey);
}

function signData(data, algorithm = 'SPHINCS+') {
  try {
    if (algorithm === 'SPHINCS+') {
      sphincsPlusSign(data);
    } else if (algorithm === 'ECDSA') {
      ecdsaSign(data);
    } else {
      throw new Error('Unsupported algorithm');
    }
  } catch (error) {
    console.error('Error signing data:', error);
    console.log('Falling back to ECDSA');
    ecdsaSign(data);
  }
}

function rotateKeys() {
  console.log('Rotating keys for SPHINCS+ and ECDSA...');
  // Logic for secure key rotation
}

function logSecurityAudit(action, details) {
  console.log('Security audit log:', { action, details });
  // Logic to store audit logs in Quadstore
}

async function storeRotatedKeys(keys, solidPodUrl) {
  try {
    // Store keys in Quadstore
    await quadstore.insert({
      graph: 'rotated-keys',
      data: keys,
    });

    // Store keys in SolidOS pod
    const solidDataset = solidClient.createSolidDataset();
    keys.forEach((key) => {
      const thing = solidClient.createThing({ name: key.id });
      solidClient.addStringNoLocale(thing, 'http://schema.org/key', key.value);
      solidClient.addThing(solidDataset, thing);
    });
    await solidClient.saveSolidDatasetAt(solidPodUrl, solidDataset);

    console.log('Rotated keys stored successfully in Quadstore and SolidOS pods.');
  } catch (error) {
    console.error('Error storing rotated keys:', error);
  }
}

async function logAuditTrail(action, details, solidPodUrl) {
  try {
    const auditEntry = {
      action,
      details,
      timestamp: new Date().toISOString(),
    };

    // Sign the audit entry with SPHINCS+
    const signature = sphincsPlusSign(JSON.stringify(auditEntry), 'privateKey');
    auditEntry.signature = signature;

    // Store audit entry in Quadstore
    await quadstore.insert({
      graph: 'audit-logs',
      data: auditEntry,
    });

    // Store audit entry in SolidOS pod
    const solidDataset = solidClient.createSolidDataset();
    const thing = solidClient.createThing({ name: `audit-${Date.now()}` });
    solidClient.addStringNoLocale(thing, 'http://schema.org/action', action);
    solidClient.addStringNoLocale(thing, 'http://schema.org/details', JSON.stringify(details));
    solidClient.addStringNoLocale(thing, 'http://schema.org/timestamp', auditEntry.timestamp);
    solidClient.addStringNoLocale(thing, 'http://schema.org/signature', signature);
    solidClient.addThing(solidDataset, thing);
    await solidClient.saveSolidDatasetAt(solidPodUrl, solidDataset);

    console.log('Audit trail logged successfully in Quadstore and SolidOS pods.');
  } catch (error) {
    console.error('Error logging audit trail:', error);
  }
}

module.exports = {
  sphincsPlusSign,
  sphincsPlusVerify,
  ecdsaSign,
  ecdsaVerify,
  rsaEncrypt,
  rsaDecrypt,
  aesEncrypt,
  aesDecrypt,
  ed25519Sign,
  ed25519Verify,
  signData,
  rotateKeys,
  logSecurityAudit,
  storeRotatedKeys,
  logAuditTrail,
};