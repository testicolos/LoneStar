# LoneStar

Static corporate website for Lone Star Al Serdal.

## Local build

```bash
npm run build
```

The production-ready files are written to `dist/`.

## Local preview

```bash
npm run build
node server.mjs --dist
```

Then open `http://127.0.0.1:4173`.

## Vercel

This is a static site. The root files can be deployed directly, or the `dist/` folder can be used as the output directory after running the build command.
