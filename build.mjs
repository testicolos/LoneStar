import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of [
  'index.html',
  'style.css',
  'logo-header.png',
  'favicon.ico',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'site.webmanifest'
]) {
  await cp(resolve(root, file), resolve(dist, file));
}

console.log('Build complete: dist/');
