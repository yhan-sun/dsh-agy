/** Validate a direct-mode HTTP CONNECT proxy without accepting credentials. */
export function validDirectProxy(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 512 || value !== value.trim()) return false
  if (value === '') return true
  try {
    const url = new URL(value)
    return url.protocol === 'http:' && url.hostname !== '' && url.username === '' && url.password === '' &&
      (url.pathname === '' || url.pathname === '/') && url.search === '' && url.hash === ''
  } catch { return false }
}
