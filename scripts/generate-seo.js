import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_ROUTES, canonicalUrl } from '../src/config/site.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');

const routes = SEO_ROUTES;

const replaceMeta = (html, metaName, metaValue, isProperty = false) => {
  const attr = isProperty ? 'property' : 'name';
  const regex = new RegExp(`<meta\\s+${attr}="${metaName}"\\s+content="[^"]*"\\s*/?>`, 'i');
  const replacement = `<meta ${attr}="${metaName}" content="${metaValue}" />`;
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  // Fallback if tag doesn't exist, append to head
  return html.replace('</head>', `  ${replacement}\n</head>`);
};

for (const route of routes) {
  let newHtml = baseHtml;
  
  // Replace Title
  newHtml = newHtml.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  
  // Replace Meta Tags
  newHtml = replaceMeta(newHtml, 'description', route.description);
  newHtml = replaceMeta(newHtml, 'og:title', route.title, true);
  newHtml = replaceMeta(newHtml, 'og:description', route.description, true);
  newHtml = replaceMeta(newHtml, 'twitter:title', route.title);
  newHtml = replaceMeta(newHtml, 'twitter:description', route.description);
  
  // Replace Canonical and og:url
  const routeUrl = canonicalUrl(route.path);
  newHtml = newHtml.replace(/<link rel="canonical" href="[^"]*" \/>/i, `<link rel="canonical" href="${routeUrl}" />`);
  newHtml = replaceMeta(newHtml, 'og:url', routeUrl, true);

  // Ensure directory exists
  const routeDir = path.join(distDir, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  // Write file
  const routeIndexPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(routeIndexPath, newHtml);
  console.log(`✅ SEO HTML generated for /${route.path}`);
}

console.log('🚀 All SEO routes generated successfully!');
