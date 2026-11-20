// Copies the web app from the repo root into www/, which is the folder Capacitor packages
// into the Android and iOS apps. The service worker is left out: a packaged app is already offline.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'www');
const files = ['index.html', 'three.min.js', 'manifest.webmanifest'];
const dirs = ['icons'];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const f of files) fs.copyFileSync(path.join(root, f), path.join(out, f));
for (const d of dirs) fs.cpSync(path.join(root, d), path.join(out, d), { recursive: true });
console.log('Copied web app to www/');
