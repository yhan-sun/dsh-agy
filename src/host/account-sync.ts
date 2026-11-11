// account-sync: Bi-directional synchronization between the multi-account pool
// and the direct transport account store, unifying credentials so accounts added
// in either mode are available in both.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { AccountPoolManager } from './pool.ts'
import type { ManagedAccount } from '../common/pool-types.ts'
import { stateDir } from '../common/config.ts'
import { ensureIsolatedKeychain } from './runner.ts'

export interface CachedDirectAccount {
  id: string
  email?: string
  maskedEmail?: string
  projectId: string
  refreshToken: string
  updatedAt?: string
  lineage?: string
}

export interface DirectAccountsData {
  version: number
  activeId?: string
  accounts: CachedDirectAccount[]
}

export function directStoreDir(): string {
  return join(stateDir(), 'direct')
}

export function readDirectAccounts(dir = directStoreDir()): DirectAccountsData {
  const file = join(dir, 'accounts.json')
  try {
    if (existsSync(file)) {
      const data = JSON.parse(readFileSync(file, 'utf8')) as DirectAccountsData
      if (data && Array.isArray(data.accounts)) return data
    }
  } catch {
    // Missing or corrupted
  }
  return { version: 1, accounts: [] }
}

export function writeDirectAccounts(data: DirectAccountsData, dir = directStoreDir()): void {
  try {
    mkdirSync(dir, { recursive: true, mode: 0o700 })
    writeFileSync(join(dir, 'accounts.json'), JSON.stringify(data, null, 2), { encoding: 'utf8', mode: 0o600 })
  } catch (err) {
    console.error('[dsh-agy-link] failed to write direct accounts.json:', err)
  }
}

export function writeDirectAuth(record: { refreshToken: string; projectId: string; email?: string }, dir = directStoreDir()): void {
  try {
    mkdirSync(dir, { recursive: true, mode: 0o700 })
    writeFileSync(join(dir, 'auth.json'), JSON.stringify(record, null, 2), { encoding: 'utf8', mode: 0o600 })
  } catch (err) {
    console.error('[dsh-agy-link] failed to write direct auth.json:', err)
  }
}

function writeTokenFile(accountDir: string, refreshToken: string): void {
  try {
    const geminiDir = join(accountDir, '.gemini', 'antigravity-cli')
    mkdirSync(geminiDir, { recursive: true, mode: 0o700 })
    const tokenFile = join(geminiDir, 'antigravity-oauth-token')
    let existingDoc: Record<string, unknown> = {}
    if (existsSync(tokenFile)) {
      try {
        existingDoc = JSON.parse(readFileSync(tokenFile, 'utf8')) as Record<string, unknown>
      } catch {}
    }
    const existingToken = (existingDoc.token && typeof existingDoc.token === 'object')
      ? (existingDoc.token as Record<string, unknown>)
      : {}
    const doc = {
      token: {
        access_token: typeof existingToken.access_token === 'string' ? existingToken.access_token : '',
        token_type: 'Bearer',
        refresh_token: refreshToken,
        ...(existingToken.expiry ? { expiry: existingToken.expiry } : {}),
      },
      auth_method: 'consumer',
    }
    writeFileSync(tokenFile, JSON.stringify(doc, null, 2), { encoding: 'utf8', mode: 0o600 })
  } catch (err) {
    console.error('[dsh-agy-link] failed to write token file in account dir:', err)
  }
}

function readRefreshTokenFromAccountDir(accountDir: string): string | undefined {
  try {
    const tokenFile = join(accountDir, '.gemini', 'antigravity-cli', 'antigravity-oauth-token')
    if (!existsSync(tokenFile)) return undefined
    const raw = JSON.parse(readFileSync(tokenFile, 'utf8')) as Record<string, unknown>
    const tokenObj = (raw.token && typeof raw.token === 'object')
      ? (raw.token as Record<string, unknown>)
      : raw
    return typeof tokenObj.refresh_token === 'string'
      ? tokenObj.refresh_token
      : typeof tokenObj.refreshToken === 'string'
        ? tokenObj.refreshToken
        : undefined
  } catch {
    return undefined
  }
}

/**
 * Bi-directionally synchronize accounts between the AccountPoolManager and
 * the direct transport accounts store.
 */
