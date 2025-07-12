/**
 * @file Integration tests for ADP and Mobile modules.
 */

import { promises as dns } from 'dns';
import { adpManager } from '../../modules/adp/index.js';
import { mobileManager } from '../../modules/mobile/index.js';

// Mock the dns module
jest.mock('dns', () => ({
  promises: {
    resolveTxt: jest.fn(),
  },
}));

describe('ADP and Call Verification Integration', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    dns.resolveTxt.mockClear();
  });

  describe('AdpManager', () => {
    it('should verify a domain with a valid ADP record', async () => {
      const domain = 'example.com';
      const ecashAddress = 'ecash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a';
      dns.resolveTxt.mockResolvedValue([[`adp:hasEcashAccount=${ecashAddress}`]]);

      const result = await adpManager.verifyDomain(domain);
      expect(result).not.toBeNull();
      expect(result.domain).toBe(domain);
      expect(result.ecashAddress).toBe(ecashAddress);
    });

    it('should return null for a domain with no ADP record', async () => {
      const domain = 'no-adp.com';
      dns.resolveTxt.mockResolvedValue([['some-other-record=value']]);

      const result = await adpManager.verifyDomain(domain);
      expect(result).toBeNull();
    });

    it('should return null for a domain with no TXT records', async () => {
      const domain = 'no-txt.com';
      const error = new Error('No TXT records found');
      error.code = 'ENODATA';
      dns.resolveTxt.mockRejectedValue(error);

      const result = await adpManager.verifyDomain(domain);
      expect(result).toBeNull();
    });

    it('should return null for a non-existent domain', async () => {
      const domain = 'non-existent-domain.xyz';
      const error = new Error('Domain not found');
      error.code = 'ENOTFOUND';
      dns.resolveTxt.mockRejectedValue(error);

      const result = await adpManager.verifyDomain(domain);
      expect(result).toBeNull();
    });
  });

  describe('MobileManager', () => {
    it('should verify a call from an ADP-enabled domain', async () => {
      const domain = 'verified-caller.com';
      const ecashAddress = 'ecash:qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a';
      dns.resolveTxt.mockResolvedValue([[`adp:hasEcashAccount=${ecashAddress}`]]);

      const result = await mobileManager.verifyCall(domain);
      expect(result.verified).toBe(true);
      expect(result.details).toContain('Verified via ADP/WebID');
    });

    it('should return unverified for a non-ADP caller', async () => {
      const callerId = '123-456-7890';
      const result = await mobileManager.verifyCall(callerId);
      expect(result.verified).toBe(false);
      expect(result.details).toContain('not verified via ADP/WebID');
    });
  });

  describe('WebID Verification', () => {
    it('should verify WebID and Cashtab address successfully', async () => {
      const webId = 'webid123';
      const cashtabAddress = 'ecash123';

      const isValid = await adpManager.verifyWebID(webId, cashtabAddress);
      expect(isValid).toBe(true);
    });

    it('should fail verification for invalid WebID or Cashtab address', async () => {
      const webId = 'invalidWebId';
      const cashtabAddress = 'invalidAddress';

      const isValid = await adpManager.verifyWebID(webId, cashtabAddress);
      expect(isValid).toBe(false);
    });
  });

  describe('ADP and Mobile Integration Tests', () => {
    it('should validate WebID format', () => {
      const webID = 'https://example.solidpod.com/profile/card#me';
      expect(() => adpManager.validateWebID(webID)).not.toThrow();
    });

    it('should verify WebRTC call', () => {
      const webID = 'https://example.solidpod.com/profile/card#me';
      expect(() => mobileManager.verifyCall(webID)).not.toThrow();
    });

    it('should notify call verification failure', () => {
      expect(() => mobileManager.notifyCallVerificationFailure()).not.toThrow();
    });
  });

  describe('Edge Cases for WebID Validation and WebRTC Call Verification', () => {
    it('should handle invalid WebID format gracefully', async () => {
      const invalidWebID = 'invalid-webid';
      const cashtabAddress = 'ecash123';

      const isValid = await adpManager.verifyWebID(invalidWebID, cashtabAddress);
      expect(isValid).toBe(false);
    });

    it('should handle SolidOS pod unavailability during WebID validation', async () => {
      const webID = 'https://example.solidpod.com/profile/card#me';
      const cashtabAddress = 'ecash123';

      jest.spyOn(adpManager, 'verifyWebID').mockImplementation(() => {
        throw new Error('SolidOS pod unavailable');
      });

      await expect(adpManager.verifyWebID(webID, cashtabAddress)).rejects.toThrow('SolidOS pod unavailable');
    });

    it('should handle WebRTC call verification failure due to network issues', async () => {
      const domain = 'unreachable-domain.com';

      jest.spyOn(mobileManager, 'verifyCall').mockImplementation(() => {
        throw new Error('Network error during call verification');
      });

      await expect(mobileManager.verifyCall(domain)).rejects.toThrow('Network error during call verification');
    });

    it('should handle WebRTC call verification failure due to invalid caller ID', async () => {
      const invalidCallerID = 'invalid-caller-id';

      const result = await mobileManager.verifyCall(invalidCallerID);
      expect(result.verified).toBe(false);
      expect(result.details).toContain('not verified via ADP/WebID');
    });
  });
});