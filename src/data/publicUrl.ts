/** Resolve a `public/` path against Vite's base (e.g. `/dpsBoss/` on GitHub Pages). */
export function publicUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
