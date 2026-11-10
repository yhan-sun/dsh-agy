import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { AccountPoolManager } from '../src/host/pool.ts'
import { defaultConfig } from '../src/common/types.ts'

test('manual selection survives exhaustion and sign-out without switching accounts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'agy-manual-'))
  try {
    const pool = new AccountPoolManager(dir)
    const primary = pool.getAccounts()[0]!
    const other = pool.createAccountSlot('Other')
    assert.equal(pool.getPoolData().mode, 'manual')
    assert.equal(pool.selectAccount('google')?.id, primary.id)
    assert.equal(pool.setActiveAccount(other.id), true)
    assert.equal(pool.selectAccount('anthropic')?.id, other.id)
    pool.recordFailure(other.id, 'google', '429 Rate Limit')
    assert.equal(pool.selectAccount('google'), null)
    assert.equal(pool.getPoolData().activeAccountId, other.id)
    assert.equal(pool.advanceAccount(other.id, 'google'), null)
    pool.markAuthRequired(other.id, 'invalid_grant')
    assert.equal(pool.selectAccount('anthropic'), null)
    assert.equal(pool.getPoolData().activeAccountId, other.id)
    const restored = new AccountPoolManager(dir)
    assert.equal(restored.getPoolData().activeAccountId, other.id)
    assert.equal(restored.selectAccount('google'), null)
    assert.equal(restored.setActiveAccount(primary.id), true)
    assert.equal(restored.selectAccount('google')?.id, primary.id)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('default tool mode does not bypass permission checks', () => {
  assert.equal(defaultConfig().permissionMode, 'accept-edits')
})

test('account pool files containing proxy credentials are owner-only on POSIX', { skip: process.platform === 'win32' }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'agy-proxy-permissions-'))
  try {
    const pool = new AccountPoolManager(dir)
    assert.equal(pool.setAccountProxy('acc_primary', 'http://user:password@127.0.0.1:7890'), true)
    assert.equal(statSync(join(dir, 'pool.json')).mode & 0o777, 0o600)
    assert.equal(statSync(join(dir, 'pool.json.last-good')).mode & 0o777, 0o600)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
