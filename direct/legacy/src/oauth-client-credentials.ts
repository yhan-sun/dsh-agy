import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { stateDir } from '../../../src/common/config.ts'

/** Local client configuration only; never returned by RPC or written to logs. */
export function directOAuthClientCredentials(): { clientId: string; clientSecret: string } | undefined {
  const clientId = process.env.AGY_CLIENT_ID?.trim()
  const clientSecret = process.env.AGY_CLIENT_SECRET?.trim()
  if (clientId || clientSecret) return clientId && clientSecret ? { clientId, clientSecret } : undefined
  try {
    const path = join(stateDir(), 'direct', 'oauth-client.json')
    const stat = statSync(path)
    if (!stat.isFile() || stat.size > 16_384 || (process.platform !== 'win32' && (stat.mode & 0o077) !== 0)) return undefined
    const value: unknown = JSON.parse(readFileSync(path, 'utf8'))
    if (typeof value !== 'object' || value === null || Array.isArray(value)) return undefined
    const record = value as Record<string, unknown>
    const id = typeof record.clientId === 'string' ? record.clientId.trim() : ''
    const secret = typeof record.clientSecret === 'string' ? record.clientSecret.trim() : ''
    return id && secret ? { clientId: id, clientSecret: secret } : undefined
  } catch {
    return undefined
  }
}
