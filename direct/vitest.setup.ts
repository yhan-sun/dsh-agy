import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll } from 'vitest'

// Every test worker gets its own throwaway stores and fake OAuth client.
const fixtureDir = mkdtempSync(join(tmpdir(), 'dsh-agy-direct-test-'))
process.env.DSH_HOME = fixtureDir
process.env.XDG_DATA_HOME = fixtureDir
process.env.AGY_CLIENT_ID = '1234567890-fixture.apps.googleusercontent.com'
process.env.AGY_CLIENT_SECRET = 'test-only-not-a-real-secret'
afterAll(() => rmSync(fixtureDir, { recursive: true, force: true }))
