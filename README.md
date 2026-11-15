# LoneStar

Static corporate website for Lone Star Al Serdal, with Home, What We Do, Industries We Serve, Our Team, Partners & Clients, Contact Us, and a Privacy Notice.

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

Vercel uses clean URLs such as `/what-we-do` and `/contact`. The local server resolves those same routes and returns 404 for missing pages and assets.

## Contact enquiries

The contact form validates required fields and prepares an email to `info@lonestaralserdal.com` in the visitor's email app. The visitor reviews and sends it there. The site does not run a message-delivery backend or report an email as sent.

## Content and images

The website uses the supplied GCC/MENA copy and original transparent gold logo. Unspecified team profiles are omitted until real details are supplied. The Partners & Clients page uses the six client logos from ACF’s website, as requested by the site owner. Hero photography is stored locally in `images/` so the layout does not depend on third-party image URLs.
