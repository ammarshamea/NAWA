/**
 * e.g. getPath(obj, 'values.items.0.name')
 */
export function getPath(obj, path) {
  if (!obj || !path) return undefined;
  return String(path)
    .split('.')
    .reduce((cur, part) => {
      if (cur == null) return cur;
      const n = parseInt(part, 10);
      if (String(n) === part) return cur[n];
      return cur[part];
    }, obj);
}
