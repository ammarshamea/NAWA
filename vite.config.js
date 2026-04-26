import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** https://<user>.github.io/<repoName>/  يتطلب base يساوي /اسم-المستودع/ */
function resolveBase() {
  const fromEnv = process.env.VITE_BASE;
  if (fromEnv) {
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`;
  }
  const repo = process.env.REPOSITORY_NAME;
  const name = repo?.includes('/') ? repo.split('/')[1] : repo;
  if (name) {
    return `/${name}/`;
  }
  return '/';
}

/**
 * يربط nawa_logo في index.html بمسار من جذر الموقع (مثل /NAWA/...)
 * لأن المسار المطلق "/..." يتجاهل مجلد المشروع ويذهب إلى github.io/... (خطأ).
 */
function indexHtmlLogoWithBase() {
  return {
    name: 'index-html-logo-base',
    transformIndexHtml(html) {
      const b = resolveBase();
      if (b === '/' || b === './') {
        return html;
      }
      const logo = `${b.replace(/\/$/, '')}/nawa_logo.png`;
      return html
        .replace(/href="nawa_logo.png"/g, `href="${logo}"`)
        .replace(/content="nawa_logo.png"/g, `content="${logo}"`);
    },
  };
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react(), indexHtmlLogoWithBase()],
  root: '.',
  server: {
    port: parseInt(process.env.PORT || '5173', 10),
    host: true,
  },
  publicDir: 'public',
});
