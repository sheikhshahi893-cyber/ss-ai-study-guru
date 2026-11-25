import fs from 'fs';
import path from 'path';

// Ensure service worker and sw aliases exist in public directory
const publicDir = path.join(process.cwd(), 'public');
const swSource = path.join(publicDir, 'service-worker.js');
const swAlias = path.join(publicDir, 'serviceworker.js');

if (fs.existsSync(swSource)) {
  fs.copyFileSync(swSource, swAlias);
  console.log('Successfully synced /public/serviceworker.js alias');
} else {
  console.warn('service-worker.js not found in public directory');
}
