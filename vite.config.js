import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** https://<user>.github.io/<repoName>/  يتطلب base يساوي /اسم-المستودع/ */
function resolveBase() {
  const fromEnv = process.env.VITE_BASE;
  if (fromEnv) {
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`;
  }
  const name = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
  if (name) {
    return `/${name}/`;
  }
  return '/';
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
  root: '.',
  server: {
    port: parseInt(process.env.PORT || '5173', 10),
    host: true,
  },
});
