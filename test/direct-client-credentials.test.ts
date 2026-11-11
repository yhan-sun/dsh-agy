import assert from 'node:assert/strict'
import test from 'node:test'
import { directOAuthClientCredentials } from '../direct/legacy/src/oauth-client-credentials.ts'

test('direct OAuth requires both explicitly supplied client credentials', () => {
  const id = process.env.AGY_CLIENT_ID
  const secret = process.env.AGY_CLIENT_SECRET
  try {
    delete process.env.AGY_CLIENT_ID
    delete process.env.AGY_CLIENT_SECRET
    assert.equal(directOAuthClientCredentials(), undefined)
    process.env.AGY_CLIENT_ID = ' test-client '
    assert.equal(directOAuthClientCredentials(), undefined)
    process.env.AGY_CLIENT_SECRET = ' test-secret '
    assert.deepEqual(directOAuthClientCredentials(), { clientId: 'test-client', clientSecret: 'test-secret' })
  } finally {
    if (id === undefined) delete process.env.AGY_CLIENT_ID
    else process.env.AGY_CLIENT_ID = id
    if (secret === undefined) delete process.env.AGY_CLIENT_SECRET
    else process.env.AGY_CLIENT_SECRET = secret
  }
})