export function syncAccounts(pool: AccountPoolManager, directDir = directStoreDir()): {
  importedToPool: number
  importedToDirect: number
} {
  const directData = readDirectAccounts(directDir)
  let importedToPool = 0
  let importedToDirect = 0

  // 1. Direct -> Pool: accounts in direct but not in pool
  for (const dAcc of directData.accounts) {
    if (!dAcc.refreshToken) continue
    const poolAccounts = pool.getAccounts()
    const match = poolAccounts.find(
      (a) => a.id === dAcc.id || (dAcc.email && a.email && a.email.toLowerCase() === dAcc.email.toLowerCase()),
    )
    if (!match) {
      const dir = join(pool.dir, dAcc.id)
      writeTokenFile(dir, dAcc.refreshToken)
      if (process.platform === 'darwin') {
        try { ensureIsolatedKeychain(dir) } catch {}
      }
      pool.importAccount({
        id: dAcc.id,
        alias: dAcc.email || dAcc.id,
        email: dAcc.email,
        dir,
      })
      importedToPool++
    } else {
      // If pool account is missing email but direct has it, update it
      if (dAcc.email && !match.email) {
        match.email = dAcc.email
      }
      // Ensure token file exists in secondary account dir
      if (match.dir && !match.systemHome) {
        const existingRt = readRefreshTokenFromAccountDir(match.dir)
        if (!existingRt && dAcc.refreshToken) {
          writeTokenFile(match.dir, dAcc.refreshToken)
        }
      }
    }
  }

  // 2. Pool -> Direct: accounts in pool that are not in direct
  let directChanged = false
  for (const pAcc of pool.getAccounts()) {
    if (pAcc.dir && !pAcc.systemHome) {
      const rt = readRefreshTokenFromAccountDir(pAcc.dir)
      if (rt) {
        const existsInDirect = directData.accounts.some(
          (a) => a.id === pAcc.id || (pAcc.email && a.email && a.email.toLowerCase() === pAcc.email.toLowerCase()),
        )
        if (!existsInDirect) {
          directData.accounts.push({
            id: pAcc.id,
            email: pAcc.email,
            maskedEmail: pAcc.email,
            projectId: 'antigravity',
            refreshToken: rt,
            updatedAt: new Date().toISOString(),
          })
          directChanged = true
          importedToDirect++
        }
      }
    }
  }

  if (directChanged) {
    writeDirectAccounts(directData, directDir)
  }

  return { importedToPool, importedToDirect }
}

/**
 * Set active account in both the AGY pool and the Direct mode store.
 */
export function setActiveAccountUnified(
  pool: AccountPoolManager,
  accountId: string,
  directDir = directStoreDir(),
): boolean {
  const ok = pool.setActiveAccount(accountId)
  if (!ok) return false

  const target = pool.getAccount(accountId)
  const directData = readDirectAccounts(directDir)
  directData.activeId = accountId
  writeDirectAccounts(directData, directDir)

  // Find refresh token to update direct/auth.json
  let rt: string | undefined
  if (target?.dir && !target.systemHome) {
    rt = readRefreshTokenFromAccountDir(target.dir)
  }
  if (!rt) {
    const dMatch = directData.accounts.find(
      (a) => a.id === accountId || (target?.email && a.email && a.email.toLowerCase() === target.email.toLowerCase()),
    )
    rt = dMatch?.refreshToken
  }

  if (rt) {
    writeDirectAuth(
      {
        refreshToken: rt,
        projectId: 'antigravity',
        email: target?.email,
      },
      directDir,
    )
  }

  return true
}

/**
 * Remove an account from both the AGY pool and the Direct mode store.
 */
export function removeAccountUnified(
  pool: AccountPoolManager,
  accountId: string,
  directDir = directStoreDir(),
): boolean {
  const target = pool.getAccount(accountId)
  const ok = pool.deleteAccount(accountId)

  const directData = readDirectAccounts(directDir)
  const initialLen = directData.accounts.length
  directData.accounts = directData.accounts.filter(
    (a) => a.id !== accountId && (!target?.email || !a.email || a.email.toLowerCase() !== target.email.toLowerCase()),
  )
  if (directData.accounts.length !== initialLen) {
    if (directData.activeId === accountId) {
      directData.activeId = directData.accounts[0]?.id
      const next = directData.accounts[0]
      if (directData.activeId && next) {
        writeDirectAuth(
          {
            refreshToken: next.refreshToken,
            projectId: next.projectId || 'antigravity',
            email: next.email,
          },
          directDir,
        )
      }
    }
    writeDirectAccounts(directData, directDir)
  }

  return ok
}
