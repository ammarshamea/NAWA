/**
 * فشل البناء إن بقيت إشارة إلى main.jsx في dist — الـ dist هو ما يجب نشره فقط.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const distIndex = join(root, 'dist', 'index.html');

if (!existsSync(distIndex)) {
  console.error('verify-pages-dist: dist/index.html غير موجود — شغّل npm run build');
  process.exit(1);
}

const html = readFileSync(distIndex, 'utf8');

if (/main\.(?:jsx?|tsx?)/i.test(html)) {
  console.error('verify-pages-dist: dist/index.html ما زال يحتوي على main.jsx|ts');
  console.error('المفترض أن Vite تستبدل الـ entry بملف .js داخل /assets. لا ترفع index.html من المصدر.');
  process.exit(1);
}

if (!/\/assets\/.+\.(js|mjs)/.test(html)) {
  console.error('verify-pages-dist: لم نجد <script> bundle داخل /assets/');
  process.exit(1);
}

console.log('verify-pages-dist: OK (dist ينتج فقط — بدون main.jsx)');
