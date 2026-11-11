import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { AccountPoolManager } from '../src/host/pool.ts'
import {
  syncAccounts,
  setActiveAccountUnified,
  removeAccountUnified,
  writeDirectAccounts,
  type DirectAccountsData,
} from '../src/host/account-sync.ts'

test('syncAccounts bi-directionally syncs accounts between direct store and pool', () => {
  const poolDir = mkdtempSync(join(tmpdir(), 'agy-pool-sync-'))
  const directDir = mkdtempSync(join(tmpdir(), 'agy-direct-sync-'))
  try {
    const pool = new AccountPoolManager(poolDir)
    assert.equal(pool.getAccounts().length, 1) // only primary

    // Prepare direct accounts with two accounts
    const directData: DirectAccountsData = {
      version: 1,
      activeId: 'acc_direct_1',
      accounts: [
        {
          id: 'acc_direct_1',
          email: 'direct1@gmail.com',
          projectId: 'antigravity',
          refreshToken: '1//refresh_token_1',
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'acc_direct_2',
          email: 'direct2@gmail.com',
          projectId: 'antigravity',
          refreshToken: '1//refresh_token_2',
          updatedAt: new Date().toISOString(),
        },
      ],
    }
    writeDirectAccounts(directData, directDir)

    // Run sync
    const res = syncAccounts(pool, directDir)
    assert.equal(res.importedToPool, 2)

    // Pool should now have 3 accounts (primary + 2 imported)
    const accounts = pool.getAccounts()
    assert.equal(accounts.length, 3)
    const acc1 = accounts.find((a) => a.id === 'acc_direct_1')
    assert.ok(acc1)
    assert.equal(acc1?.email, 'direct1@gmail.com')

    // Verify token file was written in acc1 dir
    const tokFile = join(acc1.dir, '.gemini', 'antigravity-cli', 'antigravity-oauth-token')
    const parsed = JSON.parse(readFileSync(tokFile, 'utf8'))
    assert.equal(parsed.token.refresh_token, '1//refresh_token_1')

    // Test setActiveAccountUnified
    const switched = setActiveAccountUnified(pool, 'acc_direct_2', directDir)
    assert.equal(switched, true)
    assert.equal(pool.getPoolData().activeAccountId, 'acc_direct_2')
    const directAuth = JSON.parse(readFileSync(join(directDir, 'auth.json'), 'utf8'))
    assert.equal(directAuth.refreshToken, '1//refresh_token_2')
    assert.equal(directAuth.email, 'direct2@gmail.com')

    // Test removeAccountUnified
    const removed = removeAccountUnified(pool, 'acc_direct_1', directDir)
    assert.equal(removed, true)
    assert.equal(pool.getAccounts().length, 2)
    const directAfter = JSON.parse(readFileSync(join(directDir, 'accounts.json'), 'utf8')) as DirectAccountsData
    assert.equal(directAfter.accounts.some((a) => a.id === 'acc_direct_1'), false)
  } finally {
    rmSync(poolDir, { recursive: true, force: true })
    rmSync(directDir, { recursive: true, force: true })
  }
})
