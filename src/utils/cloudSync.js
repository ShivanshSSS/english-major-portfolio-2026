/**
 * Cloud Sync Utility for Multi-User Live Portfolio Synchronization
 * Allows admin changes to reflect for all visitors across the globe.
 */

const LOCAL_STORAGE_KEY = 'MANUSCRIPTS_PORTFOLIO_DATA_V2';
const CLOUD_CONFIG_KEY = 'MANUSCRIPTS_CLOUD_CONFIG';

// Default public sync bin endpoint for instant multi-user synchronization
const DEFAULT_SYNC_ENDPOINT = 'https://api.jsonbin.io/v3/b';

export function getCloudConfig() {
  try {
    const saved = localStorage.getItem(CLOUD_CONFIG_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading cloud config:', e);
  }
  return {
    syncMode: 'cloud', // 'cloud' (JSONBin/REST), 'firebase', or 'local'
    binId: '',
    apiKey: '',
    firebaseProjectId: '',
    autoSyncOnSave: true
  };
}

export function saveCloudConfig(config) {
  try {
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving cloud config:', e);
  }
}

/**
 * Fetch latest global portfolio data from cloud endpoint
 */
export async function fetchRemotePortfolioData() {
  const config = getCloudConfig();

  // If custom Firebase REST configured
  if (config.syncMode === 'firebase' && config.firebaseProjectId) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${config.firebaseProjectId}/databases/(default)/documents/portfolio/main`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.fields && json.fields.dataJson) {
          return JSON.parse(json.fields.dataJson.stringValue);
        }
      }
    } catch (err) {
      console.warn('Could not fetch from Firebase Firestore:', err);
    }
  }

  // If JSONBin configured
  if (config.binId) {
    try {
      const headers = {};
      if (config.apiKey) headers['X-Master-Key'] = config.apiKey;
      const res = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}/latest`, { headers });
      if (res.ok) {
        const json = await res.json();
        return json.record;
      }
    } catch (err) {
      console.warn('Could not fetch from JSONBin:', err);
    }
  }

  return null;
}

/**
 * Push updated portfolio data to the cloud so all visitors receive it
 */
export async function pushRemotePortfolioData(data) {
  const config = getCloudConfig();

  // 1. If Firebase REST configured
  if (config.syncMode === 'firebase' && config.firebaseProjectId) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${config.firebaseProjectId}/databases/(default)/documents/portfolio/main`;
      const body = {
        fields: {
          dataJson: { stringValue: JSON.stringify(data) },
          updatedAt: { stringValue: new Date().toISOString() }
        }
      };
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return res.ok;
    } catch (err) {
      console.error('Error pushing to Firebase:', err);
      return false;
    }
  }

  // 2. If JSONBin configured
  if (config.binId) {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      if (config.apiKey) headers['X-Master-Key'] = config.apiKey;

      const res = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
      });
      return res.ok;
    } catch (err) {
      console.error('Error pushing to JSONBin:', err);
      return false;
    }
  }

  return false;
}

/**
 * Image helper: compress and convert a file to a fast Base64 Data URL
 */
export function compressImageFile(file, maxWidth = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
