import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of [
  'index.html',
  'what-we-do.html',
  'industries.html',
  'our-team.html',
  'partners-clients.html',
  'contact.html',
  'privacy.html',
  'style.css',
  'site.js',
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

await mkdir(resolve(dist, 'images'), { recursive: true });
for (const photo of ['west-bay-night.jpg', 'udc-tower-pearl.jpg']) {
  await cp(resolve(root, 'images', photo), resolve(dist, 'images', photo));
}
await mkdir(resolve(dist, 'images', 'clients'), { recursive: true });
for (const logo of ['kahramaa.png', 'q-bar.png', 'nabina.png', 'ucc.png', 'new-port-project.png', 'qatar-rail.png']) {
  await cp(resolve(root, 'images', 'clients', logo), resolve(dist, 'images', 'clients', logo));
}
console.log('Build complete: dist/');
