import assert from 'node:assert/strict'
import test from 'node:test'
import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { directOAuthClientCredentials } from '../direct/legacy/src/oauth-client-credentials.ts'

test('direct OAuth loads a private local client or a complete explicit override', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'agy-client-'))
  const saved = { home: process.env.DSH_HOME, id: process.env.AGY_CLIENT_ID, secret: process.env.AGY_CLIENT_SECRET }
  try {
    process.env.DSH_HOME = dir
    delete process.env.AGY_CLIENT_ID
    delete process.env.AGY_CLIENT_SECRET
    assert.equal(directOAuthClientCredentials(), undefined)
    const path = join(dir, 'agy-link', 'direct', 'oauth-client.json')
    mkdirSync(join(dir, 'agy-link', 'direct'), { recursive: true, mode: 0o700 })
    writeFileSync(path, JSON.stringify({ clientId: 'fixture-client', clientSecret: 'fixture-secret' }), { mode: 0o600 })
    assert.deepEqual(directOAuthClientCredentials(), { clientId: 'fixture-client', clientSecret: 'fixture-secret' })
    const { buildAuthorizationUrl, createGoogleTokenExchanger } = await import('../direct/legacy/src/oauth-flow.ts')
    const url = new URL(buildAuthorizationUrl('fixture-state', 'fixture-verifier'))
    assert.equal(url.searchParams.get('client_id'), 'fixture-client')
    const exchange = createGoogleTokenExchanger(async (_url, init) => {
      const form = init?.body as URLSearchParams
      assert.equal(form.get('client_id'), 'fixture-client')
      assert.equal(form.get('client_secret'), 'fixture-secret')
      return new Response(JSON.stringify({ access_token: 'fixture-access', refresh_token: 'fixture-refresh', expires_in: 3600 }), { status: 200 })
    })
    const result = await exchange({ code: 'fixture-code', verifier: 'fixture-verifier', signal: new AbortController().signal })
    assert.equal(result.refreshToken, 'fixture-refresh')
    chmodSync(path, 0o644)
    assert.equal(directOAuthClientCredentials(), undefined)
    process.env.AGY_CLIENT_ID = ' explicit-client '
    assert.equal(directOAuthClientCredentials(), undefined)
    process.env.AGY_CLIENT_SECRET = ' explicit-secret '
    assert.deepEqual(directOAuthClientCredentials(), { clientId: 'explicit-client', clientSecret: 'explicit-secret' })
  } finally {
    for (const [key, value] of Object.entries({ DSH_HOME: saved.home, AGY_CLIENT_ID: saved.id, AGY_CLIENT_SECRET: saved.secret })) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
    rmSync(dir, { recursive: true, force: true })
  }
})
