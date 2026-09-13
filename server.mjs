import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.argv.includes('--dist') ? 'dist' : '.';
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
    let rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
    rel = normalize(rel).replace(/^\.\.(\/|\\|$)/, '');
    let filePath = join(root, rel);
    try {
      const s = await stat(filePath);
      if (s.isDirectory()) filePath = join(filePath, 'index.html');
    } catch {
      filePath = join(root, 'index.html');
    }
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mime[extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(String(err));
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`LoneStar local server: http://127.0.0.1:${port}`);
});
