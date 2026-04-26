/**
 * أصول وضعها في `public/` — يتضمّن base المسار عند نشر Vite (مثلاً GitHub Pages).
 * @param {string} file — مثلاً "nawa_logo.png" أو "nawa_logo.png" من جذر public
 */
export function publicAsset(file) {
  const base = import.meta.env.BASE_URL;
  const path = file.replace(/^\//, '');
  return `${base}${path}`;
}
