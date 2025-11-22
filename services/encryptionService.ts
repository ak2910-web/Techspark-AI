import CryptoJS from 'crypto-js';

/**
 * Zero-Knowledge Encryption Service
 * All encryption/decryption happens client-side
 * Server only stores encrypted data
 */

export class EncryptionService {
  private static STORAGE_KEY = 'fundspark_encryption_key';

  /**
   * Generate a new encryption key for the user
   */
  static generateKey(): string {
    return CryptoJS.lib.WordArray.random(256 / 8).toString();
  }

  /**
   * Save encryption key to localStorage (or user can download)
   */
  static saveKey(key: string): void {
    localStorage.setItem(this.STORAGE_KEY, key);
  }

  /**
   * Get encryption key from localStorage
   */
  static getKey(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  /**
   * Remove encryption key from localStorage
   */
  static clearKey(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Encrypt data using AES-256
   */
  static encrypt(data: any, key?: string): string {
    const encryptionKey = key || this.getKey();
    
    if (!encryptionKey) {
      throw new Error('Encryption key not found. Please set up security first.');
    }

    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, encryptionKey).toString();
    
    return encrypted;
  }

  /**
   * Decrypt data using AES-256
   */
  static decrypt<T = any>(encryptedData: string, key?: string): T {
    const encryptionKey = key || this.getKey();
    
    if (!encryptionKey) {
      throw new Error('Encryption key not found. Cannot decrypt data.');
    }

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedString) {
        throw new Error('Decryption failed. Invalid key or corrupted data.');
      }
      
      return JSON.parse(decryptedString) as T;
    } catch (error) {
      throw new Error('Failed to decrypt data. Wrong key or corrupted data.');
    }
  }

  /**
   * Download encryption key as a file
   */
  static downloadKey(key: string): void {
    const blob = new Blob([key], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fundspark-encryption-key.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Hash data (one-way, for verification)
   */
  static hash(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Check if encryption is enabled
   */
  static isEncryptionEnabled(): boolean {
    return !!this.getKey();
  }
}

/**
 * Example Usage:
 * 
 * // Setup (first time)
 * const key = EncryptionService.generateKey();
 * EncryptionService.saveKey(key);
 * EncryptionService.downloadKey(key); // User downloads backup
 * 
 * // Encrypt startup data before sending to backend
 * const startupData = { name: "My Startup", pitch: "..." };
 * const encrypted = EncryptionService.encrypt(startupData);
 * await saveToBackend({ encrypted_data: encrypted });
 * 
 * // Decrypt data when loading from backend
 * const response = await loadFromBackend();
 * const decrypted = EncryptionService.decrypt(response.encrypted_data);
 */
