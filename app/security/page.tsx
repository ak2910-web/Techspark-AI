import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Download, Lock, Unlock, CheckCircle, AlertTriangle, Save } from 'lucide-react';
import { EncryptionService } from '../../services/encryptionService';
import DashboardLayout from '../../components/layout/DashboardLayout';

const SecuritySettings: React.FC = () => {
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [newKey, setNewKey] = useState('');
  const [testData, setTestData] = useState('');
  const [encryptedTest, setEncryptedTest] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const key = EncryptionService.getKey();
    if (key) {
      setEncryptionEnabled(true);
      setCurrentKey(key);
    }
  }, []);

  const handleGenerateKey = () => {
    const key = EncryptionService.generateKey();
    setNewKey(key);
    setShowKey(true);
  };

  const handleSaveKey = () => {
    if (!newKey) {
      setStatus('error');
      setMessage('Please generate a key first');
      return;
    }

    EncryptionService.saveKey(newKey);
    setCurrentKey(newKey);
    setEncryptionEnabled(true);
    setStatus('success');
    setMessage('Encryption key saved successfully! Your data is now secure.');
    
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 3000);
  };

  const handleDownloadKey = () => {
    const key = currentKey || newKey;
    if (!key) {
      setStatus('error');
      setMessage('No key available to download');
      return;
    }

    EncryptionService.downloadKey(key);
    setStatus('success');
    setMessage('Encryption key downloaded! Keep it safe.');
    
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 3000);
  };

  const handleTestEncryption = () => {
    if (!testData) {
      setStatus('error');
      setMessage('Enter some text to test encryption');
      return;
    }

    try {
      const encrypted = EncryptionService.encrypt(testData);
      setEncryptedTest(encrypted);
      setStatus('success');
      setMessage('Data encrypted successfully!');
    } catch (error) {
      setStatus('error');
      setMessage('Encryption failed. Make sure a key is set.');
    }
  };

  const handleTestDecryption = () => {
    if (!encryptedTest) {
      setStatus('error');
      setMessage('No encrypted data to decrypt');
      return;
    }

    try {
      const decrypted = EncryptionService.decrypt(encryptedTest);
      setStatus('success');
      setMessage(`Decrypted: "${decrypted}"`);
    } catch (error) {
      setStatus('error');
      setMessage('Decryption failed. Wrong key or corrupted data.');
    }
  };

  const handleDisableEncryption = () => {
    if (confirm('Are you sure you want to disable encryption? This will remove your key from this device.')) {
      EncryptionService.clearKey();
      setEncryptionEnabled(false);
      setCurrentKey('');
      setNewKey('');
      setStatus('success');
      setMessage('Encryption disabled. Your data is no longer protected.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-[#08D9D6]" />
            <h1 className="text-3xl font-bold text-slate-900">Zero-Knowledge Security</h1>
          </div>
          <p className="text-slate-600">
            End-to-end encryption. Only you can decrypt your data. Not even we can read it.
          </p>
        </motion.div>

        {/* Status Messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {status === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            {message}
          </motion.div>
        )}

        {/* Current Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {encryptionEnabled ? (
                <Lock className="w-12 h-12 text-green-500" />
              ) : (
                <Unlock className="w-12 h-12 text-orange-500" />
              )}
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Encryption Status: {encryptionEnabled ? 'Enabled' : 'Disabled'}
                </h3>
                <p className="text-slate-600">
                  {encryptionEnabled
                    ? 'Your data is protected with AES-256 encryption'
                    : 'Your data is not encrypted. Enable protection now.'}
                </p>
              </div>
            </div>
            {encryptionEnabled && (
              <button
                onClick={handleDisableEncryption}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
              >
                Disable
              </button>
            )}
          </div>
        </motion.div>

        {/* Setup Section */}
        {!encryptionEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#08D9D6]/10 to-[#FF2E63]/10 rounded-xl p-6 mb-6 border border-[#08D9D6]/20"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Key className="w-6 h-6 text-[#08D9D6]" />
              Enable Zero-Knowledge Encryption
            </h3>
            
            <div className="space-y-4">
              <div>
                <button
                  onClick={handleGenerateKey}
                  className="px-6 py-3 bg-[#08D9D6] text-white rounded-lg hover:bg-[#06b8b5] transition font-semibold flex items-center gap-2"
                >
                  <Key className="w-5 h-5" />
                  Generate Encryption Key
                </button>
              </div>

              {newKey && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Encryption Key (Keep it safe!)
                    </label>
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={newKey}
                      readOnly
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm"
                    />
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="mt-2 text-sm text-[#08D9D6] hover:underline"
                    >
                      {showKey ? 'Hide' : 'Show'} Key
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveKey}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save & Enable
                    </button>
                    <button
                      onClick={handleDownloadKey}
                      className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition font-semibold flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download Backup
                    </button>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Important:</strong> Download and save your encryption key securely. 
                      If you lose it, your encrypted data cannot be recovered.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Test Encryption Section */}
        {encryptionEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Test Encryption</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Test Data
                </label>
                <textarea
                  value={testData}
                  onChange={(e) => setTestData(e.target.value)}
                  placeholder="Enter some text to encrypt..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-[#08D9D6] resize-none"
                  rows={3}
                />
                <button
                  onClick={handleTestEncryption}
                  className="mt-2 px-4 py-2 bg-[#08D9D6] text-white rounded-lg hover:bg-[#06b8b5] transition"
                >
                  Encrypt
                </button>
              </div>

              {encryptedTest && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Encrypted Output
                  </label>
                  <textarea
                    value={encryptedTest}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleTestDecryption}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Decrypt
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200"
        >
          <h4 className="font-semibold text-slate-900 mb-3">How Zero-Knowledge Works:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>All encryption happens on your device (client-side)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Your encryption key never leaves your browser</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Our servers only store encrypted data (unreadable)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Even we cannot decrypt your data</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Uses AES-256 military-grade encryption</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SecuritySettings;
